import {
  Avatar,
  Center,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  ActionIcon,
  Button,
  Modal,
  FileButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconConfetti,
  IconFlag,
  IconRegistered,
  IconMail,
  IconEdit,
  IconBuildingCommunity,
} from "@tabler/icons-react";
import { useState } from "react";
import { mockPost, mockPost2 } from "../../utils/mock";
import Post from "../../components/Post";
import Editor from "../../components/Editor";
import EditUserForm from "./EditUserForm";
import sciLinkApi from "../../store/sciLinkApi";
import { IconUsers } from "@tabler/icons-react";
import formatDate from "../../utils/formatDate";

const Me = () => {
  const { data } = sciLinkApi.useGetMeQuery();
  const { data: posts } = sciLinkApi.useGetUserPostsQuery(data?.id, {
    skip: !data?.id,
  });

  const [uploadAvatar] = sciLinkApi.useUploadAvatarMutation();

  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Modal opened={opened} onClose={close} title={"Редактирование профиля"}>
        <EditUserForm close={close} />
      </Modal>
      <Center>
        <Stack sx={{ maxWidth: "800px" }}>
          <Group align="flex-start">
            <FileButton
              onChange={(file) => {
                if (file) {
                  const formData = new FormData();
                  formData.append("avatar_file", file);
                  uploadAvatar(formData);
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

            <Flex sx={{ flex: "2 2 10%" }} direction="column" gap={4}>
              <Title>
                {data?.name} {data?.surname}{" "}
                <Text size="xs" color="dimmed">
                  @{data?.username}
                </Text>
              </Title>

              <Stack spacing={3}>
                <Group spacing={4}>
                  <IconMail size={20} color={"#7999d2"} />
                  <Text
                    sx={{ ":hover": { textDecoration: "underline" } }}
                    color="blue"
                    align="center"
                    component="a"
                    href={`mailto:${data?.email}`}
                  >
                    {data?.email}
                  </Text>
                </Group>

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

                {data?.birthday && (
                  <Group spacing={4}>
                    <IconConfetti size={20} color={"#7999d2"} />
                    <Tooltip position="right" withArrow label="День рождения">
                      <Text align="center" color="dimmed">
                        {formatDate(data?.birthday, "dd.MM.yyyy")}
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
                    <Tooltip
                      position="right"
                      withArrow
                      label="Дата регистрации"
                    >
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
                        {data?.details.count_followers}
                      </Text>
                    </Group>
                  </Paper>

                  <Paper p="2px">
                    <Text color="dimmed">Подписан на</Text>
                    <Group spacing={4}>
                      <IconUsers size={20} strokeWidth={2} color={"#7999d2"} />
                      <Text color="dimmed">
                        {data?.details.count_following_users}
                      </Text>
                    </Group>
                  </Paper>

                  <Paper p="2px">
                    <Text color="dimmed">Организации</Text>
                    <Group spacing={4}>
                      <IconBuildingCommunity
                        size={20}
                        strokeWidth={2}
                        color={"#7999d2"}
                      />
                      <Text color="dimmed">
                        {data?.details.count_following_organizations}
                      </Text>
                    </Group>
                  </Paper>
                </Group>
              </Stack>
            </Flex>
            <Button
              onClick={open}
              compact
              variant="light"
              leftIcon={<IconEdit size={20} />}
            >
              Редактировать
            </Button>
          </Group>

          <Paper mb="lg" withBorder p="sm">
            <Title order={4}>Обо мне</Title>
            <Text>{data?.about}</Text>
          </Paper>
          <Editor />
          {posts?.map((post) => (
            <Post key={post?.id} {...post} />
          ))}
        </Stack>
      </Center>
    </>
  );
};

export default Me;
