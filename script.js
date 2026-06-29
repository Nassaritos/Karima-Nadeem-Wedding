const loader = document.getElementById('loader');
const envelope = document.getElementById('envelope');
const revealInvite = document.getElementById('revealInvite');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const rsvpForm = document.getElementById('rsvpForm');
const successMsg = document.getElementById('successMsg');
const cursorHeart = document.getElementById('cursorHeart');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

window.addEventListener('load', () => {
  if (loader) {
    setTimeout(() => loader.classList.add('hide'), 1200);
  }
});

if (envelope) {
  envelope.addEventListener('click', () => envelope.classList.add('open'));
}

if (revealInvite) {
  revealInvite.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
  });
}

if (musicBtn && bgMusic) {
  musicBtn.addEventListener('click', async () => {
    try {
      if (bgMusic.paused) {
        await bgMusic.play();
        musicBtn.classList.add('playing');
        musicBtn.textContent = '♫';
      } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.textContent = '♪';
      }
    } catch (error) {
      alert('Tap again to allow music in your browser.');
    }
  });
}

/* COUNTDOWN */
const weddingDate = new Date('2026-09-05T19:00:00').getTime();

function updateCountdown() {
  const countdown = document.getElementById('countdown');
  if (!countdown) return;

  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    countdown.innerHTML = '<div class="wedding-live">Today is the day ♡</div>';
    return;
  }

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* SCROLL REVEAL */
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.16 });

revealElements.forEach(el => observer.observe(el));

/* PETALS */
function createPetal() {
  const petalsContainer = document.getElementById('petals');
  if (!petalsContainer) return;

  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.textContent = ['♡', '❀', '✿', '❁'][Math.floor(Math.random() * 4)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = Math.random() * 18 + 14 + 'px';
  petal.style.animationDuration = Math.random() * 6 + 6 + 's';
  petal.style.opacity = Math.random() * 0.65 + 0.2;

  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), 12000);
}

setInterval(createPetal, 350);

/* RSVP */
if (rsvpForm && successMsg) {
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.classList.add('show');
    createConfettiHearts();
    rsvpForm.reset();
  });
}

function createConfettiHearts() {
  for (let i = 0; i < 34; i++) {
    const heart = document.createElement('div');
    heart.textContent = '♡';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.zIndex = '999';
    heart.style.color = i % 2 ? '#d99aa4' : '#c7a15a';
    heart.style.fontSize = Math.random() * 22 + 16 + 'px';
    heart.style.transition = 'transform 1.8s ease, opacity 1.8s ease';

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translateY(-${Math.random() * 70 + 30}vh) rotate(${Math.random() * 360}deg)`;
      heart.style.opacity = '0';
    }, 20);

    setTimeout(() => heart.remove(), 2000);
  }
}

/* CURSOR HEART */
if (cursorHeart) {
  document.addEventListener('mousemove', (e) => {
    cursorHeart.style.left = e.clientX + 'px';
    cursorHeart.style.top = e.clientY + 'px';
  });
}

/* LIGHTBOX */
if (lightbox && lightboxImg) {
  document.querySelectorAll('.photo-card img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('show');
    });
  });

  lightbox.addEventListener('click', () => lightbox.classList.remove('show'));
}

/* STORY SCROLL SEQUENCE */
const storyCards = document.querySelectorAll('.timeline-card');

const storyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 180);
    }
  });
}, { threshold: 0.25 });

storyCards.forEach(card => storyObserver.observe(card));

/* CONTROLLED CHAT FLOW */
const chatSection = document.getElementById('invitation');
const chatArea = document.getElementById('chatArea');
const typingBubble = document.getElementById('typingBubble');

let chatStarted = false;

function scrollChatToBottom() {
  if (chatArea) {
    chatArea.scrollTop = chatArea.scrollHeight;
  }
}

function createMessage(text, type = 'received', seen = false) {
  const msg = document.createElement('div');
  msg.className = `chat-bubble ${type}`;
  msg.innerHTML = `
    <span>${text}</span>
    ${type === 'sent' ? `<small class="ticks ${seen ? 'seen' : ''}">✓✓</small>` : ''}
  `;

  setTimeout(scrollChatToBottom, 50);
  return msg;
}

function createTypingBubble() {
  const typing = document.createElement('div');
  typing.className = 'chat-bubble received typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  return typing;
}

function createVoiceBubble() {
  const voice = document.createElement('div');
  voice.className = 'chat-bubble received voice-bubble';
  voice.innerHTML = `
    <button class="voice-play" type="button">▶</button>
    <div class="voice-wave">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
    <small>0:12</small>
  `;
  return voice;
}

function createFlipCard() {
  const wrapper = document.createElement('div');

  wrapper.innerHTML = `
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <p class="script" style="color:wheat">You are invited</p>
          <h2>Bride & Groom</h2>
          <p>Tap to open</p>
        </div>

        <div class="flip-card-back">
          <p class="script">Save the Date</p>
          <h2>05 September 2026</h2>
          <p>Royal Garden Hall, Cairo</p>
          <p>7:00 PM</p>
          <button class="goDetailsBtn">View Details</button>
        </div>
      </div>
    </div>
  `;

  return wrapper.firstElementChild;
}

function startChatFlow() {
  if (chatStarted || !chatArea) return;
  chatStarted = true;

  setTimeout(() => {
    if (typingBubble) typingBubble.remove();

    const msg1 = createMessage('Hey! 💌', 'received');
    chatArea.appendChild(msg1);
    scrollChatToBottom();

    setTimeout(() => {
      const msg2 = createMessage('We have something special for you...', 'received');
      chatArea.appendChild(msg2);
      scrollChatToBottom();

      setTimeout(() => {
        const card = createFlipCard();
        chatArea.appendChild(card);
        scrollChatToBottom();

        card.addEventListener('click', () => {
          card.classList.toggle('flipped');

          if (!card.classList.contains('message-sent')) {
            card.classList.add('message-sent');

            setTimeout(() => {
              const typing = createTypingBubble();
              chatArea.appendChild(typing);
              scrollChatToBottom();

              setTimeout(() => {
                typing.remove();

                const msg3 = createMessage('Can’t wait to celebrate together ♡', 'sent', true);
                chatArea.appendChild(msg3);
                scrollChatToBottom();

                setTimeout(() => {
                  const voice = createVoiceBubble();
                  chatArea.appendChild(voice);
                  scrollChatToBottom();

                  const playBtn = voice.querySelector('.voice-play');

                  if (playBtn) {
                    playBtn.addEventListener('click', (e) => {
                      e.stopPropagation();
                      voice.classList.toggle('playing');
                      playBtn.textContent = voice.classList.contains('playing') ? '❚❚' : '▶';
                    });
                  }
                }, 900);
              }, 1300);
            }, 500);
          }
        });

        const btn = card.querySelector('.goDetailsBtn');

        if (btn) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
          });
        }
      }, 1500);
    }, 1200);
  }, 1000);
}

/* TRIGGER CHAT ONLY WHEN SCROLLED INTO VIEW */
if (chatSection && chatArea) {
  const chatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startChatFlow();
      }
    });
  }, { threshold: 0.4 });

  chatObserver.observe(chatSection);
}

/* ===== INTRO ENVELOPE LOGIC ===== */

const introEnvelope = document.getElementById('introEnvelope');
const envelopeImg = document.getElementById('envelopeImg');
const enterBtn = document.getElementById('enterBtn');
const tapHint = document.getElementById('tapHint');

let introOpened = false;

if (introEnvelope && envelopeImg) {
  introEnvelope.addEventListener('click', () => {
    if (introOpened) return;

    introOpened = true;

    envelopeImg.style.opacity = '0';
    envelopeImg.style.transform = 'translateY(6px) scale(.98)';

    setTimeout(() => {
      envelopeImg.src = '1.png';
      envelopeImg.style.opacity = '1';
      envelopeImg.style.transform = 'translateY(0) scale(1)';
      introEnvelope.classList.add('open');

      if (tapHint) tapHint.classList.add('hide');
    }, 420);
  });
}

if (enterBtn) {
  enterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const intro = document.getElementById('intro');

    // Reveal the rest of the page
    document.body.classList.remove('intro-lock');
    document.body.classList.add('intro-done');

    // Fade out and remove the envelope section
    if (intro) {
      intro.classList.add('exit');
      setTimeout(() => { intro.style.display = 'none'; }, 600);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  });
}