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
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import {
  IconThumbUp,
  IconTrash,
  IconEdit,
  IconCheck,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import sciLinkApi from "../store/sciLinkApi";
import formatDate from "../utils/formatDate";

const Post: React.FC<Post> = ({
  body,
  created_at,
  id,
  updated_at,
  user,
  organization,
  likes,
}) => {
  const { data: me } = sciLinkApi.useGetMeQuery();
  const [deletePost] = sciLinkApi.useDeletePostMutation();
  const [editPost] = sciLinkApi.useEditPostMutation();
  const [isEditing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");

  return (
    <Card withBorder shadow="xs" key={id}>
      <Stack>
        <Group position="apart">
          <Group>
            <Avatar
              src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${user.avatar_path}`}
            />

            <Stack spacing={0}>
              <Text>
                {user.name} {user.surname}
              </Text>
              <Group align="center">
                <Text color="dimmed" size="xs">
                  {formatDate(created_at)}
                </Text>
                {updated_at && (
                  <Tooltip
                    withArrow
                    label={
                      <Text color="dimmed" size="xs">
                        {formatDate(updated_at)}
                      </Text>
                    }
                  >
                    <IconPencil color="gray" size="14px" />
                  </Tooltip>
                )}
              </Group>
            </Stack>
          </Group>
          {me?.id === user.id && (
            <ActionIcon onClick={() => deletePost(id)}>
              <IconTrash size="1.125rem" />
            </ActionIcon>
          )}
        </Group>
        {isEditing ? (
          <Textarea
            value={editText}
            onChange={(event) => setEditText(event.currentTarget.value)}
            autosize
            minRows={4}
          />
        ) : (
          <Spoiler maxHeight={250} showLabel="Подробнее" hideLabel="Скрыть">
            <Text sx={{ whiteSpace: "pre-wrap" }}>{body}</Text>
          </Spoiler>
        )}
      </Stack>
      <Group position="right" spacing="xs">
        {isEditing ? (
          <Group spacing={0}>
            <ActionIcon onClick={() => setEditing(false)}>
              <IconX size="1.125rem" />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                editPost({ post_id: id, editText: { body: editText } })
                  .unwrap()
                  .then(() => setEditing(false));
              }}
            >
              <IconCheck size="1.125rem" />
            </ActionIcon>
          </Group>
        ) : (
          me?.id === user.id && (
            <ActionIcon
              onClick={() => {
                setEditing(true);
                setEditText(body);
              }}
            >
              <IconEdit size="1.125rem" />
            </ActionIcon>
          )
        )}
        <ActionIcon>
          <IconThumbUp size="1.125rem" />
        </ActionIcon>
        <Text>{likes}</Text>
      </Group>
    </Card>
  );
};

export default Post;
