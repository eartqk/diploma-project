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
} from "@mantine/core";
import { IconConfetti, IconFlag, IconRegistered } from "@tabler/icons-react";
import { mockPost, mockPost2, mockUser } from "../../utils/mock";
import Post from "../../components/Post";
import { IconUsers } from "@tabler/icons-react";

const Me = () => {
  return (
    <Center>
      <Stack sx={{ maxWidth: "800px" }}>
        <Group align="flex-start">
          <Avatar size={200} src={mockUser.avatar} />

          <Flex direction="column" gap={4}>
            <Title>
              {mockUser.name} {mockUser.surname}
            </Title>

            <Stack spacing={3}>
              <Group spacing={4}>
                <Text component="a" href={`mailto:${mockUser.email}`}>
                  {mockUser.email}
                </Text>
              </Group>

              <Group spacing={4}>
                <IconFlag size={20} color={"#7999d2"} />
                <Tooltip position="right" withArrow label="Страна">
                  <Text align="center" color="dimmed">
                    {mockUser.country as string} 🇩🇪
                  </Text>
                </Tooltip>
              </Group>

              <Group spacing={4}>
                <IconConfetti size={20} color={"#7999d2"} />
                <Tooltip position="right" withArrow label="День рождения">
                  <Text align="center" color="dimmed">
                    {mockUser.birthday as string}
                  </Text>
                </Tooltip>
              </Group>

              <Group spacing={4}>
                <IconRegistered size={20} strokeWidth={2} color={"#7999d2"} />
                <Tooltip position="right" withArrow label="Дата регистрации">
                  <Text color="dimmed">{mockUser.created_at as string}</Text>
                </Tooltip>
              </Group>

              <Group spacing={4}>
                <IconUsers size={20} strokeWidth={2} color={"#7999d2"} />
                <Tooltip position="right" withArrow label="Подписчики">
                  <Text color="dimmed">{mockUser.followerCount}</Text>
                </Tooltip>
              </Group>
            </Stack>
          </Flex>
        </Group>
        <Paper mb="lg">
          <Title order={4}>Обо мне</Title>
          <Text>{mockUser.about}</Text>
        </Paper>
        <Post {...mockPost} />
        <Post {...mockPost2} />
      </Stack>
    </Center>
  );
};

export default Me;
