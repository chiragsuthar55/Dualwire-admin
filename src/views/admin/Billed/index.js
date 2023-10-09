import { Box } from "@chakra-ui/react";
import DevelopmentTable from "../dataTables/components/DevelopmentTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSubscriptionsList } from "Services/PlanService";

const Billed = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const { planLoading, subscriptionsList } = useSelector(({ plan }) => plan);

  useEffect(() => {
    dispatch(getSubscriptionsList(page + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
        />
      </Box>
    </>
  );
};

export default Billed;

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
