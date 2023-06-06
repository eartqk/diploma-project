import { Modal, Stack } from "@mantine/core";
import sciLinkApi from "../store/sciLinkApi";
import UserCard from "./UserCard";

interface FollowListModalProps {
  opened: boolean;
  close: () => void;
  title: string;
  userId: string;
  type: "followers" | "followedTo" | "orgs";
}

const FollowListModal: React.FC<FollowListModalProps> = ({
  opened,
  close,
  title,
  type,
  userId,
}) => {
  const { data: followers } = sciLinkApi.useGetUserFollowersQuery(userId, {
    skip: type !== "followers",
  });
  const { data: followedTo } = sciLinkApi.useGetUserFollowedUsersQuery(userId, {
    skip: type !== "followers",
  });
  const { data: orgs } = sciLinkApi.useGetUserFollowedOrgsQuery(userId, {
    skip: type !== "orgs",
  });

  return (
    <Modal opened={opened} onClose={close} title={title}>
      {
        <Stack>
          {followers?.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
          {followedTo?.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </Stack>
      }
    </Modal>
  );
};

export default FollowListModal;
