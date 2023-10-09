import { Icon } from "@chakra-ui/react";
import {
  // MdBarChart,
  // MdPerson,
  // MdLock,
  // MdOutlineShoppingCart,
  MdHome,
  MdSubscriptions,
  MdLocalActivity,
  MdGroup,
  MdPayment,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default/index";
// import MainDashboard from "views/admin/default";
// import NFTMarketplace from "views/admin/marketplace";
// import Profile from "views/admin/profile";
// import DataTables from "views/admin/dataTables";
// import RTL from "views/admin/rtl";

// Auth Imports
// import SignInCentered from "views/auth/signIn";
import Plans from "views/admin/Plans";
import AddPlan from "views/admin/Plans/AddPlan";
import Activity from "views/admin/Activity";
import Billed from "views/admin/Billed";
import Users from "views/admin/Users";
import PaymentDetails from "views/admin/Billed/PaymentDetails";
import { AiFillSlackCircle } from "react-icons/ai";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },

  {
    name: "Users",
    layout: "/admin",
    icon: <Icon as={MdGroup} width="20px" height="20px" color="inherit" />,
    path: "/users",
    component: <Users />,
  },
  {
    name: "Plans",
    layout: "/admin",
    icon: (
      <Icon as={MdSubscriptions} width="20px" height="20px" color="inherit" />
    ),
    path: "/plans",
    component: <Plans />,
  },
  {
    name: "Activity",
    layout: "/admin",
    icon: (
      <Icon as={MdLocalActivity} width="20px" height="20px" color="inherit" />
    ),
    path: "/activity",
    component: <Activity />,
  },
  {
    name: "Subscriptions",
    layout: "/admin",
    icon: <Icon as={MdPayment} width="20px" height="20px" color="inherit" />,
    path: "/subscriptions",
    component: <Billed />,
  },
  {
    name: "Subscriptions",
    layout: "/admin/subscriptions/view",
    icon: <Icon as={MdPayment} width="20px" height="20px" color="inherit" />,
    path: "/subscriptions",
    component: <PaymentDetails />,
  },
  {
    name: "Raffles",
    layout: "/admin",
    icon: (
      <Icon as={AiFillSlackCircle} width="20px" height="20px" color="inherit" />
    ),
    path: "/raffles",
    component: <PaymentDetails />,
  },
  {
    name: "Add New Plan",
    layout: "/admin/plans/add-new-plan",
    icon: (
      <Icon as={MdSubscriptions} width="20px" height="20px" color="inherit" />
    ),
    path: "/plans/add-new-plan",
    component: <AddPlan />,
  },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: Profile,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: <SignInCentered />,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: RTL,
  // },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: "/data-tables",
  //   component: <DataTables />,
  // },
];

export default routes;
