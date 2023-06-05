import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Box,
  ActionIcon,
} from "@mantine/core";
import sciLinkApi from "../store/sciLinkApi";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.spacing.xs,
    margin: theme.spacing.xs,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },

  name: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

function UserButton() {
  const { classes } = useStyles();
  const { data } = sciLinkApi.useGetMeQuery();
  const [logout] = sciLinkApi.useLogoutMutation();
  const navigate = useNavigate();

  return (
    <>
      <UnstyledButton
        pr="xs"
        onClick={() => navigate("me")}
        className={classes.user}
      >
        <Group>
          <Avatar src={`${import.meta.env.VITE_MEDIA_BASE_URL}/${data?.avatar_path}`} radius="xl" />

          <Box className={classes.name}>
            <Text size="sm" weight={500}>
              {data?.name} {data?.surname}
            </Text>

            <Text color="dimmed" size="xs">
              {data?.email}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
      <ActionIcon onClick={() => logout()}>
        <IconLogout size="20px" />
      </ActionIcon>
    </>
  );
}

export default UserButton;
