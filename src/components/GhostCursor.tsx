"use client";

import { useEffect, useRef, useMemo, type CSSProperties } from "react";
import * as THREE from "three";
import "./GhostCursor.css";

type Props = {
  className?: string;
  style?: CSSProperties;
  trailLength?: number;
  inertia?: number;
  brightness?: number;
  color?: string;
  fadeDelayMs?: number;
  fadeDurationMs?: number;
  zIndex?: number;
};

const GhostCursor = ({
  className,
  style,
  trailLength = 30,
  inertia = 0.5,
  brightness = 1.2,
  color = "#10b981", // O nosso Verde Esmeralda por defeito!
  fadeDelayMs = 1000,
  fadeDurationMs = 1500,
  zIndex = 10,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const fragmentShader = `
    uniform float iTime;
    uniform vec3  iResolution;
    uniform vec2  iMouse;
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform vec3  iBaseColor;
    uniform float iBrightness;
    varying vec2  vUv;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f *= f * (3. - 2. * f);
      return mix(mix(hash(i+vec2(0,0)), hash(i+vec2(1,0)), f.x),
                 mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
    }
    float fbm(vec2 p){
      float v = 0.0; float a = 0.5;
      for(int i=0;i<5;i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
      return v;
    }

    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {
      vec2 q = vec2(fbm(p + iTime * 0.1), fbm(p + vec2(5.2,1.3) + iTime * 0.1));
      float smoke = fbm(p + q * 0.8);
      float radius = 0.5;
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));
      float alpha = pow(smoke, 2.5) * distFactor;
      return vec4(iBaseColor * alpha * intensity, alpha * intensity);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      vec3 colorAcc = vec3(0.0);
      float alphaAcc = 0.0;
      vec4 b = blob(uv, mouse, 1.0, iOpacity);
      colorAcc += b.rgb; alphaAcc += b.a;
      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
        t = pow(t, 2.0);
        if (t > 0.01) {
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);
          colorAcc += bt.rgb; alphaAcc += bt.a;
        }
      }
      colorAcc *= iBrightness;
      gl_FragColor = vec4(colorAcc, clamp(alphaAcc * iOpacity, 0.0, 1.0));
    }
  `;

  const vertexShader = `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
  `;

  const maxTrail = useMemo(() => Math.max(1, Math.floor(trailLength)), [trailLength]);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geom = new THREE.PlaneGeometry(2, 2);

    const trail = Array.from({ length: maxTrail }, () => new THREE.Vector2(0.5, 0.5));
    let head = 0;
    const baseColor = new THREE.Color(color);

    const material = new THREE.ShaderMaterial({
      defines: { MAX_TRAIL_LENGTH: maxTrail },
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: trail.map((v) => v.clone()) },
        iOpacity: { value: 1.0 },
        iBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },
        iBrightness: { value: brightness },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);

    let active = true;
    let raf = 0;
    let lastMove = performance.now();
    let pointerActive = false;
    const cur = new THREE.Vector2(0.5, 0.5);
    const tgt = new THREE.Vector2(0.5, 0.5);
    const vel = new THREE.Vector2();

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h, false);
      material.uniforms.iResolution.value.set(w, h, 1);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host); // Alterado para observar o host em vez do parent

    const start = performance.now();
    const animate = () => {
      if (!active) return;
      const now = performance.now();
      const t = (now - start) / 1000;

      if (pointerActive) {
        vel.set(tgt.x - cur.x, tgt.y - cur.y);
        cur.copy(tgt);
        material.uniforms.iOpacity.value = 1.0;
      } else {
        vel.multiplyScalar(inertia);
        if (vel.lengthSq() > 1e-6) cur.add(vel);
        const dt = now - lastMove;
        if (dt > fadeDelayMs) {
          const k = Math.min(1, (dt - fadeDelayMs) / fadeDurationMs);
          material.uniforms.iOpacity.value = Math.max(0, 1 - k);
        }
      }

      material.uniforms.iMouse.value.copy(cur);

      head = (head + 1) % trail.length;
      trail[head].copy(cur);
      const arr = material.uniforms.iPrevMouse.value as THREE.Vector2[];
      for (let i = 0; i < trail.length; i++) {
        const srcIdx = (head - i + trail.length) % trail.length;
        arr[i].copy(trail[srcIdx]);
      }
      material.uniforms.iTime.value = t;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    // Alterado para detetar rato na Window global (mais preciso e sem bugs de z-index)
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - (e.clientY / window.innerHeight);
      tgt.set(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)));
      pointerActive = true;
      lastMove = performance.now();
    };
    
    const onLeave = () => {
      pointerActive = false;
      lastMove = performance.now();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      ro.disconnect();
      geom.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement)
        renderer.domElement.parentElement.removeChild(renderer.domElement);
    };
  }, [color, brightness, inertia, fadeDelayMs, fadeDurationMs, maxTrail]);

  return <div ref={containerRef} className={`ghost-cursor ${className ?? ""}`} style={{ zIndex, ...style }} />;
};

export default GhostCursor;