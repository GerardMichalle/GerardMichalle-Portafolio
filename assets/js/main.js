const translations = {
  es: {
    navAbout: "SOBRE MI",
    navStack: "STACK",
    navFocus: "ENFOQUE",
    navContact: "CONTACTO",
    status: "Disponible para aprender y construir",
    role: "Infraestructura TI | Fullstack en formacion",
    intro:
      "Estudiante de Ingenieria de Sistemas con base tecnica en electronica, soporte tecnico y resolucion de incidencias. Estoy construyendo un perfil que une redes, infraestructura TI y desarrollo fullstack.",
    aboutLabel: "01 / Sobre mi",
    aboutTitle: "Tecnologia desde el hardware hasta el software",
    aboutCopy:
      "Me interesa entender como funcionan los sistemas por dentro: equipos, redes, infraestructura y tambien las aplicaciones que usan las personas. <strong>Mi objetivo es crecer como perfil tecnico capaz de resolver incidencias, mantener sistemas y construir soluciones web utiles.</strong>",
    stackLabel: "02 / Stack y aprendizaje",
    stackTitle: "Areas que estoy fortaleciendo",
    cap1Tag: "Infraestructura TI",
    cap1Title: "Redes y telecomunicaciones",
    cap1Copy:
      "Interes en administracion de sistemas, soporte tecnico, conectividad e infraestructura tecnologica.",
    cap2Tag: "Soporte tecnico",
    cap2Title: "Diagnostico e incidencias",
    cap2Copy:
      "Experiencia en mantenimiento, revision de equipos electronicos y atencion orientada a resolver problemas.",
    cap3Tag: "Frontend",
    cap3Title: "HTML, CSS, TypeScript y React",
    cap3Copy:
      "Construccion de interfaces modernas, responsivas y cuidadas, con foco en claridad visual.",
    cap4Tag: "Backend",
    cap4Title: "Java, Spring Boot y PostgreSQL",
    cap4Copy:
      "Aprendizaje de APIs, seguridad con JWT, bases de datos relacionales, Docker y despliegue.",
    focusLabel: "03 / Enfoque actual",
    focusTitle: "Un perfil entre infraestructura y desarrollo",
    project1Title: "Infraestructura TI",
    project1Copy:
      "Fortalecimiento en redes, telecomunicaciones, administracion de sistemas y soporte.",
    project2Title: "Desarrollo fullstack",
    project2Copy:
      "Practica con React, TypeScript, Java, Spring Boot, Spring Security y PostgreSQL.",
    project3Title: "Crecimiento profesional",
    project3Copy:
      "Perfil responsable, adaptable, proactivo y enfocado en aprendizaje continuo.",
    contactLabel: "04 / Contacto",
    contactTitle: "Construyamos algo<br />",
    contactLink: "con tecnologia",
    builtProjectsLabel: "04 / Proyectos",
    builtProjectsTitle: "Proyectos que he construido",
    builtProjectsIntro:
      "Una selección de soluciones donde aplico desarrollo, diseño y tecnología.",
    builtProjectType: "PROYECTO FULLSTACK",
    builtProjectCopy:
      "Sistema desarrollado para llevar un control de usuarios y gestionar pagos de servicios de internet, con un panel administrativo y un panel para clientes.",
    builtProjectLink: "Ver proyecto",
    contactLabel: "05 / Contacto",
    contactCopy:
      "Estoy abierto a seguir aprendiendo, colaborar en proyectos y construir soluciones que unan infraestructura, soporte y desarrollo.",
    footerRole: "INFRAESTRUCTURA TI / FULLSTACK",
  },
  en: {
    navAbout: "ABOUT",
    navStack: "STACK",
    navFocus: "FOCUS",
    navContact: "CONTACT",
    status: "Open to learning and building",
    role: "IT Infrastructure | Aspiring Fullstack Developer",
    intro:
      "Systems Engineering student with a technical background in electronics, IT support, and troubleshooting. I am bridging the gap between networking, infrastructure, and fullstack development.",
    aboutLabel: "01 / About me",
    aboutTitle: "Bridging the gap between hardware and software",
    aboutCopy:
      "I thrive on understanding how systems work under the hood—from hardware, networking, and infrastructure to user-facing applications. <strong>My goal is to grow into a versatile technical role, capable of troubleshooting systems, maintaining infrastructure, and building scalable web solutions.</strong>",
    stackLabel: "02 / Stack & Learning",
    stackTitle: "Core areas & ongoing learning",
    cap1Tag: "IT Infrastructure",
    cap1Title: "Networking & Telecommunications",
    cap1Copy:
      "Focused on sysadmin tasks, technical support, connectivity, and core IT infrastructure.",
    cap2Tag: "Technical Support",
    cap2Title: "Diagnostics & Troubleshooting",
    cap2Copy:
      "Hands-on experience in hardware maintenance, diagnostics, and high-impact incident resolution.",
    cap3Tag: "Frontend",
    cap3Title: "HTML, CSS, TypeScript & React",
    cap3Copy:
      "Building modern, responsive, and polished interfaces with an eye for UI/UX clarity.",
    cap4Tag: "Backend",
    cap4Title: "Java, Spring Boot & PostgreSQL",
    cap4Copy:
      "Developing RESTful APIs, JWT authentication, relational databases, Docker, and deployment workflows.",
    focusLabel: "03 / Current Focus",
    focusTitle: "Combining infrastructure and development",
    project1Title: "IT Infrastructure",
    project1Copy:
      "Deepening my knowledge in networking, sysadmin workloads, and infrastructure support.",
    project2Title: "Fullstack Development",
    project2Copy:
      "Actively building with React, TypeScript, Java, Spring Boot, Spring Security, and PostgreSQL.",
    project3Title: "Professional Growth",
    project3Copy:
      "A responsible, proactive, and highly adaptable mindset driven by continuous learning.",
    builtProjectsLabel: "04 / Projects",
    builtProjectsTitle: "Featured Projects",
    builtProjectsIntro:
      "A curated selection of applications merging code, design, and infrastructure.",
    builtProjectType: "FULLSTACK APPLICATION",
    builtProjectCopy:
      "A user management and internet billing system featuring separate administrative and client dashboards.",
    builtProjectLink: "View Project",
    contactLabel: "05 / Contact",
    contactTitle: "Let's build something<br />",
    contactLink: "impactful together.",
    contactCopy:
      "I'm open to new learning opportunities, engineering collaborations, and building solutions at the intersection of infrastructure and software development.",
    footerRole: "IT INFRASTRUCTURE / FULLSTACK",
  },
};

const languageInputs = document.querySelectorAll('input[name="language"]');
const storedLanguage = localStorage.getItem("portfolio-language");
const browserLanguage = navigator.language?.toLowerCase().startsWith("en")
  ? "en"
  : "es";
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
  setText("#sobre-mi .label", t.aboutLabel);
  setText("#sobre-mi h2", t.aboutTitle);
  setText("#sobre-mi .about-copy", t.aboutCopy, true);
  setText("#stack .label", t.stackLabel);
  setText("#stack h2", t.stackTitle);
  setText("#stack .cap-card:nth-child(1) .cap-tag", t.cap1Tag);
  setText("#stack .cap-card:nth-child(1) h3", t.cap1Title);
  setText("#stack .cap-card:nth-child(1) p", t.cap1Copy);
  setText("#stack .cap-card:nth-child(2) .cap-tag", t.cap2Tag);
  setText("#stack .cap-card:nth-child(2) h3", t.cap2Title);
  setText("#stack .cap-card:nth-child(2) p", t.cap2Copy);
  setText("#stack .cap-card:nth-child(3) .cap-tag", t.cap3Tag);
  setText("#stack .cap-card:nth-child(3) h3", t.cap3Title);
  setText("#stack .cap-card:nth-child(3) p", t.cap3Copy);
  setText("#stack .cap-card:nth-child(4) .cap-tag", t.cap4Tag);
  setText("#stack .cap-card:nth-child(4) h3", t.cap4Title);
  setText("#stack .cap-card:nth-child(4) p", t.cap4Copy);
  setText("#proyectos .label", t.focusLabel);
  setText("#proyectos h2", t.focusTitle);
  setText("#proyectos .project:nth-child(1) h3", t.project1Title);
  setText("#proyectos .project:nth-child(1) p", t.project1Copy);
  setText("#proyectos .project:nth-child(2) h3", t.project2Title);
  setText("#proyectos .project:nth-child(2) p", t.project2Copy);
  setText("#proyectos .project:nth-child(3) h3", t.project3Title);
  setText("#proyectos .project:nth-child(3) p", t.project3Copy);
  setText("#contacto .label", t.contactLabel);
  setText(
    "#contacto .contact-title",
    t.contactTitle + '<span class="accent-text">' + t.contactLink + "</span>",
    true,
  );
  setText("#mis-proyectos .label", t.builtProjectsLabel);
  setText("#mis-proyectos h2", t.builtProjectsTitle);
  setText("#mis-proyectos .projects-heading p", t.builtProjectsIntro);
  setText("#mis-proyectos .project-card-type", t.builtProjectType);
  setText("#mis-proyectos .project-card-description", t.builtProjectCopy);
  setText("#mis-proyectos .project-card-link-text", t.builtProjectLink);
  setText("#contacto .label", t.contactLabel);
  setText("#contacto .contact-copy", t.contactCopy);
  setText("#contacto .footer-line span:last-child", t.footerRole);

  languageInputs.forEach((input) => {
    input.checked = input.value === language;
  });
}

applyLanguage(currentLanguage);

languageInputs.forEach((input) => {
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

document
  .querySelectorAll("[data-hoverable], .tech-logo, .cap-card")
  .forEach((element) => {
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
  const shouldLoop = element.dataset.loop !== "false";
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
        if (!shouldLoop) {
          element.textContent = text;
          element.classList.add("is-done");
          return;
        }

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
        distance: 100,
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
      detect_on: "window",
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
// Carrusel de proyectos: agrega cada nuevo proyecto como .project-slide.
const projectsCarousel = document.querySelector(".projects-carousel");

if (projectsCarousel) {
  const track = projectsCarousel.querySelector(".projects-track");
  const slides = [...projectsCarousel.querySelectorAll(".project-slide")];
  const dotsContainer = projectsCarousel.querySelector(".carousel-dots");
  const previousButton = projectsCarousel.querySelector(".carousel-prev");
  const nextButton = projectsCarousel.querySelector(".carousel-next");
  let activeProject = 0;
  let carouselTimer;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir al proyecto ${index + 1}`);
    dot.addEventListener("click", () => showProject(index, true));
    dotsContainer.appendChild(dot);
    return dot;
  });

  function showProject(index, restart = false) {
    activeProject = (index + slides.length) % slides.length;
    track.style.transform = `translate3d(-${activeProject * 100}%, 0, 0)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeProject);
      dot.setAttribute(
        "aria-current",
        dotIndex === activeProject ? "true" : "false",
      );
    });
    if (restart) startCarousel();
  }

  function startCarousel() {
    clearInterval(carouselTimer);
    if (
      slides.length > 1 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      carouselTimer = setInterval(() => showProject(activeProject + 1), 6500);
    }
  }

  previousButton.addEventListener("click", () =>
    showProject(activeProject - 1, true),
  );
  nextButton.addEventListener("click", () =>
    showProject(activeProject + 1, true),
  );
  projectsCarousel.addEventListener("mouseenter", () =>
    clearInterval(carouselTimer),
  );
  projectsCarousel.addEventListener("mouseleave", startCarousel);
  projectsCarousel.addEventListener("focusin", () =>
    clearInterval(carouselTimer),
  );
  projectsCarousel.addEventListener("focusout", startCarousel);

  const hasMultipleProjects = slides.length > 1;
  previousButton.disabled = !hasMultipleProjects;
  nextButton.disabled = !hasMultipleProjects;
  showProject(0);
  startCarousel();
}
