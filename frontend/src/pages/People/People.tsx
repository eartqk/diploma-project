import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Box,
  Stack,
  Avatar,
  Flex,
  Title,
  Tooltip,
} from "@mantine/core";
import type { User } from "../../types/common";
import { mockUser2 } from "../../utils/mock";
import {
  IconConfetti,
  IconFlag,
  IconRegistered,
  IconUsers,
} from "@tabler/icons-react";

const People = () => {
  return (
    <Box>
      <UserCard {...mockUser2} />
    </Box>
  );
};

export default People;

const UserCard: React.FC<Partial<User>> = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack sx={{ maxWidth: "800px" }}>
        <Group align="flex-start">
          <Avatar radius="50%" size={100} src={mockUser2.avatar} />

          <Flex direction="column" gap={4}>
            <Title order={3}>
              {mockUser2.name} {mockUser2.surname}
            </Title>

            <Stack spacing={3}>
              <Group spacing={4}>
                <Text component="a" href={`mailto:${mockUser2.email}`}>
                  {mockUser2.email}
                </Text>
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
      </Stack>
    </Card>
  );
};
