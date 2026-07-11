const translations = {
  es: {
    navAbout: "SOBRE MI",
    navStack: "STACK",
    navFocus: "ENFOQUE",
    navContact: "CONTACTO",
    status: "Disponible para aprender y construir",
    role: "Infraestructura TI | Fullstack en formacion",
    intro: "Estudiante de Ingenieria de Sistemas con base tecnica en electronica, soporte tecnico y resolucion de incidencias. Estoy construyendo un perfil que une redes, infraestructura TI y desarrollo fullstack.",
    aboutLabel: "01 / Sobre mi",
    aboutTitle: "Tecnologia desde el hardware hasta el software.",
    aboutCopy: "Me interesa entender como funcionan los sistemas por dentro: equipos, redes, infraestructura y tambien las aplicaciones que usan las personas. <strong>Mi objetivo es crecer como perfil tecnico capaz de resolver incidencias, mantener sistemas y construir soluciones web utiles.</strong>",
    stackLabel: "02 / Stack y aprendizaje",
    stackTitle: "Areas que estoy fortaleciendo.",
    cap1Tag: "Infraestructura TI",
    cap1Title: "Redes y telecomunicaciones",
    cap1Copy: "Interes en administracion de sistemas, soporte tecnico, conectividad e infraestructura tecnologica.",
    cap2Tag: "Soporte tecnico",
    cap2Title: "Diagnostico e incidencias",
    cap2Copy: "Experiencia en mantenimiento, revision de equipos electronicos y atencion orientada a resolver problemas.",
    cap3Tag: "Frontend",
    cap3Title: "HTML, CSS, TypeScript y React",
    cap3Copy: "Construccion de interfaces modernas, responsivas y cuidadas, con foco en claridad visual.",
    cap4Tag: "Backend",
    cap4Title: "Java, Spring Boot y PostgreSQL",
    cap4Copy: "Aprendizaje de APIs, seguridad con JWT, bases de datos relacionales, Docker y despliegue.",
    focusLabel: "03 / Enfoque actual",
    focusTitle: "Un perfil entre infraestructura y desarrollo.",
    project1Title: "Infraestructura TI",
    project1Copy: "Fortalecimiento en redes, telecomunicaciones, administracion de sistemas y soporte.",
    project2Title: "Desarrollo fullstack",
    project2Copy: "Practica con React, TypeScript, Java, Spring Boot, Spring Security y PostgreSQL.",
    project3Title: "Crecimiento profesional",
    project3Copy: "Perfil responsable, adaptable, proactivo y enfocado en aprendizaje continuo.",
    contactLabel: "04 / Contacto",
    contactTitle: "Construyamos algo<br />",
    contactLink: "con tecnologia.",
    contactCopy: "Estoy abierto a seguir aprendiendo, colaborar en proyectos y construir soluciones que unan infraestructura, soporte y desarrollo.",
    footerRole: "INFRAESTRUCTURA TI / FULLSTACK"
  },
  en: {
    navAbout: "ABOUT",
    navStack: "STACK",
    navFocus: "FOCUS",
    navContact: "CONTACT",
    status: "Available to learn and build",
    role: "IT Infrastructure | Fullstack in training",
    intro: "Systems Engineering student with a technical background in electronics, technical support, and incident resolution. I am building a profile that connects networks, IT infrastructure, and fullstack development.",
    aboutLabel: "01 / About me",
    aboutTitle: "Technology from hardware to software.",
    aboutCopy: "I like understanding how systems work from the inside: devices, networks, infrastructure, and also the applications people use. <strong>My goal is to grow as a technical profile capable of solving incidents, maintaining systems, and building useful web solutions.</strong>",
    stackLabel: "02 / Stack and learning",
    stackTitle: "Areas I am strengthening.",
    cap1Tag: "IT Infrastructure",
    cap1Title: "Networks and telecommunications",
    cap1Copy: "Interest in system administration, technical support, connectivity, and technology infrastructure.",
    cap2Tag: "Technical support",
    cap2Title: "Diagnosis and incidents",
    cap2Copy: "Experience in maintenance, electronic equipment review, and service focused on solving problems.",
    cap3Tag: "Frontend",
    cap3Title: "HTML, CSS, TypeScript and React",
    cap3Copy: "Building modern, responsive, and polished interfaces with focus on visual clarity.",
    cap4Tag: "Backend",
    cap4Title: "Java, Spring Boot and PostgreSQL",
    cap4Copy: "Learning APIs, JWT security, relational databases, Docker, and deployment.",
    focusLabel: "03 / Current focus",
    focusTitle: "A profile between infrastructure and development.",
    project1Title: "IT Infrastructure",
    project1Copy: "Strengthening networks, telecommunications, system administration, and support.",
    project2Title: "Fullstack development",
    project2Copy: "Practice with React, TypeScript, Java, Spring Boot, Spring Security, and PostgreSQL.",
    project3Title: "Professional growth",
    project3Copy: "Responsible, adaptable, proactive profile focused on continuous learning.",
    contactLabel: "04 / Contact",
    contactTitle: "Let's build something<br />",
    contactLink: "with technology.",
    contactCopy: "I am open to keep learning, collaborate on projects, and build solutions that connect infrastructure, support, and development.",
    footerRole: "IT INFRASTRUCTURE / FULLSTACK"
  }
};

const languageInputs = document.querySelectorAll('input[name="language"]');
const storedLanguage = localStorage.getItem("portfolio-language");
const browserLanguage = navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
let currentLanguage = storedLanguage || browserLanguage;

function setText(selector, value, html = false) {
  const element = document.querySelector(selector);
  if (!element) return;
  if (html) element.innerHTML = value;
  else element.textContent = value;
}

function setTypewriterText(selector, value) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.dataset.text = value;
}

function applyLanguage(language) {
  const t = translations[language] || translations.es;
  document.documentElement.lang = language;

  setText('.nav-links a[href="#sobre-mi"]', t.navAbout);
  setText('.nav-links a[href="#stack"]', t.navStack);
  setText('.nav-links a[href="#proyectos"]', t.navFocus);
  setText('.nav-links a[href="#contacto"]', t.navContact);
  setText(".status", "<i></i>" + t.status, true);
  setTypewriterText(".role", t.role);
  setText(".intro", t.intro);
  setText('#sobre-mi .label', t.aboutLabel);
  setText('#sobre-mi h2', t.aboutTitle);
  setText('#sobre-mi .about-copy', t.aboutCopy, true);
  setText('#stack .label', t.stackLabel);
  setText('#stack h2', t.stackTitle);
  setText('#stack .cap-card:nth-child(1) .cap-tag', t.cap1Tag);
  setText('#stack .cap-card:nth-child(1) h3', t.cap1Title);
  setText('#stack .cap-card:nth-child(1) p', t.cap1Copy);
  setText('#stack .cap-card:nth-child(2) .cap-tag', t.cap2Tag);
  setText('#stack .cap-card:nth-child(2) h3', t.cap2Title);
  setText('#stack .cap-card:nth-child(2) p', t.cap2Copy);
  setText('#stack .cap-card:nth-child(3) .cap-tag', t.cap3Tag);
  setText('#stack .cap-card:nth-child(3) h3', t.cap3Title);
  setText('#stack .cap-card:nth-child(3) p', t.cap3Copy);
  setText('#stack .cap-card:nth-child(4) .cap-tag', t.cap4Tag);
  setText('#stack .cap-card:nth-child(4) h3', t.cap4Title);
  setText('#stack .cap-card:nth-child(4) p', t.cap4Copy);
  setText('#proyectos .label', t.focusLabel);
  setText('#proyectos h2', t.focusTitle);
  setText('#proyectos .project:nth-child(1) h3', t.project1Title);
  setText('#proyectos .project:nth-child(1) p', t.project1Copy);
  setText('#proyectos .project:nth-child(2) h3', t.project2Title);
  setText('#proyectos .project:nth-child(2) p', t.project2Copy);
  setText('#proyectos .project:nth-child(3) h3', t.project3Title);
  setText('#proyectos .project:nth-child(3) p', t.project3Copy);
  setText('#contacto .label', t.contactLabel);
  setText('#contacto .contact-title', t.contactTitle + '<span class="accent-text">' + t.contactLink + '</span>', true);
  setText('#contacto .contact-copy', t.contactCopy);
  setText('#contacto .footer-line span:last-child', t.footerRole);

  languageInputs.forEach(input => {
    input.checked = input.value === language;
  });
}

applyLanguage(currentLanguage);

languageInputs.forEach(input => {
  input.addEventListener("change", () => {
    if (!input.checked) return;
    localStorage.setItem("portfolio-language", input.value);
    window.location.reload();
  });
});
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
      entry.target.classList.toggle("in", entry.isIntersecting);
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




