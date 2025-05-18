// 90s Apple website JavaScript functionality

// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
  console.log("Welcome to Apple Computer 1995 Edition!");

  setupMusicPlayer();
  setupBlinkEffect();
  createRandomPopup();
});

// Set up the background music player
function setupMusicPlayer() {
  const musicButton = document.getElementById('toggle-music');
  const backgroundMusic = document.getElementById('background-music') as HTMLAudioElement;

  if (musicButton && backgroundMusic) {
    // Handle audio loading errors
    backgroundMusic.addEventListener('error', (e) => {
      console.error('Audio loading error:', e);
      musicButton.textContent = "AUDIO ERROR";
      (musicButton as HTMLElement).style.backgroundColor = "#FF0000";
    });

    // Show when audio is ready
    backgroundMusic.addEventListener('canplaythrough', () => {
      console.log('Audio is ready to play');
      musicButton.removeAttribute('disabled');
    });

    musicButton.addEventListener('click', () => {
      try {
        if (backgroundMusic.paused) {
          // Modern browsers require user interaction for audio
          const playPromise = backgroundMusic.play();

          if (playPromise !== undefined) {
            playPromise.then(() => {
              musicButton.textContent = "STOP MIDI MUSIC";
            }).catch(error => {
              console.error("Playback failed:", error);
              musicButton.textContent = "AUDIO ERROR";
              (musicButton as HTMLElement).style.backgroundColor = "#FF0000";
            });
          }
        } else {
          backgroundMusic.pause();
          backgroundMusic.currentTime = 0;
          musicButton.textContent = "PLAY MIDI MUSIC";
        }
      } catch (err) {
        console.error("Audio player error:", err);
        musicButton.textContent = "AUDIO ERROR";
        (musicButton as HTMLElement).style.backgroundColor = "#FF0000";
      }
    });
  }
}

// Enhance blinking effect with randomness for extra 90s feel
function setupBlinkEffect() {
  const blinkElements = document.querySelectorAll('blink');

  blinkElements.forEach((element) => {
    const randomDuration = (Math.random() * 0.5 + 0.3).toFixed(1);
    (element as HTMLElement).style.animationDuration = `${randomDuration}s`;
  });
}

// Create a random popup effect (simulating the annoying popups of the 90s)
function createRandomPopup() {
  setTimeout(() => {
    const shouldShowPopup = Math.random() > 0.5;

    if (shouldShowPopup) {
      alert("CONGRATULATIONS! You are the 1,000,000th visitor to apple.com! Click OK to claim your FREE iPod!");
    }
  }, 10000 + Math.random() * 20000); // Random time between 10-30 seconds
}

// 90s websites often had annoying cursor trails
document.onmousemove = (e) => {
  const x = e.pageX;
  const y = e.pageY;

  const trailElement = document.createElement('div');
  trailElement.innerHTML = "★";
  trailElement.style.position = "absolute";
  trailElement.style.left = x + "px";
  trailElement.style.top = y + "px";
  trailElement.style.color = getRandomColor();
  trailElement.style.pointerEvents = "none";
  trailElement.style.zIndex = "9999";
  trailElement.style.fontFamily = "Arial";
  trailElement.style.fontSize = "20px";

  document.body.appendChild(trailElement);

  // Add animation
  setTimeout(() => {
    trailElement.style.transition = "all 1s ease-out";
    trailElement.style.opacity = "0";
    trailElement.style.top = (y - 20) + "px";

    // Remove after animation
    setTimeout(() => {
      document.body.removeChild(trailElement);
    }, 1000);
  }, 10);
};

// Helper function to get random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
