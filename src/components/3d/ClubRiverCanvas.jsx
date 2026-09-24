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

    // Colores clave para la transición del atardecer:
    // 1. Día / Tarde despejada: #87CEEB (Sky Blue auténtico solicitado)
    // 2. Atardecer medio: #9a4820 (Ámbar fuego profundo)
    // 3. Crepúsculo / Anochecer cálido: #140b08 (Oscuro, envolvente)
    const colorDay = new THREE.Color(0x87ceeb);
    const colorMid = new THREE.Color(0x9a4820);
    const colorDusk = new THREE.Color(0x140b08);

    const currentColor = colorDay.clone();

    // El color de fondo y la niebla gobiernan el 100% de la pantalla sin cortes ni cuadrantes
    scene.background = currentColor;
    scene.fog = new THREE.FogExp2(currentColor, 0.0032);

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
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ==========================================
    // 2. SOL DE ATARDECER (SIN BORDES CUADRADOS - 100% CIRCULAR Y SUAVE)
    // ==========================================
    const sunSize = 48;
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

          // Núcleo incandescente del sol
          float core = pow(clamp(1.0 - d * 2.1, 0.0, 1.0), 3.0);
          vec3 coreColor = vec3(1.0, 0.98, 0.92);

          // Halo intermedio que cambia de dorado brillante a fuego crepuscular
          float halo = pow(clamp(1.0 - d * 1.05, 0.0, 1.0), 1.8);
          vec3 haloDay = vec3(0.98, 0.68, 0.22);
          vec3 haloDusk = vec3(0.92, 0.28, 0.08);
          vec3 haloColor = mix(haloDay, haloDusk, uSunProgress);

          // Desvanecimiento radial perfecto sin bordes de quad
          float outerGlow = exp(-d * 2.4) * (0.8 - uSunProgress * 0.3);
          float circleCutoff = smoothstep(1.0, 0.05, d);

          vec3 finalColor = coreColor * core * 1.5 + haloColor * (halo + outerGlow);
          float alpha = (core * 1.2 + halo * 0.9 + outerGlow * 0.6) * circleCutoff;

          gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(0, 22, -100);
    scene.add(sunMesh);

    // ==========================================
    // 3. EL RÍO YÍ (AGUA REFLECTANTE CON SHADER GLSL)
    // ==========================================
    const riverWidth = 38;
    const riverLength = 220;
    const riverGeo = new THREE.PlaneGeometry(riverWidth, riverLength, 60, 100);
    riverGeo.rotateX(-Math.PI / 2);

    const riverPos = riverGeo.attributes.position;
    for (let i = 0; i < riverPos.count; i++) {
      const z = riverPos.getZ(i);
      const riverCurve = Math.sin(z * 0.035) * 12.0 + Math.sin(z * 0.015) * 8.0;
      riverPos.setX(i, riverPos.getX(i) + riverCurve);
      riverPos.setY(i, -6.8);
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
          // Color del agua que se oscurece con el atardecer
          vec3 waterDay = vec3(0.78, 0.52, 0.25);
          vec3 waterDusk = vec3(0.22, 0.10, 0.05);
          vec3 baseWater = mix(waterDay, waterDusk, uSunProgress);

          // Reflejo especular del sol que se vuelve más dramático y contrastado al anochecer
          float sunReflectionX = abs(vWorldPos.x - sin(vWorldPos.z * 0.035) * 12.0);
          float specWidth = mix(5.5, 8.5, uSunProgress);
          float specular = exp(-sunReflectionX * sunReflectionX / (specWidth * specWidth));

          float ripples = sin(vWorldPos.z * 0.4 + uTime * 2.5) * cos(vWorldPos.x * 0.3 - uTime);
          specular *= (0.75 + 0.25 * ripples);

          vec3 specColor = mix(vec3(1.0, 0.95, 0.65), vec3(1.0, 0.55, 0.2), uSunProgress);

          vec3 finalColor = baseWater + specColor * specular * 1.4;
          float alpha = clamp(0.75 + specular * 0.35, 0.0, 1.0);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    scene.add(riverMesh);

    // ==========================================
    // 4. COLINAS Y RIBERA DE DURAZNO (TERRENO FLUIDO)
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

      let height = Math.pow(Math.min(distToRiver / 18.0, 1.0), 2.0) * 14.0 - 6.5;
      height += Math.sin(x * 0.05) * Math.cos(z * 0.04) * 4.0;
      tPos.setY(i, height);
    }
    terrainGeo.computeVertexNormals();

    // Malla de alambre cálida que se atenúa suavemente con la noche
    const terrainMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrain);

    // Superficie suave de colinas
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0xb5def2,
      transparent: true,
      opacity: 0.65,
    });
    const groundMesh = new THREE.Mesh(terrainGeo, groundMat);
    groundMesh.position.y = -0.15;
    scene.add(groundMesh);

    // ==========================================
    // 5. ESTRELLAS RADIANTES EN EL CIELO CELESTE (FORMA EN CRUZ ESTILO TRILLO)
    // ==========================================
    // Ubicadas exclusivamente en la cúpula del cielo por encima del horizonte
    const starCount = 70;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 220;
      // Estrictamente en el cielo (Y entre 14 y 55, muy por encima de colinas y río)
      starPositions[i * 3 + 1] = Math.random() * 38 + 14;
      starPositions[i * 3 + 2] = -Math.random() * 110 - 15;
      starScales[i] = Math.random() * 20.0 + 12.0;
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

          // Forma de estrella en cruz de 4 puntas fina y elegante (estilo Trillo)
          float crossDist = min(abs(p.x) * 0.16 + abs(p.y), abs(p.y) * 0.16 + abs(p.x));
          float starRays = 0.026 / (crossDist + 0.032);
          float core = 0.038 / (dist + 0.025);

          float starShape = max(starRays * 0.6, core);

          // Titileo suave pausado y orgánico
          float twinkle = 0.55 + 0.45 * sin(uTime * 1.8 + vPhase);

          // Destello luminoso blanco cálido que brilla con fuerza sobre el cielo celeste
          vec3 starColor = vec3(1.0, 0.98, 0.92);

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
    // 6. CONTROL DEL SCROLL BIDIRECCIONAL & ATARDECER
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
    // 7. RENDER LOOP A 60 FPS
    // ==========================================
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Suavizado del scroll (avanza y retrocede en tiempo real)
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.055;

      targetMouseX += (mouseX - targetMouseX) * 0.04;
      targetMouseY += (mouseY - targetMouseY) * 0.04;

      // ==========================================
      // OSCURECIMIENTO PROGRESIVO DE TODA LA PANTALLA
      // ==========================================
      // Transición cromática continua sin cuadrantes:
      // De 0.0 a 0.5: Tarde clara -> Atardecer ámbar fuego
      // De 0.5 a 1.0: Atardecer ámbar -> Crepúsculo oscuro profundo
      if (currentScrollProgress < 0.5) {
        const factor = currentScrollProgress * 2.0;
        currentColor.copy(colorDay).lerp(colorMid, factor);
      } else {
        const factor = (currentScrollProgress - 0.5) * 2.0;
        currentColor.copy(colorMid).lerp(colorDusk, factor);
      }

      // Actualizar el fondo y la niebla para gobernar el 100% de la pantalla
      scene.background.copy(currentColor);
      scene.fog.color.copy(currentColor);

      // Oscurecer el suelo en sintonía con el crepúsculo
      const groundDay = new THREE.Color(0xb5def2);
      const groundDusk = new THREE.Color(0x24140c);
      groundMat.color.copy(groundDay).lerp(groundDusk, currentScrollProgress);
      groundMat.opacity = 0.65 - currentScrollProgress * 0.25;

      // Posición del sol gobernada por el scroll:
      // Cuando scroll = 0 -> y = 22 (sol alto y brillante)
      // Cuando scroll = 1 -> y = 3 (sol ocultándose en el horizonte)
      const sunY = 22 - currentScrollProgress * 19.0;
      sunMesh.position.y = sunY;
      sunMesh.position.x = targetMouseX * 5.0;

      // Actualizar uniforms de shaders
      sunMat.uniforms.uTime.value = elapsedTime;
      sunMat.uniforms.uSunProgress.value = currentScrollProgress;

      riverMat.uniforms.uTime.value = elapsedTime;
      riverMat.uniforms.uSunProgress.value = currentScrollProgress;

      // Movimiento suave de la cámara
      camera.position.x = targetMouseX * 8;
      camera.position.y = 16 - currentScrollProgress * 3.5 + targetMouseY * -2.5;
      camera.lookAt(0, 2 - currentScrollProgress * 1.5, 0);

      // Actualizar uniforms de estrellas
      starMat.uniforms.uTime.value = elapsedTime;

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
      sunGeo.dispose();
      sunMat.dispose();
      riverGeo.dispose();
      riverMat.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      groundMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
