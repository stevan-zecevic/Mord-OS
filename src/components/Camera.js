import React, { useState, useEffect, useRef } from "react";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Common/Header";

const Camera = ({ toggleCamera }) => {
  const myVideo = useRef();
  const [facingMode, setFacingMode] = useState({ exact: "environment" });

  useEffect(() => {
    initVideo();
  }, [myVideo]);

  const initVideo = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: { facingMode },
        audio: true,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        myVideo.current.srcObject = stream;
        myVideo.current.play();
      } catch (error) {
        alert("This devices doesn't have cameras!");
        toggleCamera();
      }
    }
  };

  const changeCamera = () => setFacingMode({ exact: "user" });

  return (
    <section className="camera window">
      <Header title="Web Camera" onClose={toggleCamera} />
      <video ref={myVideo} autoPlay playsInline></video>
      <FontAwesomeIcon
        className="switch-camera pointer"
        icon={faSync}
        size="2x"
        color="white"
        onClick={changeCamera}
      />
    </section>
  );
};

export default Camera;
