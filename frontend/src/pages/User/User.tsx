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
} from "@mantine/core";
import {
  IconConfetti,
  IconFlag,
  IconRegistered,
  IconUsers,
} from "@tabler/icons-react";
import { mockPost, mockPost3, mockUser2 } from "../../utils/mock";
import Post from "../../components/Post";

const User = () => {
  return (
    <Center>
      <Stack sx={{ maxWidth: "800px" }}>
        <Group align="flex-start">
          <Avatar size={200} src={mockUser2.avatar} />

          <Flex direction="column" gap={4}>
            <Title>
              {mockUser2.name} {mockUser2.surname}
            </Title>

            <Stack spacing={3}>
              <Group spacing={4}>
                <Text component="a" href={`mailto:${mockUser2.email}`}>
                  {mockUser2.email}
                </Text>
              </Group>

              <Group spacing={4}>
                <IconFlag size={20} color={"#7999d2"} />
                <Tooltip position="right" withArrow label="Страна">
                  <Text align="center" color="dimmed">
                    {mockUser2.country as string} 🇩🇪
                  </Text>
                </Tooltip>
              </Group>

              <Group spacing={4}>
                <IconConfetti size={20} color={"#7999d2"} />
                <Tooltip position="right" withArrow label="День рождения">
                  <Text align="center" color="dimmed">
                    {mockUser2.birthday as string}
                  </Text>
                </Tooltip>
              </Group>

              <Group spacing={4}>
                <IconRegistered size={20} strokeWidth={2} color={"#7999d2"} />
                <Tooltip position="right" withArrow label="Дата регистрации">
                  <Text color="dimmed">{mockUser2.created_at as string}</Text>
                </Tooltip>
              </Group>

              <Group spacing={4}>
                <IconUsers size={20} strokeWidth={2} color={"#7999d2"} />
                <Tooltip position="right" withArrow label="Подписчики">
                  <Text color="dimmed">{mockUser2.followerCount}</Text>
                </Tooltip>
              </Group>
            </Stack>
          </Flex>
        </Group>
        <Paper mb="lg">
          <Title order={4}>Обо мне</Title>
          <Text>{mockUser2.about}</Text>
        </Paper>
        <Post {...mockPost3} />
      </Stack>
    </Center>
  );
};

export default User;
