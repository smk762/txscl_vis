// setInterval(function() {  pJS.fn.particles.number.value = Math.round(Math.random()*60); pJS.fn.particlesEmpty(); pJS.fn.particlesCreate(); pJS.fn.particlesDraw(); pJS.fn.vendors.densityAutoParticles(); },5000 );
particlesJS("particles-js", {
  particles: {
    number: { value: 1024, density: { enable: false, value_area: 1000 } },
    color: { value: "#00AD59" },
    shape: {
      type: "star",
    },
    "shape": {
      "type": "image",
      "image": {
        "src": "http://cryptocartography.io/img/komodo.gif",
        "width": 1,
        "height": 1
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 8,
      random: true,
      anim: { enable: true, speed: 3, size_min: 4, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 20,
      color: "#FFE97F",
      opacity: 0.8,
      width: 1
    },
    move: {
      enable: true,
      speed: 4,
      direction: "right",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 100,
        rotateY: 100
      }
    }
  },
  retina_detect: true
});


