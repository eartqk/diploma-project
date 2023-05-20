import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Box,
} from "@mantine/core";

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

interface UserButtonProps extends UnstyledButtonProps {
  avatar: string;
  email: string;
  name: string;
  surname: string;
  onClick?: () => void;
}

function UserButton({
  avatar,
  name,
  email,
  surname,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={avatar} radius="xl" />

        <Box className={classes.name}>
          <Text size="sm" weight={500}>
            {name} {surname}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  );
}

export default UserButton;
