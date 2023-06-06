import { Card, Text, Group, Stack, Avatar, Flex, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

const OrgCard: React.FC<Partial<Org>> = ({
  avatar_path,
  id,
  name,
  created_at,
  about,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Group>
          <Stack spacing="4px">
            <Group>
              <Avatar
                size={72}
                src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${avatar_path}`}
              />
              <Title order={4}>
                <Link to={`${id}`}>{name}</Link>
              </Title>
            </Group>
            <Stack spacing={3}>
              <Group spacing={4}>
                <Text lineClamp={2}>{about}</Text>
              </Group>
              <Group spacing={4}>
                {created_at && (
                  <Text>{formatDate(created_at, "dd.MM.yyyy")}</Text>
                )}
              </Group>

              {/* <Group spacing={4}>
                  <IconUsers size={20} strokeWidth={2} color={"#7999d2"} />
                  <Tooltip position="right" withArrow label="Подписчики">
                    <Text color="dimmed">{123}</Text>
                  </Tooltip>
                </Group> */}
            </Stack>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};

export default OrgCard;
