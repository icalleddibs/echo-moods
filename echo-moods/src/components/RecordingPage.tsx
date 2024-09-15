import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { transcribeVideo, startCountdown, startRecording, stopRecording } from './videoUtils';
import { processVideo } from './emotionRecognition';
import Feedback from "./Feedback/Feedback";
import PlayBack from "./PlayBack/PlayBack";
import Transcription from "./Transcription/Transcription";
import './RecordingPage.css';

const RecordingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [emotion, setEmotion] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [cohereFeedback, setCohereFeedback] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (location.state?.videoBlob) {
      setVideoBlob(location.state.videoBlob);
    }
  }, [location.state]);

  const handleStartRecording = () => {
    startCountdown(setCountdown, startRecording, setRecording, videoRef, setVideoBlob, mediaRecorderRef);
  };

  const handleStopRecording = () => {
    stopRecording(setRecording, setVideoBlob, mediaRecorderRef);
  };


  const handleTranscribe = async () => {
    if (videoBlob) {
      try {
        //transcribe video with symphonics API
        console.log('Transcribing video...');
        const result = await transcribeVideo(videoBlob);
        console.log('Transcription result:', result);
        setTranscription(result);

        //analyze emotion
        const detectedEmotion = await processVideo(videoBlob);
        console.log('Detected emotion:', detectedEmotion);
        setEmotion(detectedEmotion);

        //analyze with cohere
        const cohereResult = await fetch('http://localhost:3001/analyse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transcription: result, emotion: detectedEmotion }),
        })
        // analyzeWithCohere(result, detectedEmotion);
        console.log('Cohere result:', cohereResult);
        setCohereFeedback(await cohereResult.text());
      } catch (error) {
        console.error('Error during transcription, detection, or analysis:', error);
      }
    } else {
      console.log('No video available for transcription.');
    }
  };

  return (
    <div className="recording-page">
            
      {videoBlob && (
        <>
          <PlayBack videoRef={videoRef} videoBlob={videoBlob} />
          <button onClick={handleTranscribe} className="custom-button">Transcribe and Analyze Emotion</button>
          <Transcription transcription={transcription} emotion={emotion} />
          {cohereFeedback && (
            <Feedback cohereFeedback={cohereFeedback} />
          )}
        </>
      )}
      <button onClick={() => navigate('/')} className="custom-button">Back to Home</button>
    </div>
  );
};

export default RecordingPage;
