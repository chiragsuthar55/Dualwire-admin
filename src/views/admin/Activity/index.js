import { Box } from "@chakra-ui/react";
import DevelopmentTable from "../dataTables/components/DevelopmentTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserActivityList } from "Services/UsersServices";

const Activity = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const { usersLoading, userActivityList } = useSelector(({ users }) => users);

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(
        getUserActivityList(page + 1, pageSize, startDate, endDate, search)
      );
    }, 500);
    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, pageSize, startDate, endDate]);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          name={"Activity"}
          loading={usersLoading}
          path={"/users/add-user"}
          editable={false}
          tableData={userActivityList?.records || []}
          dataLength={userActivityList?.total}
          pageLength={userActivityList?.per_page}
          gotoPage={setPage}
          pageIndex={userActivityList?.current_page - 1}
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

export default Activity;

const columnsDataDevelopment = [
  {
    Header: "USERNAME",
    accessor: "username",
  },
  {
    Header: "LOGIN TIME",
    accessor: "logon_time",
  },
  {
    Header: "LOGOUT TIME",
    accessor: "logout_time",
  },
  {
    Header: "IP ADDRESS",
    accessor: "ip_address",
  },
  {
    Header: "COUNTRY",
    accessor: "country_code",
  },
  {
    Header: "AVG TIME SPENDED",
    accessor: "average_time",
  },
  {
    Header: "USER STATUS",
    accessor: "status",
  },
];
