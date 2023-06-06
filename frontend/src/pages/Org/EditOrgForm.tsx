import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { DateInput } from "@mantine/dates";
import {
  Textarea,
  TextInput,
  Button,
  Box,
  Group,
  PasswordInput,
  Center,
  Title,
  Popover,
  Text,
  Stack,
} from "@mantine/core";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import sciLinkApi from "../../store/sciLinkApi";
import { useParams } from "react-router-dom";

const schema = Yup.object().shape({
  name: Yup.string().required().min(2).max(20),
  about: Yup.string().required(),
});

interface EditOrgFormProps {
  close: () => void;
}

const EditOrgForm: React.FC<EditOrgFormProps> = ({ close }) => {
  const { orgId } = useParams();
  const { data } = sciLinkApi.useGetOrgQuery(orgId, { skip: !orgId });
  const [editOrg] = sciLinkApi.useEditOrgMutation();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      name: data?.name ?? "",
      about: data?.about ?? "",
    },
  });

  return (
    <Center>
      <Box sx={{ minWidth: 400 }} p="xs">
        <form
          onSubmit={form.onSubmit((values) => {
            editOrg({ org_id: orgId, body: values })
              .unwrap()
              .then(() => close());
          })}
        >
          <TextInput
            required
            label="Название"
            {...form.getInputProps("name")}
          />

          <Textarea
            minRows={6}
            autosize
            label="Описание"
            required
            {...form.getInputProps("about")}
          />

          <Group position="center" mt="md">
            <Button fullWidth type="submit">
              Сохранить
            </Button>
          </Group>
        </form>
      </Box>
    </Center>
  );
};

export default EditOrgForm;
