import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ResearchEarth() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.z = 3.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    const texture = new THREE.TextureLoader().load("/earth.png");
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        map: texture,
        shininess: 12,
        specular: new THREE.Color(0x2c9bff),
      }),
    );
    globe.add(earth);
    scene.add(globe);

    scene.add(new THREE.AmbientLight(0x6688aa, 1.8));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(-3, 2, 4);
    scene.add(keyLight);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let previousTime = performance.now();

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 100);
      previousTime = time;
      if (!reducedMotion) globe.rotation.y += elapsed * 0.00018;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      texture.dispose();
      earth.geometry.dispose();
      earth.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="research-earth" />;
}
