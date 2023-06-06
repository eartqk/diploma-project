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
    .max(20)
    .matches(/^[ЁёА-я]+$/, "Только кириллица"),
  surname: Yup.string()
    .required()
    .min(2)
    .max(20)
    .matches(/^[ЁёА-я]+$/, "Только кириллица"),
  about: Yup.string().required(),
  birthday: Yup.date().required(),
});

interface EditUserFormProps {
  close: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ close }) => {
  const { data } = sciLinkApi.useGetMeQuery();

  const [editUser] = sciLinkApi.useEditUserMutation();
  const [deactiveUser] = sciLinkApi.useDeactivateUserMutation();
  const [logout] = sciLinkApi.useLogoutMutation();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      name: data?.name ?? "",
      surname: data?.surname ?? "",
      about: data?.about ?? "",
      birthday: (data?.birthday && parseISO(data?.birthday)) ?? "",
    },
  });

  return (
    <Center>
      <Box sx={{ minWidth: 400 }} p="xs">
        <form
          onSubmit={form.onSubmit(({ birthday, ...values }) => {
            editUser({
              birthday: format(birthday as Date, "yyyy-MM-dd", {
                locale: ru,
              }).replace(/\./g, "-"),
              ...values,
            })
              .unwrap()
              .then(() => close());
          })}
        >
          <TextInput required label="Имя" {...form.getInputProps("name")} />
          <TextInput
            required
            label="Фамилия"
            {...form.getInputProps("surname")}
          />
          <Textarea
            minRows={6}
            autosize
            label="Обо мне"
            required
            {...form.getInputProps("about")}
          />
          <DateInput
            valueFormat="YYYY-MM-DD"
            locale="ru"
            label="Дата рождения"
            required
            {...form.getInputProps("birthday")}
          />
          <Group position="center" mt="md">
            <Button fullWidth type="submit">
              Редактировать
            </Button>
          </Group>
        </form>

        <Group position="center" mt="md">
          <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button variant="light" compact color="red">
                Деактивировать аккаунт
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack>
                <Text size="sm">Вы уверены?</Text>
                <Button
                  onClick={() =>
                    deactiveUser()
                      .unwrap()
                      .then(() => logout())
                  }
                  compact
                  color="red"
                >
                  Ок
                </Button>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Box>
    </Center>
  );
};

export default EditUserForm;
