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
import {
  IconConfetti,
  IconFlag,
  IconRegistered,
  IconUsers,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import sciLinkApi from "../../store/sciLinkApi";

const Users = () => {
  const { data } = sciLinkApi.useGetUsersQuery();
  console.log(data);
  return (
    <Stack>
      {data?.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </Stack>
  );
};

export default Users;

const UserCard: React.FC<Partial<User>> = ({
  avatar_path,
  email,
  id,
  name,
  surname,
  username,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack sx={{ maxWidth: "800px" }}>
        <Group>
          <Avatar
            radius="50%"
            size={100}
            src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${avatar_path}`}
          />

          <Flex direction="column" gap={4}>
            <Link to={`${id}`}>
              <Title order={3}>
                {name} {surname}
              </Title>
            </Link>
            <Stack spacing={3}>
              <Group spacing={4}>
                <Text component="a" href={`mailto:${email}`}>
                  {email}
                </Text>
              </Group>

              {/* <Group spacing={4}>
                <IconUsers size={20} strokeWidth={2} color={"#7999d2"} />
                <Tooltip position="right" withArrow label="Подписчики">
                  <Text color="dimmed">{123}</Text>
                </Tooltip>
              </Group> */}
            </Stack>
          </Flex>
        </Group>
      </Stack>
    </Card>
  );
};
