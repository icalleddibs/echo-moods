import React from 'react';
import './Feedback.css';

// Define the props type for Feedback
interface FeedbackProps {
  cohereFeedback: string; // Accept the cohereFeedback prop
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



/* import React from 'react';

// Define the props type for Feedback
interface FeedbackProps {
  cohereFeedback: string; // Accept the cohereFeedback prop
}

// Feedback component that accepts cohereFeedback prop
const Feedback: React.FC<FeedbackProps> = ({ cohereFeedback }) => {
  return (
    <div className="feedback-block">
      <h3>Cohere Feedback:</h3>
      <p>{cohereFeedback}</p>
    </div>
  );
};

export default Feedback;
 */