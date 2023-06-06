import { Button, Modal, SimpleGrid, Stack, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLayoutGridAdd } from "@tabler/icons-react";
import sciLinkApi from "../../store/sciLinkApi";
import CreateOrgForm from "./CreateOrgForm";
import OrgCard from "../../components/OrgCard";

const Orgs = () => {
  const { data } = sciLinkApi.useGetOrgsQuery({});
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={"Создать организацию"}>
        <CreateOrgForm close={close} />
      </Modal>
      <Stack>
        <Group position="right">
          <Button
            onClick={open}
            compact
            variant="light"
            leftIcon={<IconLayoutGridAdd size={20} />}
          >
            Новая организация
          </Button>
        </Group>
        <SimpleGrid cols={2}>
          {data?.map((org) => (
            <OrgCard key={org.id} {...org} />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Orgs;
