import { useEffect } from 'react';

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = new Audio('background-music.wav');
    audio.volume = 0.2;
    audio.loop = true;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Playback started successfully
      }).catch(error => {
        // Audio playback failed
        console.error('Audio playback failed:', error);
      });
    }

    // Cleanup
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null; // Since this component doesn't render anything
};

export default BackgroundMusic;