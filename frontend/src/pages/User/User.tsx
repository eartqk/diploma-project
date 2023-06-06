import {
  Avatar,
  Center,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  Button,
} from "@mantine/core";
import {
  IconConfetti,
  IconFlag,
  IconRegistered,
  IconUsers,
  IconMail,
  IconBuildingCommunity,
} from "@tabler/icons-react";
import { mockPost, mockPost3 } from "../../utils/mock";
import sciLinkApi from "../../store/sciLinkApi";
import Post from "../../components/Post";
import { useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";

const User = () => {
  const { userId } = useParams();
  const { data } = sciLinkApi.useGetUserQuery(userId, { skip: !userId });
  const { data: posts } = sciLinkApi.useGetUserPostsQuery(data?.id, {
    skip: !data?.id,
  });

  return (
    <Center>
      <Stack w="100%" sx={{ maxWidth: "800px" }}>
        <Group align="flex-start">
          <Avatar
            size={200}
            src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${data?.avatar_path}`}
          />

          <Flex direction="column" gap={4}>
            <Title>
              {data?.name} {data?.surname}
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
                  <IconRegistered size={20} strokeWidth={2} color={"#7999d2"} />
                  <Tooltip position="right" withArrow label="Дата регистрации">
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
                    <Text color="dimmed">{data?.details.count_followers}</Text>
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
          <Button variant="light" compact>Подписаться</Button>
        </Group>
        <Paper mb="lg" withBorder p="sm">
          <Title order={4}>Обо мне</Title>
          <Text>{data?.about}</Text>
        </Paper>
        {posts?.map((post) => (
          <Post key={post?.id} {...post} />
        ))}
      </Stack>
    </Center>
  );
};

export default User;
