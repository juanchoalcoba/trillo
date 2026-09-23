import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ClubRiverCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ==========================================
    // 1. ESCENA, CÁMARA Y RENDERER
    // ==========================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfaf3eb, 0.0022); // Niebla cálida dorada de atardecer

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 16, 75);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ==========================================
    // 2. CIELO DE ATARDECER / GOLDEN HOUR
    // ==========================================
    const skyGeo = new THREE.PlaneGeometry(320, 160);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        uSunProgress: { value: 0.0 },
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
        uniform float uSunProgress;

        void main() {
          // Gradiente dinámico de cielo de atardecer uruguayo
          vec3 skyTopDay = vec3(0.98, 0.94, 0.88);   // Tono crema atardecer alto
          vec3 skyTopDusk = vec3(0.85, 0.55, 0.35);  // Crepúsculo ámbar
          vec3 skyTop = mix(skyTopDay, skyTopDusk, uSunProgress);

          vec3 horizonDay = vec3(0.98, 0.72, 0.35);  // Sol dorado intenso
          vec3 horizonDusk = vec3(0.88, 0.38, 0.18); // Fuego terroso de atardecer
          vec3 horizon = mix(horizonDay, horizonDusk, uSunProgress);

          vec3 color = mix(horizon, skyTop, smoothstep(0.0, 0.85, vUv.y));

          // Resplandor del sol en el centro del horizonte
          float distToCenter = distance(vUv, vec2(0.5, 0.25 - uSunProgress * 0.15));
          float sunGlow = exp(-distToCenter * 3.5) * (0.8 - uSunProgress * 0.2);
          color += vec3(1.0, 0.85, 0.5) * sunGlow;

          gl_FragColor = vec4(color, 0.98);
        }
      `,
      depthWrite: false,
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    skyMesh.position.set(0, 25, -130);
    scene.add(skyMesh);

    // ==========================================
    // 3. SOL DE ATARDECER (SOL REACTIVO AL SCROLL)
    // ==========================================
    const sunSize = 42;
    const sunGeo = new THREE.PlaneGeometry(sunSize, sunSize);
    const sunMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSunProgress: { value: 0 },
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
        uniform float uTime;
        uniform float uSunProgress;

        void main() {
          vec2 center = vec2(0.5);
          float d = distance(vUv, center) * 2.0;

          // Núcleo solar incandescente
          float core = pow(clamp(1.0 - d * 2.2, 0.0, 1.0), 3.0);
          vec3 coreColor = vec3(1.0, 0.98, 0.92);

          // Corona dorada suave
          float halo = pow(clamp(1.0 - d * 1.1, 0.0, 1.0), 1.8);
          vec3 haloColor = mix(vec3(0.96, 0.65, 0.2), vec3(0.88, 0.35, 0.12), uSunProgress);

          // Dispersión lechosa exterior
          float outer = exp(-d * 2.2) * 0.5;

          vec3 finalColor = coreColor * core * 1.6 + haloColor * halo * 1.3 + haloColor * outer;
          float alpha = clamp(core * 1.2 + halo * 0.9 + outer * 0.7, 0.0, 1.0);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(0, 20, -110);
    scene.add(sunMesh);

    // ==========================================
    // 4. EL RÍO YÍ (AGUA REFLECTANTE CON SHADER GLSL)
    // ==========================================
    const riverWidth = 36;
    const riverLength = 220;
    const riverGeo = new THREE.PlaneGeometry(riverWidth, riverLength, 60, 100);
    riverGeo.rotateX(-Math.PI / 2);

    // Ondulación curvilínea del curso del Río Yí
    const riverPos = riverGeo.attributes.position;
    for (let i = 0; i < riverPos.count; i++) {
      const z = riverPos.getZ(i);
      // Curva natural serpenteante del río
      const riverCurve = Math.sin(z * 0.035) * 12.0 + Math.sin(z * 0.015) * 8.0;
      riverPos.setX(i, riverPos.getX(i) + riverCurve);
      riverPos.setY(i, -6.8); // Nivel del agua en el fondo del valle
    }
    riverGeo.computeVertexNormals();

    const riverMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSunProgress: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        uniform float uTime;

        void main() {
          vUv = uv;
          vec3 pos = position;
          // Ondas suaves del agua del río
          float wave = sin(pos.z * 0.18 + uTime * 1.8) * 0.22 + cos(pos.x * 0.25 + uTime * 1.2) * 0.15;
          pos.y += wave;

          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        uniform float uTime;
        uniform float uSunProgress;

        void main() {
          // Color base del Río Yí: agua dorada de atardecer
          vec3 waterDeep = vec3(0.55, 0.32, 0.15); // Fondo arena/terroso
          vec3 waterShallow = vec3(0.85, 0.58, 0.28); // Superficie iluminada
          vec3 waterColor = mix(waterDeep, waterShallow, vUv.y);

          // Reflejo especular del sol que se alarga a lo largo del río
          float sunReflectionX = abs(vWorldPos.x - sin(vWorldPos.z * 0.035) * 12.0);
          float specWidth = mix(5.5, 9.0, uSunProgress);
          float specular = exp(-sunReflectionX * sunReflectionX / (specWidth * specWidth));

          // Ondulación del reflejo
          float ripples = sin(vWorldPos.z * 0.4 + uTime * 2.5) * cos(vWorldPos.x * 0.3 - uTime);
          specular *= (0.75 + 0.25 * ripples);

          vec3 sunSpecColor = mix(vec3(1.0, 0.95, 0.7), vec3(1.0, 0.75, 0.4), uSunProgress);

          vec3 finalColor = waterColor + sunSpecColor * specular * 1.25;
          float alpha = clamp(0.72 + specular * 0.35, 0.0, 1.0);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    scene.add(riverMesh);

    // ==========================================
    // 5. COLINAS Y RIBERA DE DURAZNO (TERRENO CÁLIDO)
    // ==========================================
    const terrainWidth = 240;
    const terrainHeight = 220;
    const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainHeight, 80, 80);
    terrainGeo.rotateX(-Math.PI / 2);

    const tPos = terrainGeo.attributes.position;
    for (let i = 0; i < tPos.count; i++) {
      const x = tPos.getX(i);
      const z = tPos.getZ(i);
      const riverCurve = Math.sin(z * 0.035) * 12.0 + Math.sin(z * 0.015) * 8.0;
      const distToRiver = Math.abs(x - riverCurve);

      // Valle del río hundido y colinas que suben a los costados
      let height = Math.pow(Math.min(distToRiver / 18.0, 1.0), 2.0) * 14.0 - 6.5;
      height += Math.sin(x * 0.05) * Math.cos(z * 0.04) * 4.0;
      tPos.setY(i, height);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrain);

    // Superficie suave de colinas con tono arena/tierra cálida
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0xf5ebe1,
      transparent: true,
      opacity: 0.75,
    });
    const groundMesh = new THREE.Mesh(terrainGeo, groundMat);
    groundMesh.position.y = -0.15;
    scene.add(groundMesh);

    // ==========================================
    // 6. PARTÍCULAS DORADAS DE ATARDECER (POLVO DE CAMPO)
    // ==========================================
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 180;
      particlePositions[i * 3 + 1] = Math.random() * 45 - 4;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 160;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 1.6,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // 7. SINCRONIZACIÓN DEL SCROLL BIDIRECCIONAL
    // ==========================================
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        targetScrollProgress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mouse parallax interactivo
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 8. RENDER LOOP A 60 FPS
    // ==========================================
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Suavizado del scroll (sube y baja fluidamente en reversa)
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.06;

      // Suavizado del mouse
      targetMouseX += (mouseX - targetMouseX) * 0.04;
      targetMouseY += (mouseY - targetMouseY) * 0.04;

      // Posición del sol gobernada por el scroll:
      // Cuando scroll = 0 -> y = 20 (sol alto y brillante)
      // Cuando scroll = 1 -> y = 3.5 (sol poniéndose sobre el horizonte del Río Yí)
      const sunY = 20 - currentScrollProgress * 16.5;
      sunMesh.position.y = sunY;
      sunMesh.position.x = targetMouseX * 5.0;

      // Actualizar shaders con tiempo y progreso del sol
      sunMat.uniforms.uTime.value = elapsedTime;
      sunMat.uniforms.uSunProgress.value = currentScrollProgress;

      skyMat.uniforms.uSunProgress.value = currentScrollProgress;

      riverMat.uniforms.uTime.value = elapsedTime;
      riverMat.uniforms.uSunProgress.value = currentScrollProgress;

      // Movimiento de cámara sutil según scroll y mouse
      camera.position.x = targetMouseX * 10;
      camera.position.y = 16 - currentScrollProgress * 4 + targetMouseY * -3;
      camera.lookAt(0, 2 - currentScrollProgress * 2, 0);

      // Flotación lenta de partículas doradas
      const pArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pArr[i * 3 + 1] += Math.sin(elapsedTime * 0.6 + i) * 0.015;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      skyGeo.dispose();
      skyMat.dispose();
      sunGeo.dispose();
      sunMat.dispose();
      riverGeo.dispose();
      riverMat.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      groundMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
}
