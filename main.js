/* =========================================
   SYAZANI PORTFOLIO — main.js
   ========================================= */

/* ---- PARTICLE BACKGROUND ---- */
const canvas = document.getElementById('bg');
const ctx    = canvas.getContext('2d');

let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / 12000); // density based on screen size
  for (let i = 0; i < count; i++) {
    particles.push({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.2 + 0.3,
      o:  Math.random() * 0.6 + 0.2,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);

  particles.forEach((p, i) => {
    // Move
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,136,${p.o})`;
    ctx.fill();

    // Draw connecting lines to nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const q  = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const d  = Math.sqrt(dx * dx + dy * dy);

      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(0,255,136,${0.08 * (1 - d / 130)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

resize();
initParticles();
drawParticles();
window.addEventListener('resize', () => { resize(); initParticles(); });


/* ---- FORMSPREE CONTACT FORM ---- */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn        = document.getElementById('send-btn');
    const btnText    = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const successBox = document.getElementById('form-success');

    // Show loading state
    btn.disabled    = true;
    btnText.style.display    = 'none';
    btnLoading.style.display = 'inline';

    try {
      const response = await fetch('https://formspree.io/f/xojrkrbq', {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(contactForm),
      });

      if (response.ok) {
        // Show success, hide form
        contactForm.style.display = 'none';
        successBox.style.display  = 'block';
      } else {
        // Re-enable button on error
        btn.disabled             = false;
        btnText.style.display    = 'inline';
        btnLoading.style.display = 'none';
        alert('Something went wrong. Please try again or email syazanisuhaimee77@gmail.com directly.');
      }
    } catch (err) {
      btn.disabled             = false;
      btnText.style.display    = 'inline';
      btnLoading.style.display = 'none';
      alert('Network error. Please try again.');
    }
  });
}


/* ---- NAVIGATION ---- */
function go(sectionId, triggerBtn) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  // Remove active state from all nav buttons
  document.querySelectorAll('.nl').forEach(b => b.classList.remove('active'));

  // Show target section
  document.getElementById(sectionId).classList.add('active');

  // Highlight the correct nav button
  const navMap = {
    hero:     0,
    skills:   1,
    devops:   2,
    projects: 3,
    exp:      4,
    contact:  5,
  };
  const btns = document.querySelectorAll('.nl');
  if (navMap[sectionId] !== undefined) {
    btns[navMap[sectionId]].classList.add('active');
  }

  // Scroll to top of page smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}