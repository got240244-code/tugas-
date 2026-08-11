document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loginForm = document.getElementById('login-form');
  const loginOverlay = document.getElementById('login-overlay');
  const bgAudio = document.getElementById('bg-audio');
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  const btnToggle = document.getElementById('btn-toggle');
  const sidebar = document.getElementById('sidebar');
  const navItems = document.querySelectorAll('.list-item');
  const contentSections = document.querySelectorAll('.content-section');
  const goToBlogBtn = document.getElementById('go-to-blog');
  const tocItems = document.querySelectorAll('.toc-item');

  // 1. Submit Login Form
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginOverlay.classList.add('hidden');
      
      // Memutar audio jika diizinkan browser
      bgAudio.play().then(() => {
        musicIcon.className = 'bi bi-volume-up';
      }).catch((err) => {
        console.log('Autoplay audio ditahan oleh browser:', err);
      });
    });
  }

  // 2. Play / Pause Audio
  if (musicToggle && bgAudio) {
    musicToggle.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play();
        musicIcon.className = 'bi bi-volume-up';
      } else {
        bgAudio.pause();
        musicIcon.className = 'bi bi-volume-mute';
      }
    });
  }

  // 3. Toggle Sidebar Navigasi
  if (btnToggle && sidebar) {
    btnToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // 4. Pindah Section Navigasi
  const switchSection = (targetId) => {
    contentSections.forEach((section) => {
      section.classList.remove('active-content');
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active-content');
    }

    navItems.forEach((item) => {
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      if (targetId) {
        switchSection(targetId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // 5. Navigasi Tombol "Mulai Membaca"
  if (goToBlogBtn) {
    goToBlogBtn.addEventListener('click', () => {
      switchSection('blog-section');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Klik Daftar Isi (Direct Jump ke BAB tertentu di Blog)
  tocItems.forEach((item) => {
    item.addEventListener('click', () => {
      const babId = item.getAttribute('data-bab');
      switchSection('blog-section');

      setTimeout(() => {
        const targetBab = document.getElementById(babId);
        if (targetBab) {
          targetBab.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  });
});
