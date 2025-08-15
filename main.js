import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// Globals
let scene, camera, renderer, kernels, clock;
const hero = document.getElementById('hero');
const canvas = document.getElementById('bg');

init();
animate();
setupScroll();
setYear();

function init(){
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0b0b0b, 12, 55);

  const fov = 60;
  const aspect = hero.clientWidth / hero.clientHeight;
  camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);
  camera.position.set(0, 0.6, 9);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(hero.clientWidth, hero.clientHeight);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setClearColor(0x0b0b0b, 1);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  const key = new THREE.DirectionalLight(0xfff1b8, 1.1);
  key.position.set(2, 3, 2);
  const rim = new THREE.DirectionalLight(0xffd86b, 0.7);
  rim.position.set(-3, 2, -2);
  scene.add(ambient, key, rim);

  // Kernel group (golden spheres as a subtle nod to corn)
  kernels = new THREE.Group();
  const kernelGeo = new THREE.SphereGeometry(0.12, 24, 24);
  const kernelMat = new THREE.MeshStandardMaterial({
    color: 0xe6c14b,
    roughness: 0.45,
    metalness: 0.65
  });

  const ROWS = 12, COLS = 16, SPACING_X = 0.5, SPACING_Y = 0.45;
  for(let r=0; r<ROWS; r++){
    for(let c=0; c<COLS; c++){
      const m = new THREE.Mesh(kernelGeo, kernelMat);
      // Arrange in offset rows to suggest organic pattern
      m.position.set(
        (c - COLS/2) * SPACING_X + (r % 2 ? 0.25 : 0),
        (r - ROWS/2) * SPACING_Y,
        (Math.random() * 0.6) - 0.3
      );
      m.rotation.y = Math.random() * Math.PI;
      kernels.add(m);
    }
  }
  kernels.position.y = -0.5;
  scene.add(kernels);

  clock = new THREE.Clock();

  window.addEventListener('resize', onResize);
}

function onResize(){
  const w = hero.clientWidth, h = hero.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
}

function animate(){
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  kernels.rotation.y += 0.0015;
  kernels.position.z = Math.sin(t * 0.3) * 0.6;
  renderer.render(scene, camera);
}

function setupScroll(){
  // Register plugin (global gsap is available)
  if (window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);

    // Fade hero text a bit on scroll
    gsap.to('.overlay', {
      opacity: 0.0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#story',
        start: 'top bottom',
        end: 'top center',
        scrub: true
      }
    });

    // Grow + lift kernels group as you scroll through the story
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#story',
        start: 'top bottom',
        end: 'bottom center',
        scrub: true
      }
    });
    tl.to(kernels.scale, { x: 1.35, y: 1.35, z: 1.35, ease: 'none' }, 0)
      .to(kernels.position, { y: 0.6, ease: 'none' }, 0)
      .to(kernels.rotation, { x: 0.25, y: '+=0.6', ease: 'none' }, 0);

    // Slight parallax on projects cards
    gsap.utils.toArray('.card').forEach((el, i) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          end: 'top 60%',
          scrub: true
        }
      });
    });
  }
}

function setYear(){
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}
