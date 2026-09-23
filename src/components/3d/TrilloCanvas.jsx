import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TrilloCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ==========================================
    // 1. ESCENA, CÁMARA Y RENDERER
    // ==========================================
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

    // ==========================================
    // 2. LUNA LLENA HIPERREALISTA CON TEXTURA ASTRONÓMICA
    // ==========================================
    const isMobile = window.innerWidth < 768;
    const moonPos = new THREE.Vector3(isMobile ? 18 : 34, 28, -92);

    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('/moon.jpg');
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    // Tamaño equilibrado y sutil
    const moonSize = 25;
    const moonGeo = new THREE.PlaneGeometry(moonSize, moonSize);

    const moonMat = new THREE.ShaderMaterial({
      uniforms: {
        uMoonTex: { value: moonTexture },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uMoonTex;
        uniform float uTime;

        void main() {
          vec2 center = vec2(0.5);
          float d = distance(vUv, center) * 2.0;

          // Muestreo de textura astronómica hiperreal de la Luna
          vec4 texColor = texture2D(uMoonTex, vUv);

          // Máscara antialiasing circular perfecta para la esfera lunar
          float moonMask = smoothstep(0.99, 0.965, d);

          // Realce de contraste y matiz plateado perla
          vec3 realisticMoon = texColor.rgb * 1.15;

          // Halo atmosférico etéreo exterior (resplandor sutil nocturno)
          float glow = exp(-d * 2.6) * 0.32;
          vec3 glowColor = vec3(0.88, 0.92, 0.98); // Tono luz de luna

          // Composición: textura lunar en el disco + halo sutil en el exterior
          vec3 finalColor = realisticMoon * moonMask + glowColor * glow * (1.0 - moonMask * 0.5);
          float finalAlpha = clamp(moonMask + glow * 0.75, 0.0, 1.0);

          gl_FragColor = vec4(finalColor, finalAlpha * 0.92);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.copy(moonPos);
    scene.add(moonMesh);

    // Luz direccional plateada suave que baña el relieve
    const moonLight = new THREE.DirectionalLight(0xdbeafe, 0.45);
    moonLight.position.copy(moonPos);
    moonLight.target.position.set(0, -12, 0);
    scene.add(moonLight);
    scene.add(moonLight.target);

    // ==========================================
    // 3. MALLA TOPOGRÁFICA (CUCHILLAS DEL INTERIOR)
    // ==========================================
    const terrainWidth = 240;
    const terrainHeight = 240;
    const segmentsW = 90;
    const segmentsH = 90;
    const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainHeight, segmentsW, segmentsH);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y =
        Math.sin(x * 0.04) * Math.cos(z * 0.04) * 6 +
        Math.sin(x * 0.08 + z * 0.05) * 3 +
        Math.cos(x * 0.02) * 4;
      pos.setY(i, y);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshBasicMaterial({
      color: 0x22272e,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.position.y = -12;
    scene.add(terrain);

    // Segunda capa de relieve con acento ámbar/tierra sutil
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

    // ==========================================
    // 4. ESTRELLAS SUTILES (CANTIDAD REDUCIDA & DISTRIBUIDA)
    // ==========================================
    // Reducido a 85 estrellas selectas para mantener el cielo limpio y despejado
    const starCount = 85;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 240;
      starPositions[i * 3 + 1] = Math.random() * 60 - 5;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 190;
      // Escalas más sutiles y elegantes
      starScales[i] = Math.random() * 16.0 + 9.0;
      starPhases[i] = Math.random() * Math.PI * 2;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('aScale', new THREE.BufferAttribute(starScales, 1));
    starGeo.setAttribute('aPhase', new THREE.BufferAttribute(starPhases, 1));

    const starMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aScale;
        attribute float aPhase;
        varying float vPhase;

        void main() {
          vPhase = aPhase;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aScale * (120.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vPhase;
        uniform float uTime;

        void main() {
          vec2 p = gl_PointCoord - vec2(0.5);
          float dist = length(p);

          // Forma de estrella en cruz de 4 puntas fina y elegante
          float crossDist = min(abs(p.x) * 0.16 + abs(p.y), abs(p.y) * 0.16 + abs(p.x));
          float starRays = 0.024 / (crossDist + 0.032);
          float core = 0.03 / (dist + 0.025);

          float starShape = max(starRays * 0.5, core);

          // Titileo suave pausado
          float twinkle = 0.6 + 0.4 * sin(uTime * 1.8 + vPhase);

          vec3 starColor = vec3(0.94, 0.95, 0.98);

          float circleMask = smoothstep(0.5, 0.12, dist);
          float finalAlpha = starShape * twinkle * circleMask;

          gl_FragColor = vec4(starColor, clamp(finalAlpha, 0.0, 1.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starParticles = new THREE.Points(starGeo, starMat);
    scene.add(starParticles);

    // ==========================================
    // 5. INTERACCIÓN Y LOOP DE ANIMACIÓN
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      const mobile = window.innerWidth < 768;
      moonMesh.position.set(mobile ? 18 : 34, 28, -92);
      moonLight.position.copy(moonMesh.position);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      moonMat.uniforms.uTime.value = elapsedTime;
      starMat.uniforms.uTime.value = elapsedTime;

      // Suavizado inercial del mouse
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      camera.position.x = targetX * 14;
      camera.position.y = 30 + targetY * -8;
      camera.lookAt(0, 0, 0);

      // Rotación suave del terreno
      terrain.rotation.y = elapsedTime * 0.015;
      accentTerrain.rotation.y = elapsedTime * 0.015;

      // Flotación imperceptible de las estrellas
      const pArray = starGeo.attributes.position.array;
      for (let i = 0; i < starCount; i++) {
        pArray[i * 3 + 1] += Math.sin(elapsedTime * 0.5 + i) * 0.015;
      }
      starGeo.attributes.position.needsUpdate = true;

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
      moonGeo.dispose();
      moonMat.dispose();
      moonTexture.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      accentGeo.dispose();
      accentMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.88 }}
    />
  );
}
