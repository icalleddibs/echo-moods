// Transcription and Emotion display

import React from 'react';
import './Transcription.css';

interface TranscriptionProps {
  transcription: string;
  emotion: string;
}

const Transcription: React.FC<TranscriptionProps> = ({ transcription, emotion }) => {
  return (
    <div className="transcription-results">
      <h3>Transcription:</h3>
      <h3>{transcription}</h3>
      <h3>Detected Emotion:</h3>
      <h3>{emotion}</h3>
    </div>
  );
};

export default Transcription;
