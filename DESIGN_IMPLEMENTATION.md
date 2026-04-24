# Design Implementation: Advanced UI Features

## Overview
This document outlines the implementation of advanced UI features for the portfolio project, combining WebGL, 360° panoramas, parallax scrolling, and aurora effects.

## 1. WebGL Food Reveal on Hover

### Concept
A shader-based reveal effect that uses WebGL/GLSL to create a fluid, organic transition on food images when hovered.

### Implementation

```tsx
// components/WebGLFoodReveal.tsx
"use client";
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface FoodRevealProps {
  imageUrl: string;
  alt: string;
}

export default function WebGLFoodReveal({ imageUrl, alt }: FoodRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Custom shader material for reveal effect
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_progress;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        vec2 mouse = u_mouse;
        
        // Distance from mouse
        float dist = distance(uv, mouse);
        
        // Ripple effect
        float ripple = sin(dist * 20.0 - u_time * 5.0) * 0.02;
        
        // Reveal mask
        float mask = smoothstep(
          u_progress * 1.5 - 0.2 + ripple,
          u_progress * 1.5 + ripple,
          dist
        );
        
        // Color shift effect
        vec4 color = texture2D(u_texture, uv);
        vec4 colorShift = texture2D(u_texture, uv + vec2(ripple * 0.01, 0.0));
        
        gl_FragColor = mix(color, colorShift, mask * 0.3);
        gl_FragColor.a = 1.0;
      }
    `;

    const texture = new THREE.TextureLoader().load(imageUrl);
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: texture },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_time: { value: 0 },
        u_progress: { value: 0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height
      };
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    let targetProgress = 0;
    let currentProgress = 0;

    const handleMouseEnter = () => {
      targetProgress = 1;
    };

    const handleMouseLeave = () => {
      targetProgress = 0;
    };

    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;
      
      // Smooth progress interpolation
      currentProgress += (targetProgress - currentProgress) * 0.1;
      
      material.uniforms.u_time.value = time;
      material.uniforms.u_progress.value = currentProgress;
      material.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      renderer.dispose();
    };
  }, [imageUrl]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-80 rounded-xl overflow-hidden cursor-pointer"
      style={{ background: 'var(--bg-secondary)' }}
    />
  );
}
```

### Usage
```tsx
import WebGLFoodReveal from '@/components/WebGLFoodReveal';

<WebGLFoodReveal 
  imageUrl="/images/food/dish-01.jpg" 
  alt="Artisanal pasta dish" 
/>
```

## 2. Embedded 360° Pano on Property Detail

### Concept
Interactive 360° panorama viewer using Photo Sphere Viewer library with custom UI for real estate properties.

### Implementation

```tsx
// components/PanoViewer360.tsx
"use client";
import { useEffect, useRef } from 'react';
import PhotoSphereViewer from 'photo-sphere-viewer';
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

interface PanoMarker {
  id: string;
  latitude: number;
  longitude: number;
  tooltip: string;
  image: string;
}

interface PanoViewer360Props {
  imageUrl: string;
  markers?: PanoMarker[];
  height?: number;
}

export default function PanoViewer360({ 
  imageUrl, 
  markers = [],
  height = 500 
}: PanoViewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize viewer
    viewerRef.current = PhotoSphereViewer({
      container: containerRef.current,
      panorama: imageUrl,
      loadingImg: '/images/loading-sphere.gif',
      navbar: [
        'autorotate',
        'zoom',
        'download',
        'caption',
        'fullscreen'
      ].join(' '),
      plugins: [
        [MarkersPlugin, {
          markers: markers.map(m => ({
            id: m.id,
            latitude: m.latitude,
            longitude: m.longitude,
            tooltip: m.tooltip,
            image: m.image,
            width: 48,
            height: 48,
            anchor: 'bottom center'
          }))
        }]
      ],
      defaultLat: 0,
      defaultLong: 0,
      defaultFov: 90,
      minFov: 30,
      maxFov: 120,
      allowUserInteractions: true,
      moveSpeed: 5,
      zoomLevel: 0,
      time_anim: 0,
      useXmpData: false,
      sphereCorrection: { pan: 0, tilt: 0, roll: 0 }
    });

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
      .psv-container {
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      }
      .psv-navbar {
        background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
      }
      .psv-button {
        color: white !important;
      }
      .psv-marker {
        cursor: pointer;
        transition: transform 0.2s;
      }
      .psv-marker:hover {
        transform: scale(1.2);
      }
    `;
    document.head.appendChild(style);

    return () => {
      viewerRef.current?.destroy();
      document.head.removeChild(style);
    };
  }, [imageUrl, markers]);

  return (
    <div 
      className="relative rounded-2xl overflow-hidden"
      style={{ 
        height: `${height}px`,
        background: 'var(--bg-secondary)'
      }}
    >
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Loading overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 pointer-events-none" id="pano-loading">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Marker info popup */}
      <div className="hidden absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-4 z-50" id="marker-info">
        <h4 className="text-white font-semibold" id="marker-title"></h4>
        <p className="text-gray-300 text-sm mt-1" id="marker-description"></p>
      </div>
    </div>
  );
}
```

### Usage in Property Detail

```tsx
// app/buy/real-estate/listings/[slug]/PropertyDetailClient.tsx
"use client";
import { useState, useEffect } from 'react';
import PanoViewer360 from '@/components/PanoViewer360';

// Inside your PropertyDetailClient component:
const [activePanoIndex, setActivePanoIndex] = useState(0);

const panos = property.panoramas || [
  {
    id: 'living-room',
    imageUrl: property.images[0],
    markers: [
      {
        id: 'kitchen-door',
        latitude: 10,
        longitude: 45,
        tooltip: 'Kitchen',
        image: '/icons/door.svg'
      },
      {
        id: 'window-view',
        latitude: -5,
        longitude: -20,
        tooltip: 'Garden View',
        image: '/icons/window.svg'
      }
    ]
  }
];

return (
  <section className="mb-12">
    <h3 className="text-2xl font-bold mb-6 text-white">360° Virtual Tour</h3>
    
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <PanoViewer360
          imageUrl={panos[activePanoIndex].imageUrl}
          markers={panos[activePanoIndex].markers}
          height={500}
        />
      </div>
      
      <div className="space-y-3">
        {panos.map((pano, index) => (
          <button
            key={pano.id}
            onClick={() => setActivePanoIndex(index)}
            className={`w-full aspect-video rounded-lg overflow-hidden relative ${activePanoIndex === index ? 'ring-2 ring-cyan-400' : ''}`}
          >
            <Image
              src={pano.imageUrl}
              alt={`Pano ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  </section>
);
```

## 3. Scroll-Driven London Skyline Parallax

### Concept
Multi-layer parallax background with London landmarks that respond to scroll position with depth and atmospheric effects.

### Implementation

```tsx
// components/LondonSkylineParallax.tsx
"use client";
import { useRef, useEffect, useState } from 'react';

interface SkylineLayer {
  depth: number;
  buildings: Array<{
    x: number;
    width: number;
    height: number;
    opacity: number;
  }>;
}

export default function LondonSkylineParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Define landscape layers
  const layers: SkylineLayer[] = [
    {
      depth: 0.1,
      buildings: [
        { x: 5, width: 60, height: 200, opacity: 0.3 },
        { x: 20, width: 40, height: 150, opacity: 0.2 },
        { x: 40, width: 80, height: 180, opacity: 0.25 },
        { x: 65, width: 50, height: 160, opacity: 0.22 },
        { x: 85, width: 70, height: 190, opacity: 0.28 },
      ]
    },
    {
      depth: 0.3,
      buildings: [
        { x: 2, width: 45, height: 280, opacity: 0.5 },
        { x: 18, width: 55, height: 320, opacity: 0.55 },
        { x: 35, width: 35, height: 250, opacity: 0.45 },
        { x: 55, width: 75, height: 350, opacity: 0.6 },
        { x: 75, width: 50, height: 290, opacity: 0.5 },
        { x: 92, width: 40, height: 260, opacity: 0.48 },
      ]
    },
    {
      depth: 0.6,
      buildings: [
        { x: 0, width: 50, height: 400, opacity: 0.7 },
        { x: 15, width: 65, height: 450, opacity: 0.75 },
        { x: 32, width: 45, height: 380, opacity: 0.65 },
        { x: 50, width: 80, height: 500, opacity: 0.8 }, // The Shard
        { x: 70, width: 60, height: 420, opacity: 0.7 },
        { x: 88, width: 55, height: 360, opacity: 0.68 },
      ]
    },
    {
      depth: 1,
      buildings: [
        { x: 8, width: 70, height: 500, opacity: 0.9 }, // Landmark
        { x: 35, width: 90, height: 550, opacity: 0.95 }, // Big Ben
        { x: 65, width: 85, height: 520, opacity: 0.85 },
        { x: 90, width: 65, height: 480, opacity: 0.8 },
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #0a0c14 0%, #1a1d2e 30%, #0d1a28 60%, #0a0c14 100%)'
      }}
    >
      {/* Aurora background */}
      <AuroraBackground />
      
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle at 30% 30%, #f0f0f0 0%, #d0d0d0 40%, #a0a0a0 100%)',
          boxShadow: '0 0 60px rgba(255, 255, 255, 0.3)',
          top: '10%',
          right: '15%',
          transform: `translateY(${scrollY * 0.2}px)`
        }}
      />

      {/* Skyline layers */}
      {layers.map((layer, layerIndex) => {
        const parallaxOffset = scrollY * layer.depth;
        
        return (
          <div
            key={layerIndex}
            className="absolute bottom-0 w-full"
            style={{
              transform: `translateY(${parallaxOffset}px)`,
              height: '40vh',
              minHeight: '300px'
            }}
          >
            {layer.buildings.map((building, i) => (
              <Building
                key={i}
                {...building}
                depth={layer.depth}
              />
            ))}
          </div>
        );
      })}

      {/* Foreground fog */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(10,12,20,0.9) 0%, transparent 100%)',
          transform: `translateY(${scrollY * 0.05}px)`
        }}
      />

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

function Building({ 
  x, width, height, opacity, depth 
}: {
  x: number;
  width: number;
  height: number;
  opacity: number;
  depth: number;
}) {
  const isLandmark = height > 450;
  const windows = Math.floor(height / 25);

  return (
    <div
      className="absolute bottom-0"
      style={{
        left: `${x}%`,
        width: `${width}%`,
        height: `${height}px`,
        opacity,
        background: isLandmark
          ? `linear-gradient(to top, #1a2a3a 0%, #2a3a4a 30%, #3a4a5a 100%)`
          : `linear-gradient(to top, #0a0c14 0%, #1a1d2e 50%, #2a2d42 100%)`,
        boxShadow: `
          ${isLandmark ? '0 0 30px rgba(0, 241, 241, 0.2)' : ''},
          inset -10px 0 20px rgba(0,0,0,0.3),
          inset 10px 0 20px rgba(255,255,255,0.05)
        `,
        borderRadius: `${depth * 2}px ${depth * 2}px 0 0`,
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 10%, 95% 0%, 50% 5%, 5% 0%, 0% 10%)'
      }}
    >
      {/* Windows */}
      <div className="absolute inset-0 flex flex-wrap content-between p-2">
        {[...Array(Math.min(windows, 20))].map((_, wi) => (
          <div
            key={wi}
            className="flex items-center justify-center"
            style={{
              width: '20%',
              height: '15%',
              opacity: Math.random() * 0.6 + 0.2
            }}
          >
            <div
              className="rounded-sm"
              style={{
                width: '60%',
                height: '60%',
                background: `rgba(255, 255, 200, ${Math.random() * 0.5 + 0.3})`,
                boxShadow: '0 0 8px rgba(255, 255, 200, 0.3)'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Landmark highlight */}
      {isLandmark && (
        <div
          className="absolute top-0 left-0 right-0 rounded-t"
          style={{
            height: '20px',
            background: 'linear-gradient(to right, transparent, rgba(0, 241, 241, 0.3), transparent)',
            animation: 'glow 3s ease-in-out infinite'
          }}
        />
      )}
    </div>
  );
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(0, 241, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, rgba(123, 97, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 70%, rgba(0, 241, 241, 0.08) 0%, transparent 40%)
          `,
          animation: 'aurora 20s ease-in-out infinite',
          backgroundSize: '200% 200%'
        }}
      />
      
      <div 
        className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] opacity-20"
        style={{
          background: `
            radial-gradient(circle at 70% 60%, rgba(123, 97, 255, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 30% 80%, rgba(0, 241, 241, 0.08) 0%, transparent 30%)
          `,
          filter: 'blur(60px)',
          animation: 'aurora 25s ease-in-out infinite reverse',
          backgroundSize: '200% 200%'
        }}
      />
    </div>
  );
}
```

### Usage

```tsx
// app/layout.tsx or specific page
import LondonSkylineParallax from '@/components/LondonSkylineParallax';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LondonSkylineParallax />
        {children}
      </body>
    </html>
  );
}
```

## 4. Accent Auroras Instead of Blur Orbs

### Implementation

```tsx
// components/AuroraEffect.tsx
"use client";
import { useRef, useEffect } from 'react';

interface AuroraEffectProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export default function AuroraEffect({
  className = '',
  colors = ['#00F1F1', '#7B61FF', '#00FF88'],
  speed = 1
}: AuroraEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Auroras configuration
    const auroras = colors.map((color, index) => ({
      color,
      y: height * (0.1 + index * 0.15),
      amplitude: 80 + Math.random() * 60,
      frequency: 0.002 + Math.random() * 0.002,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.3,
      opacity: 0.15 + Math.random() * 0.15,
      segments: 200
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      auroras.forEach((a, i) => {
        a.y = height * (0.1 + i * 0.15);
      });
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01 * speed;

      auroras.forEach((aurora) => {
        // Create gradient
        const gradient = ctx.createLinearGradient(0, aurora.y - aurora.amplitude, 0, aurora.y + aurora.amplitude);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, aurora.color + Math.floor(aurora.opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(0, height);

        // Draw wave with multiple layers for depth
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          ctx.moveTo(0, aurora.y);

          for (let x = 0; x <= width; x += width / aurora.segments) {
            const y = aurora.y +
              Math.sin(x * aurora.frequency + time * aurora.speed + aurora.phase) * aurora.amplitude * (0.5 + layer * 0.3) +
              Math.sin(x * aurora.frequency * 2.3 + time * aurora.speed * 0.7) * aurora.amplitude * 0.2;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();

          const layerGradient = ctx.createLinearGradient(0, aurora.y - aurora.amplitude, 0, aurora.y + aurora.amplitude);
          const layerOpacity = aurora.opacity * (0.5 - layer * 0.15);
          layerGradient.addColorStop(0, 'transparent');
          layerGradient.addColorStop(0.5, aurora.color + Math.floor(layerOpacity * 255).toString(16).padStart(2, '0'));
          layerGradient.addColorStop(1, 'transparent');

          ctx.fillStyle = layerGradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
```

### Usage

```tsx
// In any page or layout
import AuroraEffect from '@/components/AuroraEffect';

function Page() {
  return (
    <div className="relative min-h-screen bg-slate-900">
      <AuroraEffect 
        colors={['#00F1F1', '#7B61FF', '#00FF88']}
        speed={0.8}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white">Content with Aurora</h1>
      </div>
    </div>
  );
}
```

### Integration with Global Styles

```css
/* Add to globals.css */
.aurora-container {
  position: relative;
  overflow: hidden;
}

.aurora-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 241, 241, 0.03) 30%,
    rgba(123, 97, 255, 0.02) 60%,
    transparent 100%
  );
  pointer-events: none;
}
```

## 5. Twelve Things You Can Ship in a Single Afternoon

Based on the design requirements, here are 12 implementable features (excluding items 07, 08):

### 1. WebGL Food Reveal Effect ✅
- **Implementation**: Custom GLSL shader with mouse-driven ripples
- **Time**: 2-3 hours
- **Difficulty**: Medium (requires WebGL knowledge)

### 2. 360° Property Panorama Viewer ✅
- **Implementation**: Photo Sphere Viewer with custom markers
- **Time**: 2-3 hours
- **Difficulty**: Easy-Medium (library integration)

### 3. London Skyline Parallax ✅
- **Implementation**: Multi-layer SVG buildings with scroll-driven depth
- **Time**: 3-4 hours
- **Difficulty**: Medium (scroll performance optimization)

### 4. Aurora Background Effects ✅
- **Implementation**: Canvas-based procedural aurora generation
- **Time**: 2 hours
- **Difficulty**: Medium (shader math in JS)

### 5. Micro-interaction Button System
- **Implementation**: Hover/press states with spring physics
- **Time**: 1-2 hours
- **Difficulty**: Easy

```tsx
export function MagicButton({ children, onClick }: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setPressed(true)}
      onHoverEnd={() => setPressed(false)}
      className="relative overflow-hidden px-8 py-4 rounded-full"
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        animate={{ scale: pressed ? 1.5 : 1 }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30"
      />
    </motion.button>
  );
}
```

### 6. Staggered List Reveal
- **Implementation**: Intersection Observer with staggered animations
- **Time**: 1 hour
- **Difficulty**: Easy

```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
```

### 9. Typography Scale System
- **Implementation**: Fluid type tokens with clamp()
- **Time**: 1 hour
- **Difficulty**: Easy

```css
:root {
  --text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.3vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
}
```

### 10. Dark Mode Toggle
- **Implementation**: Context provider with localStorage persistence
- **Time**: 1-2 hours
- **Difficulty**: Easy

```tsx
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

### 11. Reduced Motion Detection
- **Implementation**: Media query listener with context
- **Time**: 30 minutes
- **Difficulty**: Easy

```tsx
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', handler);
    
    return () => query.removeEventListener('change', handler);
  }, []);
  
  return reduced;
}
```

### 12. Loading Skeleton System
- **Implementation**: Animated gradient shimmer
- **Time**: 1 hour
- **Difficulty**: Easy

```css
.skeleton {
  background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Performance Considerations

### WebGL & Canvas Optimizations
- Use `requestAnimationFrame` for smooth 60fps animations
- Implement object pooling for particle systems
- Debounce scroll/resize handlers
- Use `will-change` property judiciously
- Dispose of Three.js resources on unmount

### Scroll Performance
- Use passive event listeners
- Throttle scroll-driven calculations
- Consider Intersection Observer for element visibility
- Use `transform` and `opacity` for animations (GPU-accelerated)

### Memory Management
- Clean up event listeners
- Dispose of WebGL contexts
- Remove DOM references
- Implement cleanup in useEffect returns

## Browser Support

All features designed with modern browser support in mind:
- WebGL 2.0 (fallback to 1.0 if needed)
- ES6+ JavaScript
- CSS custom properties
- CSS Grid/Flexbox
- Canvas API
- Intersection Observer
- Match Media API

## Accessibility

- Respect `prefers-reduced-motion`
- Provide ARIA labels for interactive elements
- Ensure sufficient color contrast
- Keyboard navigation support
- Screen reader compatibility
- Focus management