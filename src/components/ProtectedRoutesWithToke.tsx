import { Navigate } from "react-router-dom";

const ProtectedRoutesWithToken = ({ children }: any) => {
  if (localStorage.getItem("userToken")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoutesWithToken;
