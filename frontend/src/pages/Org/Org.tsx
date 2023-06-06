import {
  Avatar,
  Button,
  Center,
  Divider,
  FileButton,
  Flex,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconConfetti,
  IconFlag,
  IconRegistered,
  IconUsers,
  IconMail,
  IconBuildingCommunity,
  IconEdit,
} from "@tabler/icons-react";
import { mockPost, mockPost3 } from "../../utils/mock";
import sciLinkApi from "../../store/sciLinkApi";
import Post from "../../components/Post";
import { Link, useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import UserCard from "../../components/UserCard";
import Editor from "../../components/Editor";
import { useDisclosure } from "@mantine/hooks";
import EditOrgForm from "./EditOrgForm";

const Org = () => {
  const { orgId } = useParams();
  const { data: me } = sciLinkApi.useGetMeQuery();
  const { data } = sciLinkApi.useGetOrgQuery(orgId, { skip: !orgId });
  const { data: posts } = sciLinkApi.useGetOrgPostsQuery(
    { org_id: data?.id },
    {
      skip: !data?.id,
    }
  );

  const [uploadAvatar] = sciLinkApi.useUploadOrgAvatarMutation();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={"Редактирование организации"}
      >
        <EditOrgForm close={close} />
      </Modal>
      <Center>
        <Stack w="100%" sx={{ maxWidth: "800px" }}>
          <Group align="flex-start">
            {data?.owner?.id === me?.id ? (
              <FileButton
                onChange={(file) => {
                  if (file) {
                    const formData = new FormData();
                    formData.append("avatar_file", file);
                    uploadAvatar({ org_id: orgId, body: formData });
                  }
                }}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Tooltip withArrow label="Нажмите чтобы изменить">
                    <Avatar
                      {...props}
                      sx={{ cursor: "pointer" }}
                      size={200}
                      src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${
                        data?.avatar_path
                      }`}
                    />
                  </Tooltip>
                )}
              </FileButton>
            ) : (
              <Avatar
                size={200}
                src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${
                  data?.avatar_path
                }`}
              />
            )}

            <Flex sx={{ flex: "2 2 10%" }} direction="column" gap={4}>
              <Title>{data?.name}</Title>

              <Paper p="2px">
                <Group spacing={4}>
                  <Avatar
                    size={50}
                    src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${
                      data?.owner.avatar_path
                    }`}
                  />
                  <Stack spacing="0px">
                    <Text align="center">
                      <Link to={`/users/${data?.owner?.id}`}>
                        {data?.owner?.name} {data?.owner?.surname}
                      </Link>
                    </Text>
                    <Text size="xs" color="dimmed">
                      Администратор
                    </Text>
                  </Stack>
                </Group>
              </Paper>

              <Stack spacing={3}>
                {data?.country?.name && (
                  <Group spacing={4}>
                    <IconFlag size={20} color={"#7999d2"} />
                    <Tooltip position="right" withArrow label="Страна">
                      <Text align="center" color="dimmed">
                        {data?.country?.name}
                      </Text>
                    </Tooltip>
                  </Group>
                )}

                {data?.institute?.name && (
                  <Group spacing={4}>
                    <IconBuildingCommunity size={20} color={"#7999d2"} />
                    <Tooltip position="right" withArrow label="Институт">
                      <Text align="center" color="dimmed">
                        {data?.institute?.name}
                      </Text>
                    </Tooltip>
                  </Group>
                )}

                {data?.created_at && (
                  <Group spacing={4}>
                    <IconRegistered
                      size={20}
                      strokeWidth={2}
                      color={"#7999d2"}
                    />
                    <Tooltip position="right" withArrow label="Дата создания">
                      <Text color="dimmed">
                        {formatDate(data.created_at, "dd.MM.yyyy")}
                      </Text>
                    </Tooltip>
                  </Group>
                )}

                <Group>
                  <Paper p="2px">
                    <Text color="dimmed">Подписчики</Text>
                    <Group spacing={4}>
                      <IconUsers size={20} strokeWidth={2} color={"#7999d2"} />
                      <Text color="dimmed">
                        {data?.details?.count_followers}
                      </Text>
                    </Group>
                  </Paper>
                </Group>
              </Stack>
            </Flex>

            {data?.owner?.id === me?.id && (
              <Button
                onClick={open}
                compact
                variant="light"
                leftIcon={<IconEdit size={20} />}
              >
                Редактировать
              </Button>
            )}
            <Button variant="light" compact>
              Подписаться
            </Button>
          </Group>
          <Paper mb="lg" withBorder p="sm">
            <Title order={4}>Об организации</Title>
            <Text>{data?.about}</Text>
          </Paper>
          {data?.owner?.id === me?.id && <Editor />}
          {posts?.map((post) => (
            <Post key={post?.id} {...post} />
          ))}
        </Stack>
      </Center>
    </>
  );
};

export default Org;
