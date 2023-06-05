import { Textarea, Button, Stack } from "@mantine/core";
import { useState } from "react";
import sciLinkApi from "../store/sciLinkApi";

const Editor = () => {
  const [value, setValue] = useState("");
  const [post] = sciLinkApi.useCreatePostMutation();

  return (
    <Stack align="flex-end">
      <Textarea
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        w="100%"
        autosize
        minRows={4}
        label="Новая запись"
      />
      <Button onClick={() => post({ body: value })}>Опубликовать</Button>
    </Stack>
  );
};

export default Editor;
