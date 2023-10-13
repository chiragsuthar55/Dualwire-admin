import { Box } from "@chakra-ui/react";
import DevelopmentTable from "../dataTables/components/DevelopmentTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRafflesList } from "Services/PlanService";

const Raffles = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState("");
  const { planLoading, rafflesList } = useSelector(({ plan }) => plan);

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(getRafflesList(page + 1, pageSize, sort));
    }, 500);
    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, pageSize]);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <DevelopmentTable
          name={"Raffles"}
          editable={false}
          columnsData={columnsDataDevelopment}
          loading={planLoading}
          path={"/Raffles"}
          gotoPage={setPage}
          tableData={rafflesList?.records || []}
          dataLength={rafflesList?.total}
          pageLength={rafflesList?.per_page}
          pageIndex={rafflesList?.current_page - 1}
          perPage={pageSize}
          setPerPage={setPageSize}
          sort={sort}
          setSort={setSort}
        />
      </Box>
    </>
  );
};

export default Raffles;

const columnsDataDevelopment = [
  {
    Header: "TITLE",
    accessor: "title",
  },
  {
    Header: "CHANNEL TITLE",
    accessor: "channelTitle",
  },
  {
    Header: "COMMENTS",
    accessor: "comments",
  },
  {
    Header: "WINNER",
    accessor: "winner",
  },
];
