import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Divider,
  Group,
  Spoiler,
  Stack,
  Text,
} from "@mantine/core";
import type { Post } from "../types/common";
import { IconThumbUp } from "@tabler/icons-react";

const Post: React.FC<Post> = ({
  body,
  created_at,
  id,
  updated_at,
  user,
  org,
  likes,
}) => {
  return (
    <Card shadow="sm" key={id}>
      <Stack>
        <Group>
          <Avatar src={user.avatar} />

          <Stack spacing={0}>
            <Text>
              {user.name} {user.surname}
            </Text>
            <Text color="dimmed" size="xs">
              {created_at as string}
            </Text>
          </Stack>
        </Group>
        <Divider />
        <Spoiler maxHeight={250} showLabel="Подробнее" hideLabel="Скрыть">
          <Text sx={{ whiteSpace: "pre-wrap" }}>{body}</Text>
        </Spoiler>
      </Stack>
      <Group position="right" spacing={0}>
        <ActionIcon>
          <IconThumbUp size="1.125rem" />
        </ActionIcon>
        <Text>{likes}</Text>
      </Group>
    </Card>
  );
};

export default Post;
