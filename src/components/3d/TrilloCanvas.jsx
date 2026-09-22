import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TrilloCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Escena, Cámara y Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090a, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 30, 90);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Malla Topográfica (Cuchillas y relieve del interior)
    const terrainWidth = 240;
    const terrainHeight = 240;
    const segmentsW = 90;
    const segmentsH = 90;
    const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainHeight, segmentsW, segmentsH);
    terrainGeo.rotateX(-Math.PI / 2);

    // Generar relieve suave tipo ondulaciones de campo uruguayo
    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Frecuencias combinadas para colinas suaves
      const y =
        Math.sin(x * 0.04) * Math.cos(z * 0.04) * 6 +
        Math.sin(x * 0.08 + z * 0.05) * 3 +
        Math.cos(x * 0.02) * 4;
      pos.setY(i, y);
    }
    terrainGeo.computeVertexNormals();

    // Material de alambre refinado con tono ámbar/tierra oscuro
    const terrainMat = new THREE.MeshBasicMaterial({
      color: 0x22272e,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.position.y = -12;
    scene.add(terrain);

    // Segunda capa de relieve con acento cálido sutil (líneas de contorno)
    const accentGeo = new THREE.PlaneGeometry(terrainWidth, terrainHeight, 30, 30);
    accentGeo.rotateX(-Math.PI / 2);
    const accentPos = accentGeo.attributes.position;
    for (let i = 0; i < accentPos.count; i++) {
      const x = accentPos.getX(i);
      const z = accentPos.getZ(i);
      const y = Math.sin(x * 0.04) * Math.cos(z * 0.04) * 6.2;
      accentPos.setY(i, y);
    }
    const accentMat = new THREE.MeshBasicMaterial({
      color: 0xe87a38,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const accentTerrain = new THREE.Mesh(accentGeo, accentMat);
    accentTerrain.position.y = -11.8;
    scene.add(accentTerrain);

    // Partículas orgánicas de polvo/brisa en suspensión
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 200;
      particlePositions[i * 3 + 1] = Math.random() * 60 - 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 180;
      particleScales[i] = Math.random() * 2 + 1;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd8cfc4,
      size: 1.2,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interacción suave con mouse
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Loop de animación a 60fps
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Suavizado inercial del mouse
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      camera.position.x = targetX * 14;
      camera.position.y = 30 + targetY * -8;
      camera.lookAt(0, 0, 0);

      // Movimiento fluido del terreno
      terrain.rotation.y = elapsedTime * 0.015;
      accentTerrain.rotation.y = elapsedTime * 0.015;

      // Partículas flotando suavemente
      const pArray = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pArray[i * 3 + 1] += Math.sin(elapsedTime * 0.8 + i) * 0.03;
        pArray[i * 3] += Math.cos(elapsedTime * 0.5 + i) * 0.02;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      terrainGeo.dispose();
      terrainMat.dispose();
      accentGeo.dispose();
      accentMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
}
