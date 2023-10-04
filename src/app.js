import { useCallback, useEffect } from "react";
import axios from "axios";
import { REACT_APP_APIURL } from "Helper/Environment";
import { clearToken } from "Helper/AuthTokenHelper";
import { setupToken } from "Helper/AuthTokenHelper";
import { toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "layouts/admin";
import { useDispatch } from "react-redux";
import SignInCentered from "views/auth/signIn";
// import DataTables from "./views/admin/dataTables";
import MainDashboard from "./views/admin/default/index";
import SignUp from "layouts/auth/SignUp";
import AuthIllustration from "layouts/auth/Default";
import ForgotPassword from "views/auth/ForgotPassword";
import Plans from "views/admin/Plans";
import AddPlan from "views/admin/Plans/AddPlan";
import Activity from "views/admin/Activity";
import Billed from "views/admin/Billed";
import CustomProfile from "views/admin/profile/CustomProfile";
import { getProfile } from "Services/AuthServices";
import ProtectedRoutes from "Helper/ProtectedRoutes";
import ResetPassword from "views/auth/ResetPassword";
import Users from "views/admin/Users";
import PaymentDetails from "views/admin/Billed/PaymentDetails";
import store from "Store/Index";
import { getNewToken } from "Services/AuthServices";
import AddUser from "views/admin/Users/AddUser";

axios.defaults.baseURL = REACT_APP_APIURL;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      window.location.href = "/";
      clearToken();
      toast.error("Access Token is not valid or has expired");
    }
    return Promise.reject(error);
  }
);

const Token = setupToken();
if (!Token) store.dispatch(getNewToken());

const App = () => {
  const dispatch = useDispatch();

  let UserPreferences = localStorage.getItem("UserPreferences");
  if (UserPreferences) UserPreferences = JSON.parse(atob(UserPreferences));

  const loadData = useCallback(() => {
    if (UserPreferences?.token) {
      dispatch(getProfile());
    }
  }, [UserPreferences?.token, dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={`/`}
            element={
              <ProtectedRoutes>
                <AdminLayout />
              </ProtectedRoutes>
            }
          >
            <Route path={`/`} element={<MainDashboard />} />
            {/* <Route path={`/data-tables`} element={<DataTables />} /> */}
            <Route path={`/plans`} element={<Plans />} />
            <Route path={`/plans/add-new-plan`} element={<AddPlan />} />
            <Route path={`/plans/:plan_id`} element={<AddPlan />} />
            <Route path={`/activity`} element={<Activity />} />
            <Route path={`/users`} element={<Users />} />
            <Route path={`/users/:u_id`} element={<AddUser />} />
            <Route path={`/users/add-user`} element={<AddUser />} />
            <Route path={`/payments`} element={<Billed />} />
            <Route path={`/payments/:t_id`} element={<PaymentDetails />} />
            <Route path={`/profile`} element={<CustomProfile />} />
            <Route path="/*" element={<MainDashboard />} />
          </Route>
          <Route path="/auth" element={<AuthIllustration />}>
            <Route path={`/auth/sign-in`} element={<SignInCentered />} />
            <Route path={`/auth/sign-up`} element={<SignUp />} />
            <Route
              path={`/auth/forgot-password`}
              element={<ForgotPassword />}
            />
            <Route path={`/auth/reset-password`} element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
