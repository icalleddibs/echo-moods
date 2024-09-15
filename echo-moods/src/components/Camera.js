// source: https://codesandbox.io/p/sandbox/react-webcam-demo-wrecn?file=%2Fsrc%2FCamera.js


import './Camera.css';
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
}

const Camera = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isFirstRecording, setIsFirstRecording] = useState(true); // Tracks if it's the first recording
  const navigate = useNavigate();

  const startRecording = () => {
    const stream = webcamRef.current.stream;
    const options = { mimeType: "video/webm" }; // Use webm format for better support

    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      alert("WebM format is not supported in this browser.");
      return;
    }

    mediaRecorderRef.current = new MediaRecorder(stream, options);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoBlob(blob);
      setVideoUrl(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    setIsFirstRecording(false); // After first recording, set this to false
  };

  const handleNavigate = () => {
    if (videoBlob) {
      navigate('/recording-page', { state: { videoBlob } });
    }
  };

  // Determine button label based on the state
  let buttonLabel;
  if (isFirstRecording && !recording) {
    buttonLabel = "Start Recording";
  } else if (recording) {
    buttonLabel = "Stop Recording";
  } else {
    buttonLabel = "Re-record";
  }

  return (
    <div className="camera-container">
      <p>
        {isFirstRecording ? "Record your video by clicking the button below." :
        "Once finished, you can stop the recording and analyze the video."}
      </p>
      <div className="webcam-wrapper">
        <Webcam ref={webcamRef} audio={true} videoConstraints={videoConstraints} className="webcam" />
      </div>
      <div className="button-container">
        {recording ? (
          <button onClick={stopRecording} className="custom-button1">
            {buttonLabel}
          </button>
        ) : (
          <button onClick={startRecording} className="custom-button1">
            {buttonLabel}
          </button>
        )}
      </div>
      {videoBlob && (
        <div className="video-preview">
          <button onClick={handleNavigate} className="custom-button2">Go to Analysis</button>
        </div>
      )}
      <div className="button-container">
        <button onClick={() => navigate('/')} className="custom-button1">Back to Home</button>
      </div>
    </div>
  );
};

export default Camera;
















/*
import './Camera.css';
import React, { useRef, useState } from "react";

import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
}

const Camera = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  const startRecording = () => {
    const stream = webcamRef.current.stream;
    const options = { mimeType: "video/webm" }; // Use webm format for better support

    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      alert("WebM format is not supported in this browser.");
      return;
    }

    mediaRecorderRef.current = new MediaRecorder(stream, options);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoBlob(blob);
      setVideoUrl(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleNavigate = () => {
    if (videoBlob) {
      navigate('/recording-page', { state: { videoBlob } });
    }
  };

  

  return (
    <div className="camera-container">
      <p>Record your video by clicking the button below.<br />Once finished, you can stop the recording and analyze the video.</p>
      <div className="webcam-wrapper">
        <Webcam ref={webcamRef} audio={true} videoConstraints={videoConstraints} className="webcam" />
      </div>
      <div className="button-container">
        {recording ? (
          <button onClick={stopRecording} className="custom-button1">Stop Recording</button>
        ) : (
          <button onClick={startRecording} className="custom-button1">Start Recording</button>
        )}
      </div>
      {videoBlob && (
        <div className="video-preview">
          <button onClick={handleNavigate} className="custom-button1">Go to Analysis</button>
        </div>
      )}
      <div className="button-container">
        <button onClick={() => navigate('/')} className="custom-button1">Back to Home</button>
      </div>
    </div>
  );
};
export default Camera;


// <video src={videoUrl} controls className="video" /> */