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
} from "@mantine/core";
import sciLinkApi from "../../store/sciLinkApi";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  token: Yup.string().required(),
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
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const SignUp: React.FC = () => {
  const [signUp] = sciLinkApi.useSignUpMutation();
  const navigate = useNavigate();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      token: "",
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  });

  return (
    <Center sx={{ height: "98vh" }}>
      <Box sx={{ minWidth: 400 }} p="xs">
        <form
          onSubmit={form.onSubmit((values) => {
            signUp(values)
              .unwrap()
              .then(() => navigate("/"));
          })}
        >
          <Title order={2}>Регистрация</Title>
          <TextInput required label="Токен" {...form.getInputProps("token")} />
          <TextInput required label="Имя" {...form.getInputProps("name")} />
          <TextInput
            required
            label="Фамилия"
            {...form.getInputProps("surname")}
          />
          <TextInput
            required
            type="email"
            label="Email"
            placeholder="example@mail.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Пароль"
            required
            {...form.getInputProps("password")}
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

export default SignUp;
