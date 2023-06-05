import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import {
  TextInput,
  Button,
  Box,
  Group,
  PasswordInput,
  Center,
  Title,
  Stack,
} from "@mantine/core";
import sciLinkApi from "../../store/sciLinkApi";
import { appName } from "../../utils/config";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Login: React.FC = () => {
  const [login] = sciLinkApi.useLoginMutation();
  const [getMe] = sciLinkApi.useLazyGetMeQuery();
  const navigate = useNavigate();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Center sx={{ height: "98vh" }}>
      <Box sx={{ minWidth: 400 }} p="xs">
        <form
          onSubmit={form.onSubmit((values) => {
            login(values)
              .unwrap()
              .then(() => getMe())
              .then(() => navigate("/"));
          })}
        >
          <Title order={4} color="dimmed">
            {appName}
          </Title>
          <Title mb={10} order={2}>
            Добро пожаловать!
          </Title>
          <TextInput
            required
            type="text"
            label="Логин"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Пароль"
            required
            {...form.getInputProps("password")}
          />

          <Group position="center" mt="md">
            <Button fullWidth type="submit">
              Войти
            </Button>
          </Group>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
