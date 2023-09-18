import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/services/firebase";
const RootRoute = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default RootRoute;

export const rootRouteLoader = async () => {
  const auth = new Promise((resolve, reject) => {
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (!currentUser) {
        resolve(null);
      }
      resolve(currentUser);
    });
  });
  const result = await auth;
  return result;
};
