import { Card, Text, Group, Stack, Avatar, Flex, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import sciLinkApi from "../store/sciLinkApi";

const UserCard: React.FC<Partial<User>> = ({
  avatar_path,
  email,
  id,
  name,
  surname,
  username,
}) => {
  const { data: me } = sciLinkApi.useGetMeQuery();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack sx={{ maxWidth: "800px" }}>
        <Group>
          <Avatar
            radius="50%"
            size={72}
            src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${avatar_path}`}
          />

          <Flex direction="column" gap={4}>
            <Link to={`${me?.id === id ? "/me" : id}`}>
              <Title order={4}>
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

export default UserCard;
