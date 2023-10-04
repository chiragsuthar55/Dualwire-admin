import { Box } from "@chakra-ui/react";
import Card from "components/card/Card";
import DevelopmentTable from "../dataTables/components/DevelopmentTable";

const Activity = () => {
  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={data}
          name={"Activity"}
        />
      </Box>
    </>
  );
};

export default Activity;

const columnsDataDevelopment = [
  {
    Header: "NAME",
    accessor: "name",
  },
  // {
  //   Header: "TECH",
  //   accessor: "tech",
  // },

  // {
  //   Header: "DATE",
  //   accessor: "date",
  // },
  {
    Header: "PRICE MONTHLY",
    accessor: "monthly",
  },
  {
    Header: "PRICE YEARLY",
    accessor: "yearly",
  },
  {
    Header: "LIMITS",
    accessor: "limits",
  },
  // {
  //   Header: "PROGRESS",
  //   accessor: "progress",
  // },
  {
    Header: "ACTION",
    accessor: "action",
  },
];
const data = [
  {
    name: "Free",
    date: "12.Jan.2021",
    progress: 75.5,
    yearly: "Lifetime free",
    monthly: "Lifetime free",
    limits: "Up to 600 comments",
  },
];
