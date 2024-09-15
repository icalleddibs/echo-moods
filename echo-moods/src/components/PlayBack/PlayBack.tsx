// Video Playback file

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
