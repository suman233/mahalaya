"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Sun, Moon, Flame, Eye, Compass } from "lucide-react";

interface DurgaHeroCanvasProps {
  onCanvasReady?: () => void;
  interactiveMode?: boolean;
}

export type LightingPreset = "dawn" | "sunrise" | "aarti";

export default function DurgaHeroCanvas({
  onCanvasReady,
  interactiveMode = true,
}: DurgaHeroCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>("sunrise");
  const [cameraView, setCameraView] = useState<"wide" | "sanctum" | "river">("sanctum");
  const [isLoaded, setIsLoaded] = useState(false);
  const [particleCount, setParticleCount] = useState(380);

  // References for runtime animation updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    directional: THREE.DirectionalLight;
    haloPoint: THREE.PointLight;
    diyaLights: THREE.PointLight[];
  } | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef(new THREE.Vector3(0, 1.8, 6.2));
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const bgColors = {
      dawn: 0x050814,
      sunrise: 0x0a0c1e,
      aarti: 0x07040a,
    };
    scene.background = new THREE.Color(bgColors.sunrise);
    scene.fog = new THREE.FogExp2(0x060918, 0.045);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.8, 6.2);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // ==========================================
    // 1. LIGHTING RIG
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xd4af37, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffecd1, 2.2);
    dirLight.position.set(0, 7, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Halo backlight behind Maa Durga
    const haloPoint = new THREE.PointLight(0xffb703, 3.5, 12, 1.2);
    haloPoint.position.set(0, 2.6, -0.6);
    scene.add(haloPoint);

    // Diya flickering lights
    const diyaLights: THREE.PointLight[] = [];
    const diyaPositions = [
      [-1.8, 0.05, 1.5],
      [1.8, 0.05, 1.5],
      [-2.6, 0.05, 2.8],
      [2.6, 0.05, 2.8],
      [0, 0.05, 3.4],
    ];

    diyaPositions.forEach(([x, y, z]) => {
      const pLight = new THREE.PointLight(0xf59e0b, 1.2, 5, 2);
      pLight.position.set(x, y, z);
      scene.add(pLight);
      diyaLights.push(pLight);
    });

    lightsRef.current = {
      ambient: ambientLight,
      directional: dirLight,
      haloPoint,
      diyaLights,
    };

    // ==========================================
    // 2. PROCEDURAL SACRED DURGA IDOL ASSEMBLY
    // ==========================================
    const sanctumGroup = new THREE.Group();
    scene.add(sanctumGroup);

    // Antique Gold and Vermilion Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x5a410b,
      emissiveIntensity: 0.25,
    });

    const divineGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xffaa00,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
    });

    const vermilionMaterial = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      metalness: 0.2,
      roughness: 0.7,
      emissive: 0x450a0a,
      emissiveIntensity: 0.2,
    });

    // Base Sanctum Lotus Pedestal (Padmapitha)
    const basePedestal = new THREE.Group();
    const pedestalBaseGeo = new THREE.CylinderGeometry(2.2, 2.5, 0.35, 32);
    const pedestalBase = new THREE.Mesh(pedestalBaseGeo, goldMaterial);
    pedestalBase.receiveShadow = true;
    basePedestal.add(pedestalBase);

    // Carved Terracotta Pedestal Tier
    const pedestalTierGeo = new THREE.CylinderGeometry(1.9, 2.1, 0.25, 24);
    const pedestalTier = new THREE.Mesh(pedestalTierGeo, vermilionMaterial);
    pedestalTier.position.y = 0.3;
    basePedestal.add(pedestalTier);

    // Lotus Petals forming the Padmapitha base
    const petalGeo = new THREE.ConeGeometry(0.35, 0.8, 6);
    petalGeo.rotateX(Math.PI / 3);
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeo, goldMaterial);
      petal.position.set(Math.cos(angle) * 1.85, 0.45, Math.sin(angle) * 1.85);
      petal.rotation.y = -angle + Math.PI / 2;
      basePedestal.add(petal);
    }
    sanctumGroup.add(basePedestal);

    // ==========================================
    // THE SACRED TRISHUL (Divine Trident of Shiva)
    // ==========================================
    const trishulGroup = new THREE.Group();
    trishulGroup.position.set(0, 0.6, 0.1);

    // Shaft of the Trishul
    const shaftGeo = new THREE.CylinderGeometry(0.045, 0.05, 3.8, 16);
    const shaft = new THREE.Mesh(shaftGeo, goldMaterial);
    shaft.position.y = 1.9;
    shaft.castShadow = true;
    trishulGroup.add(shaft);

    // Center Spear Blade (Khadga prong)
    const centerBladeGeo = new THREE.ConeGeometry(0.12, 1.1, 8);
    centerBladeGeo.scale(1, 1, 0.4);
    const centerBlade = new THREE.Mesh(centerBladeGeo, divineGlowMaterial);
    centerBlade.position.y = 3.9;
    trishulGroup.add(centerBlade);

    // Left and Right Crescent Prongs of Trishul
    const curveLeft = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 3.2, 0),
      new THREE.Vector3(-0.65, 3.4, 0),
      new THREE.Vector3(-0.45, 4.3, 0)
    );
    const curveGeoLeft = new THREE.TubeGeometry(curveLeft, 24, 0.04, 8, false);
    const prongLeft = new THREE.Mesh(curveGeoLeft, divineGlowMaterial);
    trishulGroup.add(prongLeft);

    const prongTipLeftGeo = new THREE.ConeGeometry(0.09, 0.45, 8);
    const prongTipLeft = new THREE.Mesh(prongTipLeftGeo, divineGlowMaterial);
    prongTipLeft.position.set(-0.45, 4.35, 0);
    prongTipLeft.rotation.z = -0.2;
    trishulGroup.add(prongTipLeft);

    // Right Prong (Mirrored)
    const curveRight = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 3.2, 0),
      new THREE.Vector3(0.65, 3.4, 0),
      new THREE.Vector3(0.45, 4.3, 0)
    );
    const curveGeoRight = new THREE.TubeGeometry(curveRight, 24, 0.04, 8, false);
    const prongRight = new THREE.Mesh(curveGeoRight, divineGlowMaterial);
    trishulGroup.add(prongRight);

    const prongTipRightGeo = new THREE.ConeGeometry(0.09, 0.45, 8);
    const prongTipRight = new THREE.Mesh(prongTipRightGeo, divineGlowMaterial);
    prongTipRight.position.set(0.45, 4.35, 0);
    prongTipRight.rotation.z = 0.2;
    trishulGroup.add(prongTipRight);

    // Sacred Damru (Hourglass Drum) on the shaft
    const damruTopGeo = new THREE.ConeGeometry(0.18, 0.22, 16);
    const damruBottomGeo = new THREE.ConeGeometry(0.18, 0.22, 16);
    damruBottomGeo.rotateX(Math.PI);
    const damruTop = new THREE.Mesh(damruTopGeo, vermilionMaterial);
    const damruBottom = new THREE.Mesh(damruBottomGeo, vermilionMaterial);
    damruTop.position.set(0, 2.85, 0);
    damruBottom.position.set(0, 2.65, 0);
    trishulGroup.add(damruTop, damruBottom);

    // Red Silk Ribbon flowing from Damru
    const clothGeo = new THREE.CylinderGeometry(0.02, 0.08, 0.9, 8);
    const ribbon1 = new THREE.Mesh(clothGeo, vermilionMaterial);
    ribbon1.position.set(-0.12, 2.3, 0.05);
    ribbon1.rotation.z = 0.25;
    const ribbon2 = new THREE.Mesh(clothGeo, vermilionMaterial);
    ribbon2.position.set(0.12, 2.25, -0.05);
    ribbon2.rotation.z = -0.3;
    trishulGroup.add(ribbon1, ribbon2);

    sanctumGroup.add(trishulGroup);

    // ==========================================
    // THE DIVINE PRABHABOLI (RADIANT SOLAR HALO)
    // ==========================================
    const haloGroup = new THREE.Group();
    haloGroup.position.set(0, 2.7, -0.4);

    // Outer Torus Ring
    const haloRingGeo = new THREE.TorusGeometry(1.65, 0.05, 16, 64);
    const haloRing = new THREE.Mesh(haloRingGeo, divineGlowMaterial);
    haloGroup.add(haloRing);

    // Inner Torus Ring
    const haloInnerGeo = new THREE.TorusGeometry(1.4, 0.035, 16, 64);
    const haloInner = new THREE.Mesh(haloInnerGeo, goldMaterial);
    haloGroup.add(haloInner);

    // Sun Rays (Radiant Spikes radiating out)
    const rayGeo = new THREE.ConeGeometry(0.04, 0.4, 6);
    rayGeo.rotateZ(Math.PI / 2);
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const ray = new THREE.Mesh(rayGeo, divineGlowMaterial);
      ray.position.set(Math.cos(angle) * 1.75, Math.sin(angle) * 1.75, 0);
      ray.rotation.z = angle;
      haloGroup.add(ray);
    }
    sanctumGroup.add(haloGroup);

    // ==========================================
    // DIVINE CROWN (MUKUT) & THIRD EYE (TRINAYANA)
    // ==========================================
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.75, 0.15);

    // Golden Mukut (Traditional Bengali Solapith Crown Peak)
    const crownBaseGeo = new THREE.CylinderGeometry(0.35, 0.42, 0.25, 24);
    const crownBase = new THREE.Mesh(crownBaseGeo, goldMaterial);
    headGroup.add(crownBase);

    const crownTier1Geo = new THREE.ConeGeometry(0.42, 0.7, 16);
    const crownTier1 = new THREE.Mesh(crownTier1Geo, divineGlowMaterial);
    crownTier1.position.y = 0.45;
    headGroup.add(crownTier1);

    const crownPeakGeo = new THREE.ConeGeometry(0.15, 0.55, 12);
    const crownPeak = new THREE.Mesh(crownPeakGeo, goldMaterial);
    crownPeak.position.y = 0.95;
    headGroup.add(crownPeak);

    // Trinayana (Divine Glowing Third Eye)
    const trinayanaGeo = new THREE.SphereGeometry(0.09, 16, 16);
    trinayanaGeo.scale(0.5, 1.2, 0.5);
    const trinayanaMat = new THREE.MeshBasicMaterial({
      color: 0xff2a2a,
    });
    const trinayana = new THREE.Mesh(trinayanaGeo, trinayanaMat);
    trinayana.position.set(0, -0.05, 0.35);
    headGroup.add(trinayana);

    sanctumGroup.add(headGroup);

    // ==========================================
    // THE 10 WEAPONS (DASHAPRAHARANA) IN ORBIT
    // ==========================================
    const weaponsGroup = new THREE.Group();
    weaponsGroup.position.set(0, 2.5, 0);

    // 1. Sudarshana Chakra (Spinning Golden Disc)
    const chakraGeo = new THREE.TorusGeometry(0.24, 0.03, 8, 24);
    const chakraMesh = new THREE.Mesh(chakraGeo, divineGlowMaterial);
    chakraMesh.position.set(1.5, 0.8, -0.1);
    weaponsGroup.add(chakraMesh);

    // 2. Shankha (Sacred Conch Shell)
    const shankhaGeo = new THREE.ConeGeometry(0.14, 0.35, 12);
    shankhaGeo.rotateZ(Math.PI / 4);
    const shankhaMesh = new THREE.Mesh(
      shankhaGeo,
      new THREE.MeshStandardMaterial({ color: 0xfcfbf7, roughness: 0.3 })
    );
    shankhaMesh.position.set(-1.5, 0.8, -0.1);
    weaponsGroup.add(shankhaMesh);

    // 3. Dhanush (Golden Bow)
    const bowCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, -0.4, 0),
      new THREE.Vector3(-0.35, 0, 0),
      new THREE.Vector3(0, 0.4, 0)
    );
    const bowGeo = new THREE.TubeGeometry(bowCurve, 16, 0.025, 8, false);
    const bowMesh = new THREE.Mesh(bowGeo, goldMaterial);
    bowMesh.position.set(-1.8, 0.1, 0.1);
    weaponsGroup.add(bowMesh);

    // 4. Arrow (Golden Teer)
    const arrowGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.7, 8);
    arrowGeo.rotateZ(Math.PI / 2);
    const arrowMesh = new THREE.Mesh(arrowGeo, goldMaterial);
    arrowMesh.position.set(1.8, 0.1, 0.1);
    weaponsGroup.add(arrowMesh);

    // 5. Gada (Mace of Vishnu)
    const gadaShaftGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.8, 8);
    const gadaHeadGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const gadaMesh = new THREE.Group();
    gadaMesh.add(new THREE.Mesh(gadaShaftGeo, goldMaterial));
    const gadaHead = new THREE.Mesh(gadaHeadGeo, divineGlowMaterial);
    gadaHead.position.y = 0.4;
    gadaMesh.add(gadaHead);
    gadaMesh.position.set(1.6, -0.6, 0.2);
    gadaMesh.rotation.z = -0.5;
    weaponsGroup.add(gadaMesh);

    // 6. Sacred Lotus (Padma)
    const lotusGeo = new THREE.ConeGeometry(0.16, 0.3, 8);
    const lotusMesh = new THREE.Mesh(lotusGeo, vermilionMaterial);
    lotusMesh.position.set(-1.6, -0.6, 0.2);
    lotusMesh.rotation.z = 0.5;
    weaponsGroup.add(lotusMesh);

    sanctumGroup.add(weaponsGroup);

    // ==========================================
    // 3. GANGES WATER PLANE (REFLECTIVE RIVER)
    // ==========================================
    const waterGeo = new THREE.PlaneGeometry(35, 35, 48, 48);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x071128,
      metalness: 0.92,
      roughness: 0.15,
      transparent: true,
      opacity: 0.88,
    });
    const waterPlane = new THREE.Mesh(waterGeo, waterMat);
    waterPlane.rotation.x = -Math.PI / 2;
    waterPlane.position.y = -0.05;
    waterPlane.receiveShadow = true;
    scene.add(waterPlane);

    // Floating Brass Diyas on the river
    const diyaMeshGroup = new THREE.Group();
    diyaPositions.forEach(([x, y, z]) => {
      const diyaBowlGeo = new THREE.CylinderGeometry(0.18, 0.1, 0.1, 12);
      const diyaBowl = new THREE.Mesh(diyaBowlGeo, goldMaterial);
      diyaBowl.position.set(x, y + 0.05, z);

      // Flickering flame
      const flameGeo = new THREE.ConeGeometry(0.05, 0.18, 8);
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.y = 0.12;
      diyaBowl.add(flame);

      diyaMeshGroup.add(diyaBowl);
    });
    scene.add(diyaMeshGroup);

    // ==========================================
    // 4. FLOATING PARTICLES (GOLDEN EMBERS & PETALS)
    // ==========================================
    // A. Swirling Golden Embers
    const emberCount = 320;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);
    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 14;
      emberPositions[i * 3 + 1] = Math.random() * 8;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      emberSpeeds[i] = 0.006 + Math.random() * 0.012;
    }
    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xffd166,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const emberParticles = new THREE.Points(emberGeo, emberMat);
    scene.add(emberParticles);

    // B. Drifting Lotus Petals
    const petalCount = 80;
    const petalPositions = new Float32Array(petalCount * 3);
    const petalDrift = new Float32Array(petalCount);
    for (let i = 0; i < petalCount; i++) {
      petalPositions[i * 3] = (Math.random() - 0.5) * 10;
      petalPositions[i * 3 + 1] = Math.random() * 6 + 1;
      petalPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      petalDrift[i] = Math.random() * Math.PI * 2;
    }
    const petalBufferGeo = new THREE.BufferGeometry();
    petalBufferGeo.setAttribute("position", new THREE.BufferAttribute(petalPositions, 3));
    const petalPointMat = new THREE.PointsMaterial({
      color: 0xef4444,
      size: 0.09,
      transparent: true,
      opacity: 0.75,
    });
    const petalParticles = new THREE.Points(petalBufferGeo, petalPointMat);
    scene.add(petalParticles);

    // ==========================================
    // 5. DISTANT TEMPLE SILHOUETTE (TERRACOTTA CHALA)
    // ==========================================
    const templeSilhouette = new THREE.Group();
    templeSilhouette.position.set(-6, 0, -8);

    const templeBaseGeo = new THREE.BoxGeometry(3.5, 2.2, 1);
    const templeMat = new THREE.MeshBasicMaterial({ color: 0x040610 });
    const templeBase = new THREE.Mesh(templeBaseGeo, templeMat);
    templeSilhouette.add(templeBase);

    // Curved Chala Roof
    const roofGeo = new THREE.ConeGeometry(2.4, 2, 4);
    roofGeo.rotateY(Math.PI / 4);
    const templeRoof = new THREE.Mesh(roofGeo, templeMat);
    templeRoof.position.y = 2.1;
    templeSilhouette.add(templeRoof);

    // Kalasha spire on temple peak
    const spireGeo = new THREE.CylinderGeometry(0.05, 0.15, 0.7, 8);
    const spire = new THREE.Mesh(spireGeo, templeMat);
    spire.position.y = 3.3;
    templeSilhouette.add(spire);

    scene.add(templeSilhouette);

    // Right side temple silhouette (Dakshineswar Style)
    const temple2 = templeSilhouette.clone();
    temple2.position.set(7, 0, -9);
    scene.add(temple2);

    setIsLoaded(true);
    if (onCanvasReady) onCanvasReady();

    // ==========================================
    // MOUSE & SCROLL INTERACTION
    // ==========================================
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.45;
      mouseRef.current.targetY = y * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // ==========================================
    // ANIMATION RENDER LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth pointer parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Update camera positioning towards target view
      camera.position.x += (targetCamPos.current.x + mouseRef.current.x - camera.position.x) * 0.05;
      camera.position.y += (targetCamPos.current.y + mouseRef.current.y - camera.position.y) * 0.05;
      camera.position.z += (targetCamPos.current.z - camera.position.z) * 0.05;
      camera.lookAt(0, 1.9, 0);

      // Subtle breath of the Trishul and halo
      trishulGroup.position.y = 0.6 + Math.sin(elapsed * 1.4) * 0.04;
      haloGroup.rotation.z = elapsed * 0.08;
      chakraMesh.rotation.z = elapsed * 1.8;
      chakraMesh.rotation.y = elapsed * 0.6;

      // Floating Diyas bobbing on water
      diyaMeshGroup.children.forEach((diya, idx) => {
        diya.position.y = 0.05 + Math.sin(elapsed * 2 + idx) * 0.02;
        diya.rotation.y = elapsed * 0.2 + idx;
      });

      // Diya light flickering
      diyaLights.forEach((light, i) => {
        light.intensity = 1.1 + Math.sin(elapsed * 9 + i * 2) * 0.35 + (Math.random() - 0.5) * 0.15;
      });

      // Water wave surface shimmer
      const waterPos = waterGeo.attributes.position;
      for (let i = 0; i < waterPos.count; i++) {
        const u = waterPos.getX(i);
        const v = waterPos.getY(i);
        const z = Math.sin(u * 0.6 + elapsed * 1.5) * Math.cos(v * 0.6 + elapsed * 1.2) * 0.04;
        waterPos.setZ(i, z);
      }
      waterPos.needsUpdate = true;

      // Golden Embers rising in gentle draft
      const emberArr = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        emberArr[i * 3 + 1] += emberSpeeds[i];
        emberArr[i * 3] += Math.sin(elapsed + i) * 0.002;
        if (emberArr[i * 3 + 1] > 8) {
          emberArr[i * 3 + 1] = 0.1;
          emberArr[i * 3] = (Math.random() - 0.5) * 12;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Drifting Petals falling
      const petalArr = petalBufferGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < petalCount; i++) {
        petalArr[i * 3 + 1] -= 0.008;
        petalArr[i * 3] += Math.sin(elapsed * 0.8 + petalDrift[i]) * 0.004;
        if (petalArr[i * 3 + 1] < 0) {
          petalArr[i * 3 + 1] = 6;
          petalArr[i * 3] = (Math.random() - 0.5) * 10;
        }
      }
      petalBufferGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update lighting preset dynamically
  useEffect(() => {
    if (!sceneRef.current || !lightsRef.current) return;
    const { ambient, directional, haloPoint } = lightsRef.current;
    const scene = sceneRef.current;

    if (lightingPreset === "dawn") {
      scene.background = new THREE.Color(0x040714);
      scene.fog = new THREE.FogExp2(0x040714, 0.05);
      ambient.color.setHex(0x38bdf8);
      ambient.intensity = 0.45;
      directional.color.setHex(0xf59e0b);
      directional.intensity = 1.2;
      haloPoint.color.setHex(0x38bdf8);
      haloPoint.intensity = 2.2;
    } else if (lightingPreset === "sunrise") {
      scene.background = new THREE.Color(0x090b1e);
      scene.fog = new THREE.FogExp2(0x090b1e, 0.04);
      ambient.color.setHex(0xd4af37);
      ambient.intensity = 0.8;
      directional.color.setHex(0xffedd5);
      directional.intensity = 2.4;
      haloPoint.color.setHex(0xf59e0b);
      haloPoint.intensity = 3.8;
    } else if (lightingPreset === "aarti") {
      scene.background = new THREE.Color(0x0c0406);
      scene.fog = new THREE.FogExp2(0x0c0406, 0.048);
      ambient.color.setHex(0xe11d48);
      ambient.intensity = 0.7;
      directional.color.setHex(0xfbbf24);
      directional.intensity = 2.6;
      haloPoint.color.setHex(0xe11d48);
      haloPoint.intensity = 4.2;
    }
  }, [lightingPreset]);

  // Update camera view target
  useEffect(() => {
    if (cameraView === "sanctum") {
      targetCamPos.current.set(0, 2.1, 5.6);
    } else if (cameraView === "wide") {
      targetCamPos.current.set(0, 2.8, 9.2);
    } else if (cameraView === "river") {
      targetCamPos.current.set(0, 0.8, 4.2);
    }
  }, [cameraView]);

  return (
    <div className="relative w-full h-full min-h-[550px] lg:min-h-[720px] overflow-hidden select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Atmospheric Vignette & Volumetric Lighting Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030714] via-transparent to-[#030714]/60" />
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#030714]/20 to-[#030714]/80" />

      {/* Divine Golden God Rays Overlay */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none rounded-full opacity-40 blur-3xl"
        style={{
          background:
            lightingPreset === "aarti"
              ? "radial-gradient(circle, rgba(225,29,72,0.45) 0%, rgba(212,175,55,0.2) 50%, transparent 80%)"
              : lightingPreset === "dawn"
              ? "radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(212,175,55,0.18) 45%, transparent 75%)"
              : "radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(212,175,55,0.22) 50%, transparent 80%)",
        }}
      />

      {/* Interactive Controls Overlay Bar */}
      {interactiveMode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 rounded-full glass-panel-gold border border-[#d4af37]/30 shadow-2xl backdrop-blur-md">
          {/* Lighting Mode Presets */}
          <div className="flex items-center gap-1 pr-2 border-r border-[#d4af37]/30 text-xs">
            <span className="text-[#d4af37]/70 font-mono text-[10px] uppercase tracking-wider hidden sm:inline mr-1">
              Dawn Light:
            </span>
            <button
              onClick={() => setLightingPreset("dawn")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
                lightingPreset === "dawn"
                  ? "bg-[#38bdf8]/20 text-[#7dd3fc] border border-[#38bdf8]/40 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="4:00 AM Mystical Dawn"
            >
              <Moon className="w-3 h-3 text-[#38bdf8]" />
              <span className="hidden sm:inline">Dawn (৪টা)</span>
            </button>
            <button
              onClick={() => setLightingPreset("sunrise")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
                lightingPreset === "sunrise"
                  ? "bg-[#d4af37]/25 text-[#fde047] border border-[#d4af37]/50 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Golden Sunrise"
            >
              <Sun className="w-3 h-3 text-[#f59e0b]" />
              <span>Sunrise</span>
            </button>
            <button
              onClick={() => setLightingPreset("aarti")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
                lightingPreset === "aarti"
                  ? "bg-[#e11d48]/25 text-[#fda4af] border border-[#e11d48]/50 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Midnight Aarti"
            >
              <Flame className="w-3 h-3 text-[#f43f5e]" />
              <span>Aarti (আরতি)</span>
            </button>
          </div>

          {/* Camera View Switcher */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#d4af37]/70 font-mono text-[10px] uppercase tracking-wider hidden sm:inline mr-1">
              View:
            </span>
            <button
              onClick={() => setCameraView("sanctum")}
              className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                cameraView === "sanctum"
                  ? "bg-[#d4af37]/30 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sanctum
            </button>
            <button
              onClick={() => setCameraView("river")}
              className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                cameraView === "river"
                  ? "bg-[#d4af37]/30 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Ghat River
            </button>
            <button
              onClick={() => setCameraView("wide")}
              className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                cameraView === "wide"
                  ? "bg-[#d4af37]/30 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Panorama
            </button>
          </div>
        </div>
      )}

      {/* Loading state indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#030714] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" />
            <span className="font-bengali text-[#d4af37] text-sm tracking-widest animate-pulse">
              দেবী মহামায়ার আবির্ভাব রূপায়ণ...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
