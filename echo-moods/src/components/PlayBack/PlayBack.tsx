/* import React from 'react';
import "./PlayBack.css";
const PlayBack = () => {
  return (
    <div className="container-video">
      <video width="100%" controls>
        <source src="cat.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
export default PlayBack; */

import React from 'react';

interface PlaybackProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoBlob: Blob | null;
}

const Playback: React.FC<PlaybackProps> = ({ videoRef, videoBlob }) => {
  return (
    <div className="container-video">
      {videoBlob && (
        <video ref={videoRef} src={videoBlob ? URL.createObjectURL(videoBlob) : ''} controls className="video" />
      )}
    </div>
  );
};

export default Playback;
