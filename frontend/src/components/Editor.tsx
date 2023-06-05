import { Textarea, Button, Stack } from "@mantine/core";

const Editor = () => {
  return (
    <Stack align="flex-end">
      <Textarea w="100%" autosize minRows={4} label="Новая запись" />
      <Button>Опубликовать</Button>
    </Stack>
  );
};

export default Editor;
