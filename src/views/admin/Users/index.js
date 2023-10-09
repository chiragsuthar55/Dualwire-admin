import { Box } from "@chakra-ui/react";
import DevelopmentTable from "../dataTables/components/DevelopmentTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUsersList } from "Services/UsersServices";

const Users = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const { usersLoading, usersList } = useSelector(({ users }) => users);

  useEffect(() => {
    dispatch(getUsersList(page + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <DevelopmentTable
          loading={usersLoading}
          name={"Users"}
          path={"/users/add-user"}
          editable={true}
          columnsData={columnsDataDevelopment}
          tableData={usersList?.records || []}
          dataLength={usersList?.total}
          pageLength={usersList?.per_page}
          gotoPage={setPage}
          pageIndex={usersList?.current_page - 1}
        />
      </Box>
    </>
  );
};

export default Users;

const columnsDataDevelopment = [
  {
    Header: "FIRST NAME",
    accessor: "first_name",
  },
  {
    Header: "LAST NAME",
    accessor: "last_name",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "JOINED DATE",
    accessor: "joined_date",
  },
  {
    Header: "PLAN",
    accessor: "plan",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "ACTION",
    accessor: "action",
  },
];
// const data = [
//   {
//     name: "Chirag",
//     email: "chiragsuthar.codezee@gmail.com",
//     joindate: "12.Jan.2021",
//     plan: "free",
//     is_active: true,
//   },
// ];
