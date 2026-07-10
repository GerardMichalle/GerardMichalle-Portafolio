const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

if (dot && ring) {
  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function moveRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(moveRing);
  }

  moveRing();
}

document.querySelectorAll("[data-hoverable]").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    dot?.classList.add("hover");
    ring?.classList.add("hover");
  });

  element.addEventListener("mouseleave", () => {
    dot?.classList.remove("hover");
    ring?.classList.remove("hover");
  });
});

function typeText(element) {
  const text = element.dataset.text || "";
  const speed = Number(element.dataset.speed || 55);
  const delay = Number(element.dataset.delay || 0);
  const deleteSpeed = Math.max(22, speed * 0.55);
  const holdTime = 1800;
  const restartTime = 450;
  let index = 0;
  let deleting = false;

  element.textContent = "";

  window.setTimeout(() => {
    function tick() {
      element.classList.remove("is-done");
      element.textContent = text.slice(0, index);

      if (!deleting && index < text.length) {
        index += 1;
        window.setTimeout(tick, speed);
        return;
      }

      if (!deleting && index === text.length) {
        deleting = true;
        window.setTimeout(tick, holdTime);
        return;
      }

      if (deleting && index > 0) {
        index -= 1;
        window.setTimeout(tick, deleteSpeed);
        return;
      }

      deleting = false;
      window.setTimeout(tick, restartTime);
    }

    tick();
  }, delay);
}

document.querySelectorAll("[data-typewriter]").forEach(typeText);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

if (typeof particlesJS === "function") {
  particlesJS({
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 6,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
  });
}
