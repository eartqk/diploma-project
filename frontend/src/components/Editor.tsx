import { Textarea, Button, Stack } from "@mantine/core";
import { useState } from "react";
import sciLinkApi from "../store/sciLinkApi";
import { useLocation, useParams } from "react-router-dom";

const Editor = () => {
  const [value, setValue] = useState("");
  const [userPost] = sciLinkApi.useCreatePostMutation();
  const [orgPost] = sciLinkApi.useCreateOrgPostMutation();
  const { pathname } = useLocation();
  const { orgId } = useParams();


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
      <Button
        onClick={() =>
          pathname.split("/")[1] === "orgs"
            ? orgPost({ organization_id: orgId, post: { body: value } })
            : userPost({ body: value })
        }
      >
        Опубликовать
      </Button>
    </Stack>
  );
};

export default Editor;
