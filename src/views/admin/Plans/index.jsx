import { Box } from "@chakra-ui/react";
import { getPlans } from "Services/PlanService";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";

export default function Plans() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const { planLoading, planList } = useSelector(({ plan }) => plan);

  const loadData = useCallback(() => {
    dispatch(getPlans());
  }, [dispatch]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <DevelopmentTable
        loading={planLoading}
        path={"/plans/add-new-plan"}
        editable={true}
        columnsData={columnsDataDevelopment}
        tableData={planList || []}
        name={"Plans"}
        dataLength={planList?.length}
        pageLength={10}
        gotoPage={setPage}
        pageIndex={0}
      />
    </Box>
  );
}

const columnsDataDevelopment = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "DESCRIPTION",
    accessor: "description",
  },
  {
    Header: "PRICE MONTHLY",
    accessor: "monthly",
  },
  {
    Header: "PRICE YEARLY",
    accessor: "yearly",
  },
  {
    Header: "CURRENCY",
    accessor: "currency",
  },
  {
    Header: "PLAN STATUS",
    accessor: "status",
  },
  {
    Header: "ACTION",
    accessor: "action",
  },
];
