import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: any) => {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
