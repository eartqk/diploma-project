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

const schema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(2)
    .max(64),
  about: Yup.string().required(),
});

interface CreateOrgFormProps {
  close: () => void;
}

const CreateOrgForm: React.FC<CreateOrgFormProps> = ({ close }) => {
  const [createOrg] = sciLinkApi.useCreateOrgMutation();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      name: "",
      about: "",
    },
  });

  return (
    <Center>
      <Box sx={{ minWidth: 400 }} p="xs">
        <form
          onSubmit={form.onSubmit((values) => {
            createOrg(values)
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
              Создать
            </Button>
          </Group>
        </form>
      </Box>
    </Center>
  );
};

export default CreateOrgForm;
