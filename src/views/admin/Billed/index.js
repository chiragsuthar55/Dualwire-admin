import { Box } from "@chakra-ui/react";
import DevelopmentTable from "../dataTables/components/DevelopmentTable";

const Billed = () => {
  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <DevelopmentTable
          name={"Payments"}
          editable={false}
          columnsData={columnsDataDevelopment}
          tableData={data}
        />
      </Box>
    </>
  );
};

export default Billed;

const columnsDataDevelopment = [
  {
    Header: "TRANSACTION ID",
    accessor: "transaction_id",
  },
  {
    Header: "RECIPIENT",
    accessor: "recipient",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "DATE & TIME",
    accessor: "datetime",
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
const data = [
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 1,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 2,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
  {
    transaction_id: "ADHUYUG64DFBDH",
    recipient: "Chirag",
    email: "chiragsuthar.codezee@gmail.com",
    datetime: "12.Jan.2021 14:30 PM",
    plan: "free",
    status: 3,
  },
];
