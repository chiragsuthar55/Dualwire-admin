import { Box } from "@chakra-ui/react";
import DevelopmentTable from "../dataTables/components/DevelopmentTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSubscriptionsList } from "Services/PlanService";

const Subscriptions = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  const { planLoading, subscriptionsList } = useSelector(({ plan }) => plan);

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(
        getSubscriptionsList(page + 1, pageSize, startDate, endDate, search)
      );
    }, 500);
    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, pageSize, startDate, endDate]);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <DevelopmentTable
          name={"Subscriptions"}
          editable={false}
          columnsData={columnsDataDevelopment}
          tableData={subscriptionsList?.records || []}
          loading={planLoading}
          path={"/plans/add-new-plan"}
          dataLength={subscriptionsList?.total}
          gotoPage={setPage}
          pageLength={subscriptionsList?.per_page}
          pageIndex={subscriptionsList?.current_page - 1}
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

export default Subscriptions;

const columnsDataDevelopment = [
  {
    Header: "RECIPIENT",
    accessor: "recipient",
  },
  {
    Header: "PLAN",
    accessor: "plan_name",
  },
  {
    Header: "AMOUNT",
    accessor: "amount",
  },
  {
    Header: "CUSTOMER EMAIL",
    accessor: "customer_email",
  },
  {
    Header: "SUBSCRIPTION ID",
    accessor: "stripe_subscription_id",
  },
  {
    Header: "PLAN INTERVAL",
    accessor: "plan_interval",
  },
  {
    Header: "DATE & TIME",
    accessor: "created",
  },
  {
    Header: "PLAN PERIOD START",
    accessor: "plan_period_start",
  },
  {
    Header: "PLAN PERIOD END",
    accessor: "plan_period_end",
  },
  {
    Header: "STATUS",
    accessor: "statusStr",
  },
];
