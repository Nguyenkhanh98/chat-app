import { LOCAL_STORAGE } from "@/configs/storage";
import { localStorageAPI } from "@/services/webapi/storage";
import { Outlet, redirect } from "react-router-dom";

const AuthRoute = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthRoute;
export const authRouteLoader = async ({ params }) => {
  return null;
};
