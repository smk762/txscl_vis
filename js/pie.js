setInterval(function() {  pJS.fn.particles.number.value = Math.round(Math.random()*60); pJS.fn.particlesEmpty(); pJS.fn.particlesCreate(); pJS.fn.particlesDraw(); pJS.fn.vendors.densityAutoParticles(); },5000 );
particlesJS("particles-js", {
  particles: {
    number: { value: 30, density: { enable: true, value_area: 1000 } },
    color: { value: "#63750e" },
    shape: {
      type: "polygon",
      stroke: { width: 1, color: "#00b3ff" },
      polygon: { nb_sides: 8 },
      image: { src: "img/kmd_b.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.4,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: false, speed: 0.6, size_min: 1, sync: true }
    },
    line_linked: {
      enable: true,
      distance: 250,
      color: "#fff000",
      opacity: 0.4,
      width: 0.7
    },
    move: {
      enable: true,
      speed: 6,
      direction: "right",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 420,
        rotateY: 4
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: false, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});


