import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EventosTrackCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensiones
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Escena y Niebla
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.022);

    // Cámara
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(0, 16, 26);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xfff0e6, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xe87a38, 1.8);
    dirLight.position.set(15, 20, 10);
    scene.add(dirLight);

    const blueRimLight = new THREE.DirectionalLight(0x42759e, 1.2);
    blueRimLight.position.set(-15, 12, -10);
    scene.add(blueRimLight);

    // 1. TERRENO TOPOGRÁFICO DE SAN PEDRO
    const terrainSize = 64;
    const terrainSegments = 80;
    const terrainGeo = new THREE.PlaneGeometry(terrainSize, terrainSize, terrainSegments, terrainSegments);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Colinas ondulantes estilo campiña de Durazno / San Pedro
      const elevation =
        Math.sin(x * 0.12) * Math.cos(z * 0.12) * 2.8 +
        Math.sin(x * 0.25 + 1.2) * Math.sin(z * 0.22) * 1.4 +
        Math.cos(x * 0.05) * 1.5;

      pos.setY(i, elevation);
    }
    terrainGeo.computeVertexNormals();

    // Material de superficie oscura con textura sutil
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x101318,
      roughness: 0.88,
      metalness: 0.1,
      flatShading: false,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrainMesh);

    // Wireframe topográfico estilizado
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x222a36,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const wireframeMesh = new THREE.Mesh(terrainGeo, wireframeMat);
    wireframeMesh.position.y += 0.02;
    scene.add(wireframeMesh);

    // 2. CIRCUITO DE CARRERA 3D (SPLINE LUMINOSO DE TRAIL)
    const curvePoints = [
      new THREE.Vector3(-14, 0.4, 10),
      new THREE.Vector3(-8, 1.2, 12),
      new THREE.Vector3(0, 2.8, 8),
      new THREE.Vector3(7, 3.5, 2),
      new THREE.Vector3(12, 1.8, -4),
      new THREE.Vector3(8, 0.8, -12),
      new THREE.Vector3(-2, 1.5, -14),
      new THREE.Vector3(-10, 2.2, -6),
      new THREE.Vector3(-15, 1.0, 2),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints, true, 'centripetal', 0.5);

    // Tubo del trazado de carrera
    const trackGeo = new THREE.TubeGeometry(curve, 180, 0.09, 8, true);
    const trackMat = new THREE.MeshBasicMaterial({
      color: 0xe87a38,
      transparent: true,
      opacity: 0.95,
    });
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.position.y += 0.25;
    scene.add(trackMesh);

    // Halo / Resplandor del trazado
    const haloGeo = new THREE.TubeGeometry(curve, 180, 0.28, 8, true);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xf49358,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.y += 0.25;
    scene.add(haloMesh);

    // 3. CORREDORES CINÉTICOS (PULSOS DE LUZ CON LINTERNA FRONTAL)
    const runnerCount = 18;
    const runners = [];
    const runnerGeo = new THREE.SphereGeometry(0.18, 16, 16);

    for (let i = 0; i < runnerCount; i++) {
      const isLead = i === 0;
      const runnerMat = new THREE.MeshBasicMaterial({
        color: isLead ? 0xffffff : 0xffaa55,
      });
      const runner = new THREE.Mesh(runnerGeo, runnerMat);

      // Haz de luz frontal de la linterna del corredor
      const beamGeo = new THREE.ConeGeometry(0.5, 2.2, 16, 1, true);
      beamGeo.rotateX(Math.PI / 2);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.z = 1.1;
      runner.add(beam);

      scene.add(runner);

      runners.push({
        mesh: runner,
        t: (i / runnerCount) + Math.random() * 0.05,
        speed: 0.0007 + (isLead ? 0.0003 : Math.random() * 0.0004),
      });
    }

    // 4. POLVO SUSPENDIDO / PARTÍCULAS EN EL AIRE
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 45;
      particlePos[i + 1] = Math.random() * 12 + 0.5;
      particlePos[i + 2] = (Math.random() - 0.5) * 45;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe87a38,
      size: 0.12,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interacción Mouse & Scroll
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Loop de animación
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Mover corredores a lo largo del circuito
      runners.forEach((r) => {
        r.t = (r.t + r.speed) % 1;
        const pt = curve.getPointAt(r.t);
        const tangent = curve.getTangentAt(r.t).normalize();

        r.mesh.position.set(pt.x, pt.y + 0.35, pt.z);
        r.mesh.lookAt(pt.x + tangent.x, pt.y + tangent.y + 0.35, pt.z + tangent.z);
      });

      // Suave rotación de partículas de polvo
      particles.rotation.y = elapsed * 0.02;

      // Parallax suave con mouse y scroll
      targetRotY = mouseX * 0.18 + scrollY * 0.0004;
      targetRotX = mouseY * 0.08 + Math.min(scrollY * 0.0003, 0.2);

      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.04;
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.04;

      // Oscilación suave de la cámara
      camera.position.y = 16 + Math.sin(elapsed * 0.3) * 0.4 - Math.min(scrollY * 0.005, 5);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      wireframeMat.dispose();
      trackGeo.dispose();
      trackMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #151820 0%, #0a0c10 80%)',
      }}
    />
  );
}
