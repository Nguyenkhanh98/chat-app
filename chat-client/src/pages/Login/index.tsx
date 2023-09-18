import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/services/firebase";
import { useNavigate } from "react-router-dom";

import LoginComponent from "@/components/LoginComponent";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCheckUserMutation } from "@/operations/mutations/user";
import { toast } from "react-toastify";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";

export default function Login() {
  const navigate = useNavigate();
  const { mutate, data, error } = useCheckUserMutation();
  const [fireBaseProfile, setFireBaseProfile] = useState<any>(null);
  const updateAppContext = useWriteCacheAppContext();
  //   useEffect(() => {
  //     console.log({ userInfo });
  //     if (userInfo?.id && !newUser) navigate("");
  //   }, [userInfo, newUser]);
  console.log(error, "errorerrorerror", data);

  useEffect(() => {
    if (data) {
      console.log(data);

      updateAppContext({
        profile: {
          id: data.data.id,
          email: data.data.email,
          name: data.data.name,
          profilePicture: data.data.profilePicture,
          status: data.data.status,
          about: data.data.about,
        },
      });
      navigate("/");
    }
    if (error) {
      if (error?.response?.data && !error.response.data.status) {
        navigate("/onboarding", {
          state: {
            userInfo: {
              name: fireBaseProfile.name,
              email: fireBaseProfile.email,
              profileImage: fireBaseProfile.profileImage,
              status: "Available",
            },
          },
        });
      }
    }
  }, [data, error]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    setFireBaseProfile({
      name,
      profileImage,
      email,
    });

    if (email) {
      mutate(
        { email },
        {
          onError: () => {
            toast.error("Some thing occurred. Please try again");
          },
          onSuccess: () => {
            toast.success("Check success !");
          },
        }
      );
    }
  };
  return <LoginComponent login={login} />;
}
