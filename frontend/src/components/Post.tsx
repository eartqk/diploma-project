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
  Button,
  Paper,
} from "@mantine/core";
import { useState } from "react";
import {
  IconThumbUp,
  IconTrash,
  IconEdit,
  IconCheck,
  IconPencil,
  IconX,
  IconMessageCircle2,
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
  comments,
  likes,
}) => {
  const { data: me } = sciLinkApi.useGetMeQuery();
  const [deletePost] = sciLinkApi.useDeletePostMutation();
  const [editPost] = sciLinkApi.useEditPostMutation();
  const [addComment] = sciLinkApi.useAddCommentMutation();
  const [isEditing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [comment, setComment] = useState("");

  return (
    <Card withBorder shadow="xs" key={id}>
      <Stack mb="md">
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
      <Stack spacing="xs">
        {comments.map(({ body, id, user }) => (
          <Paper withBorder p="8px">
            <Stack>
              <Group spacing="xs">
                <Avatar
                  size={30}
                  src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${
                    user.avatar_path
                  }`}
                />
                <Text size="sm">
                  {user.name} {user.surname}
                </Text>
              </Group>
              <Spoiler maxHeight={250} showLabel="Подробнее" hideLabel="Скрыть">
                <Text size="sm" sx={{ whiteSpace: "pre-wrap" }}>
                  {body}
                </Text>
              </Spoiler>
            </Stack>
          </Paper>
        ))}
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

        <Textarea
          mt="10px"
          placeholder="Комментарий.."
          w="100%"
          value={comment}
          onChange={(event) => setComment(event.currentTarget.value)}
          autosize
        />
        <Group w="100%" position="apart">
          <Group>
            <ActionIcon>
              <IconThumbUp size="1.125rem" />
            </ActionIcon>
            <Text>{likes}</Text>
          </Group>
          <Button
            onClick={() =>
              addComment({ post_id: id, comment: { body: comment } })
                .unwrap()
                .then(() => setComment(""))
            }
          >
            Ответить
          </Button>
        </Group>
      </Group>
    </Card>
  );
};

export default Post;
