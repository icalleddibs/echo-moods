// Display Cohere Feedback

import React from 'react';
import './Feedback.css';

interface FeedbackProps {
  cohereFeedback: string; // Retrieve Cohere result
}

// Feedback component that accepts cohereFeedback prop
const Feedback: React.FC<FeedbackProps> = ({ cohereFeedback }) => {
  return (
    <div className="feedback-block">
      <h3>Cohere Feedback:</h3>
      <p className="cohere-feedback">{cohereFeedback}</p>
    </div>
  );
};

export default Feedback;
