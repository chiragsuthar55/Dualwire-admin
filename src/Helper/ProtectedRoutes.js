import { Navigate } from "react-router-dom";
import { setupToken } from "./AuthTokenHelper";

const ProtectedRoutes = ({ children }) => {
  const Token = setupToken();

  if (Token == false) {
    return <Navigate to="/auth/sign-in" replace={true} />;
  } else {
    return <children.type {...children.props} />;
  }
};

export default ProtectedRoutes;
