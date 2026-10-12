// Get the audio element and buttons
const audio = document.getElementById('bg-music');
const btnPlay = document.getElementById('btn-play');
const btnStop = document.getElementById('btn-stop');

// Play button
btnPlay.addEventListener('change', () => {
  if (btnPlay.checked) {
    audio.play().catch(error => console.log("Audio play failed:", error));
  }
});

// Stop button
btnStop.addEventListener('change', () => {
  if (btnStop.checked) {
    audio.pause();
  }
});

// --- Auto-play placeholder ---
// BandLab iframes cannot be controlled by our site, so we can't auto-play them.
// But if you download your tracks as MP3s, we can create a playlist here.
audio.addEventListener('ended', () => {
  console.log("Track finished. If you want to play a next track, it would go here.");
  // Example of how you would play the next local track:
  // audio.src = "woppaaa.mp3";
  // audio.play();
});

// Function to switch slides
function showSlide(slideId) {
  const slider = document.getElementById('slider');
  const navButtons = document.querySelectorAll('.nav-btn');

  // Remove active class from all buttons
  navButtons.forEach(btn => btn.classList.remove('active'));

  if (slideId === 'about') {
    // Slide to the About Me section
    slider.classList.add('about-active');
    
    // Highlight the About Me button
    navButtons[1].classList.add('active');

    // When entering the slide, set it to Play and start the music
    btnPlay.checked = true;
    audio.play().catch(error => console.log("Audio play failed:", error));
  } else {
    // Slide back to the Home section
    slider.classList.remove('about-active');
    
    // Highlight the Home button
    navButtons[0].classList.add('active');

    // Pause the music when going back to home
    audio.pause();
  }
}