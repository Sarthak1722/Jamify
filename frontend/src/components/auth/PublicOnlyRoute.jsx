import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AppLoadingScreen from "../app/AppLoadingScreen.jsx";

const PublicOnlyRoute = () => {
  const { authUser, authStatus } = useSelector((store) => store.user);

  if (authStatus === "idle" || authStatus === "checking") {
    return <AppLoadingScreen label="Preparing Jamify…" />;
  }

  if (authUser?._id) {
    return <Navigate to="/homepage/home" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;

