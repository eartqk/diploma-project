import { SimpleGrid } from "@mantine/core";
import sciLinkApi from "../../store/sciLinkApi";
import UserCard from "../../components/UserCard";

const Users = () => {
  const { data } = sciLinkApi.useGetUsersQuery();
  console.log(data);
  return (
    <SimpleGrid cols={2}>
      {data?.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </SimpleGrid>
  );
};

export default Users;
