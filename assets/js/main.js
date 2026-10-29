// Keep the copyright year current.
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Fade content in as it scrolls into view. Content stays visible without JS.
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && reveals.length) {
  document.documentElement.classList.add("js");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

// Parallax: each [data-speed] layer drifts against the scroll, measured from
// its section's centre. Speed 0 moves with the page; 0.5 moves at half speed.
// [data-fade] layers also fade out as their section scrolls away.
const layers = [...document.querySelectorAll("[data-speed]")].map((el) => ({
  el,
  section: el.closest("section"),
  speed: parseFloat(el.dataset.speed),
  fade: "fade" in el.dataset,
}));

let ticking = false;

function render() {
  ticking = false;
  const vh = window.innerHeight;

  for (const { el, section, speed, fade } of layers) {
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) continue;

    const offset = rect.top + rect.height / 2 - vh / 2;
    el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
    if (fade) {
      el.style.opacity = Math.min(1, Math.max(0, 1 + offset / (vh * 0.55))).toFixed(3);
    }
  }
}

function requestRender() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(render);
  }
}

function setup() {
  if (reduceMotion.matches) {
    window.removeEventListener("scroll", requestRender);
    window.removeEventListener("resize", requestRender);
    layers.forEach(({ el }) => {
      el.style.transform = "";
      el.style.opacity = "";
    });
    return;
  }

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
  render();
}

reduceMotion.addEventListener("change", setup);
setup();
