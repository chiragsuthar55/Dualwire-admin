import { Box } from "@chakra-ui/react";
import DevelopmentTable from "../dataTables/components/DevelopmentTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUsersList } from "Services/UsersServices";

const Users = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const { usersLoading, usersList } = useSelector(({ users }) => users);

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(getUsersList(page + 1, pageSize, startDate, endDate, search));
    }, 500);
    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, pageSize, startDate, endDate]);

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
          perPage={pageSize}
          setPerPage={setPageSize}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          search={search}
          setSearch={setSearch}
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
