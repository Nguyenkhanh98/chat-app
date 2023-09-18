import { useReadCachAppContext } from "@/caches/reads/appContext";
import { useReadCacheSocket } from "@/caches/reads/socket";
import { appContextInitCache } from "@/caches/vars";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import { firebaseAuth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const updateAppContext = useWriteCacheAppContext();
  const appContext = useReadCachAppContext();
  const { profile: userInfo } = appContext;
  const socket = useReadCacheSocket();
  const navigate = useNavigate();
  console.log(socket, "socketsocket");
  useEffect(() => {
    if (socket) {
      socket.current.emit("signout", userInfo.id);
      updateAppContext(appContextInitCache);

      signOut(firebaseAuth);
      navigate("/login");
    }
  }, [socket]);

  return <div className="bg-conversation-panel-background"></div>;
}

export default Logout;
