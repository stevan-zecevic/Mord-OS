import React, { useState, useEffect, useRef } from "react";
import {
  faMicrophone,
  faMicrophoneSlash,
  faSync,
  faVideo,
  faVideoSlash,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Common/Header";

const Camera = ({ toggleCamera }) => {
  const myVideo = useRef();
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);

  useEffect(() => {
    initVideo();
  }, [myVideo, audio, video]);

  const initVideo = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video,
        audio,
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

  const toggleVideo = () => setVideo(!video);
  const toggleAudio = () => setAudio(!audio);

  return (
    <section className="camera window">
      <Header title="Web Camera" onClose={toggleCamera} />
      <video ref={myVideo} autoPlay playsInline></video>
      <div className="controls">
        <FontAwesomeIcon
          className="pointer mr-4"
          icon={video ? faVideo : faVideoSlash}
          size="lg"
          color="white"
          onClick={toggleVideo}
        />
        <FontAwesomeIcon
          className="pointer ml-4"
          icon={audio ? faMicrophone : faMicrophoneSlash}
          size="lg"
          color="white"
          onClick={toggleAudio}
        />
      </div>
    </section>
  );
};

export default Camera;
