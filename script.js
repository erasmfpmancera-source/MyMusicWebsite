// =========================================
// 1. AUDIO PLAYER CONTROLS
// =========================================
const audio = document.getElementById('bg-music');
const btnPlay = document.getElementById('btn-play');
const btnStop = document.getElementById('btn-stop');

btnPlay.addEventListener('change', () => {
  if (btnPlay.checked) {
    audio.play().catch(error => console.log("Audio play failed:", error));
  }
});

btnStop.addEventListener('change', () => {
  if (btnStop.checked) {
    audio.pause();
  }
});

// =========================================
// 2. SLIDER SYSTEM
// =========================================
function showSlide(index) {
  const slider = document.getElementById('slider');
  const navButtons = document.querySelectorAll('.nav-btn');

  navButtons.forEach(btn => btn.classList.remove('active'));
  if(navButtons[index]) navButtons[index].classList.add('active');

  slider.style.transform = `translateX(-${index * 20}%)`;

  if (index === 1) {
    btnPlay.checked = true;
    audio.play().catch(error => console.log("Audio play failed:", error));
  } else {
    audio.pause();
  }
}

// =========================================
// 3. DISCOGRAPHY FILTER
// =========================================
function filterTracks(category, event) {
  const tracks = document.querySelectorAll('.track-item');
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => btn.classList.remove('active'));
  if (event && event.target) {
    event.target.classList.add('active');
  }

  tracks.forEach(track => {
    if (category === 'all' || track.dataset.category === category) {
      track.style.display = 'block';
    } else {
      track.style.display = 'none';
    }
  });
}

// =========================================
// 4. LIKE SYSTEM (LOCAL STORAGE)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const likedTracks = JSON.parse(localStorage.getItem('likedTracks')) || [];
  const trackItems = document.querySelectorAll('.track-item');

  trackItems.forEach((item, index) => {
    const likeBtn = item.querySelector('.like-btn');
    const trackId = `track-${index}`;

    // Check if already liked
    if (likedTracks.includes(trackId)) {
      likeBtn.classList.add('liked');
      likeBtn.innerHTML = 'Liked!';
    }

    // Add event listener
    likeBtn.addEventListener('click', () => {
      let currentLikes = JSON.parse(localStorage.getItem('likedTracks')) || [];
      
      if (currentLikes.includes(trackId)) {
        // Unlike
        currentLikes = currentLikes.filter(id => id !== trackId);
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = 'Like';
      } else {
        // Like
        currentLikes.push(trackId);
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = 'Liked!';
      }
      
      localStorage.setItem('likedTracks', JSON.stringify(currentLikes));
    });
  });
});

// =========================================
// 5. FADE-IN ON SCROLL
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in-section");
  fadeElements.forEach((el) => observer.observe(el));
});