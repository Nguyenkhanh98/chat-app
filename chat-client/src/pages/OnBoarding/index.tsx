import { useEffect, useState } from "react";

import Resizer from "react-image-file-resizer";
import OnBoardingComponent from "@/components/OnBoardingComponent";
import { onBoardingUser } from "@/services/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const resizeFile = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "PNG",
      80,
      0,
      (uri: any) => {
        resolve(uri);
      },
      "base64"
    );
  });

export default function OnBoarding() {
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;

  const { userInfo } = state;
  if (!userInfo) {
    navigate("login");
  }

  const [image, setImage] = useState("/default_avatar.png");
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const { mutate, data } = useMutation(onBoardingUser);

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data]);

  const onBoardUser = async () => {
    if (validateDetails()) {
      const email = userInfo?.email;
      const base64Response = await fetch(`${image}`);
      const blob = await base64Response.blob();

      const imageData: any = await resizeFile(blob);
      setImage(imageData);
      mutate(
        { email, name, about, image },
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

  const validateDetails = () => {
    if (name.length < 3) {
      // Toast Notification
      return false;
    }
    return true;
  };

  return (
    <OnBoardingComponent
      about={about}
      name={name}
      setName={setName}
      setAbout={setAbout}
      onBoardUser={onBoardUser}
    />
  );
}
