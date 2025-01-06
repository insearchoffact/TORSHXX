// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animate content on each section
const sections = document.querySelectorAll('.fullscreen-section');

sections.forEach((section, index) => {
  const content = section.querySelector('.content');
  const heading = section.querySelector('h1');

  // Content animation
  gsap.from(content, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      toggleActions: 'play none none reverse',
    },
  });

  // Text slider animation
  gsap.from(heading, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      toggleActions: 'play none none reverse',
    },
  });

  // Background dissolve effect
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    onEnter: () => {
      gsap.to(section, { opacity: 1, duration: 1 });
    },
    onLeaveBack: () => {
      gsap.to(section, { opacity: 0, duration: 1 });
    },
  });
});

// 3D Bottle Rotation and Step-by-Step Text
const bottle = document.querySelector('.bottle');
const stepTexts = document.querySelectorAll('.step-text');

ScrollTrigger.create({
  trigger: '#section6',
  start: 'top top',
  end: '+=400%', // 4 scroll steps
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress; // Progress from 0 to 1
    const rotation = progress * 360; // Rotate bottle 360 degrees
    bottle.style.transform = `rotateY(${rotation}deg)`;

    // Show step-by-step text
    stepTexts.forEach((text, index) => {
      if (progress >= index * 0.25 && progress < (index + 1) * 0.25) {
        gsap.to(text, { opacity: 1, y: 0, duration: 0.5 });
      } else {
        gsap.to(text, { opacity: 0, y: 20, duration: 0.5 });
      }
    });
  },
  onLeave: () => {
    // Scroll to the final frame after 4 steps
    gsap.to(window, {
      scrollTo: { y: '#section7', autoKill: false },
      duration: 1,
    });
  },
});

// Click to scroll to the next section
document.addEventListener('click', () => {
  const currentSection = Math.floor(window.scrollY / window.innerHeight);
  const nextSection = (currentSection + 1) % sections.length;

  gsap.to(window, {
    scrollTo: { y: nextSection * window.innerHeight, autoKill: false },
    duration: 1,
  });
});

// Interactive click animation
document.addEventListener('click', () => {
  gsap.to('.content', {
    scale: 1.1,
    duration: 0.5,
    yoyo: true,
    repeat: 1,
  });
});