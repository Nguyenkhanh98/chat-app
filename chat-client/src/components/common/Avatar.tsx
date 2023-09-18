import React, { useEffect, useState } from "react";

import { FaCamera } from "react-icons/fa";

export default function Avatar({ type, image }) {
  const [hover, setHover] = useState(false);
  const [grabImage, setGrabImage] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [isFirstRun, setIsFirstRun] = useState(true);

  useEffect(() => {
    if (grabImage) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setGrabImage(false);
      };
    }
  }, [grabImage]);

  useEffect(() => {
    const handleClick = () => {
      if (!isFirstRun) {
        setIsContextMenuVisible(false);
        setIsFirstRun(true);
      } else setIsFirstRun(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", handleClick);
    }
    return () => window.removeEventListener("click", handleClick);
  }, [isContextMenuVisible, isFirstRun]);

  const showContextMenu = (e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <img src={image} alt="avatar" className={`h-10 w-10 rounded-full`} />
        )}
        {type === "lg" && (
          <img src={image} alt="avatar" className={`h-14 w-14 rounded-full`} />
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 rounded-full flex items-center justify-center flex-col text-center gap-2 ${
                hover ? "visible" : "hidden"
              }`}
              id="context-opener"
              onClick={(e) => showContextMenu(e)}
            >
              <FaCamera
                className="text-2xl"
                id="context-opener"
                onClick={(e) => showContextMenu(e)}
              />
              <span
                className=""
                id="context-opener"
                onClick={(e) => showContextMenu(e)}
              >
                Change <br></br> Profile <br></br> Photo
              </span>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={image}
                alt="avatar"
                className={`h-60 w-60 rounded-full object-cover `}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
