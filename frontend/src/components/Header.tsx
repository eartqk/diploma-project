import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Box,
  rem,
  px,
  Center,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/sciencelink.svg";
import UserButton from "./UserButton";
import { mockUser } from "../utils/mock";

const HEADER_HEIGHT = px(50);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    maxWidth: "1200px",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

function CustomHeader() {
  const links = [
    {
      link: "users",
      label: "Люди",
    },
    {
      link: "orgs",
      label: "Организации",
    },
    {
      link: "search",
      label: "Поиск",
    },
  ];

  const { pathname } = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map(({ label, link }) => (
    <Link
      key={label}
      to={`/${link}`}
      className={cx(classes.link, {
        [classes.linkActive]: pathname.split("/")[1] === link,
      })}
      onClick={() => {
        setActive(link);
        close();
      }}
    >
      {label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={15} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing="xl">
          <NavLink to="/">
            <Center>
              <Logo height={28} width={121.25} />
            </Center>
          </NavLink>

          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </Group>

        <Flex align="center" gap={10}>
          <UserButton />
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </Flex>

        <Transition transition="fade" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}

export default CustomHeader;
