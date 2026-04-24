"use client";
import React, { useState, useRef, useEffect } from "react";
import WebGLFoodReveal from "@/components/WebGLFoodReveal";

interface ProductImageWebGLProps {
  src: string;
  alt: string;
  fallbackSeed?: string;
  enableWebGL?: boolean;
  className?: string;
}

/**
 * Product image with optional WebGL food reveal effect on hover.
 * Falls back to standard image if WebGL is not supported or disabled.
 */
export default function ProductImageWebGL({
  src,
  alt,
  fallbackSeed,
  enableWebGL = true,
  className = "",
}: ProductImageWebGLProps) {
  const [webglSupported, setWebglSupported] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enableWebGL) return;
    
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setWebglSupported(!!gl);
  }, [enableWebGL]);

  // Use WebGL reveal if supported and enabled
  if (enableWebGL && webglSupported) {
    return <WebGLFoodReveal src={src} alt={alt} className="w-full" />;
  }

  // Fallback to standard image
  const [failed, setFailed] = useState(false);
  const seed = encodeURIComponent(fallbackSeed || alt || "product");
  const resolvedSrc = failed
    ? `https://picsum.photos/seed/${seed}/1200/1200`
    : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${className}`.trim()}
      onError={(e) => {
        if (!failed) setFailed(true);
      }}
    />
  );
}
