// source: https://justadudewhohacks.github.io/face-api.js/docs/index.html
// Emotion recognition using Face-API

import * as faceapi from 'face-api.js';

// Define the type for the videoBlob parameter
export const processVideo = async (videoBlob: Blob): Promise<string> => {
  if (!videoBlob) return '';

  // Load models: FaceDetector and ExpressionNet
  try {
    console.log('Loading models...');
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]);
    console.log('Models loaded successfully.');
  } catch (error) {
    console.error('Error loading models:', error);
    return 'Error loading models';
  }

  // Convert blob to object URL
  const url = URL.createObjectURL(videoBlob);
  const videoElement = document.createElement('video');
  videoElement.src = url;
  videoElement.play();

  // Detect faces and determine expressions
  return new Promise<string>((resolve) => {
    videoElement.addEventListener('loadeddata', async () => {
      const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
      if (detections.length > 0) {
        // Get the first detected face's expressions (expect one user)
        const expressions = detections[0].expressions;
        // Get the dominant emotion
        const dominantEmotion = expressions.asSortedArray()[0].expression;
        resolve(dominantEmotion);
      } else {
        resolve('No face detected');
      }
      URL.revokeObjectURL(url);  // Release the object URL to avoid memory leaks
    });
  });
};
