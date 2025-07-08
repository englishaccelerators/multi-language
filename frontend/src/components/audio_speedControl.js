
// 📁 speedControl.js
// Add this to any audio block where Admin enables speed control

function playAudioWithSpeed(url, speed = 1.0) {
  const audio = new Audio(url);
  audio.playbackRate = speed; // 0.25, 0.5, 1.0
  audio.play();
}

// Example HTML buttons with handler (Admin-selected layout):
// <button onclick="playAudioWithSpeed('UK/word.mp3', 0.25)">🐢 0.25x</button>
// <button onclick="playAudioWithSpeed('UK/word.mp3', 0.5)">🐢 0.5x</button>
// <button onclick="playAudioWithSpeed('UK/word.mp3', 1)">🎧 1x</button>

// This file can be imported or copied into Spelling, Dictation, or Dictionary blocks.
