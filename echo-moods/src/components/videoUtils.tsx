// Supporting Video Process/Retrieval Functions

import React from 'react';

export const startCountdown = (
  setCountdown: React.Dispatch<React.SetStateAction<number>>,
  startRecording: (
    setRecording: React.Dispatch<React.SetStateAction<boolean>>,
    videoRef: React.RefObject<HTMLVideoElement>,
    setVideoBlob: React.Dispatch<React.SetStateAction<Blob | null>>,
    mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
  ) => void,
  setRecording: React.Dispatch<React.SetStateAction<boolean>>,
  videoRef: React.RefObject<HTMLVideoElement>,
  setVideoBlob: React.Dispatch<React.SetStateAction<Blob | null>>,
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
) => {
  let time = 3;
  setCountdown(3);
  const interval = setInterval(() => {
    time--;
    setCountdown(time);
    if (time === 0) {
      clearInterval(interval);
      startRecording(setRecording, videoRef, setVideoBlob, mediaRecorderRef);
    }
  }, 1000);
};

export const startRecording = async (
  setRecording: React.Dispatch<React.SetStateAction<boolean>>,
  videoRef: React.RefObject<HTMLVideoElement>,
  setVideoBlob: React.Dispatch<React.SetStateAction<Blob | null>>,
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
) => {
  try {
    // Wait for a media stream and start recording if available
    const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current!.srcObject = userMediaStream;

    const mediaRecorder = new MediaRecorder(userMediaStream);
    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const videoBlob = new Blob(chunks, { type: 'video/mp4' });
      setVideoBlob(videoBlob);
      videoRef.current!.srcObject = null;
      userMediaStream.getTracks().forEach((track) => track.stop());
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);
  } catch (err) {
    console.error('Error accessing camera:', err);
  }
};

// Save video out after completion
export const stopRecording = (
  setRecording: React.Dispatch<React.SetStateAction<boolean>>,
  setVideoBlob: React.Dispatch<React.SetStateAction<Blob | null>>,
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
) => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
    setRecording(false);
  }
};

// Transcription using Symphonic Labs API
export const transcribeVideo = async (videoBlob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append('video', videoBlob, 'input.mp4');
  
  try {
    const response = await fetch('https://symphoniclabs--symphonet-vsr-modal-htn-model-upload-static-htn.modal.run/', {
      method: 'POST',
      body: formData,
    });
    return await response.text();
  } catch (error) {
    console.error('Error transcribing video:', error);
    return 'Error during transcription';
  }
};
