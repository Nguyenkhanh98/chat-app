import { useReadCachAppContext } from "@/caches/reads/appContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import { useCheckUserMutation } from "@/operations/mutations/user";
import { useRouteLoaderData } from "react-router-dom";
import { useEffect } from "react";
const PrivateRoute = () => {
  const appContext = useReadCachAppContext();
  const updateAppContext = useWriteCacheAppContext();
  const { mutate } = useCheckUserMutation();
  const navigate = useNavigate();
  const { profile: userInfo } = appContext;

  const currentUser: any = useRouteLoaderData("root");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  useEffect(() => {
    if (!userInfo && currentUser?.email) {
      mutate(
        { email: currentUser.email },
        {
          onError: (error) => {
            if (error?.response?.data && !error.response.data.status)
              navigate("/login");
          },
          onSuccess: (result) => {
            updateAppContext({
              profile: {
                id: result?.data?.id,
                email: result?.data?.email,
                name: result?.data?.name,
                profilePicture: result?.data?.profilePicture,
                status: result?.data?.about,
                about: result?.data?.about,
              },
            });
          },
        }
      );
    }
  }, [userInfo]);

  return <>{userInfo && <Outlet />}</>;
};

export default PrivateRoute;
export const privateRouterLoader = async () => {
  return null;
};
