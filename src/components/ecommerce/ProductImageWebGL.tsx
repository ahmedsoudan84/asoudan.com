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

export default function ProductImageWebGL({
  src,
  alt,
  fallbackSeed,
  enableWebGL = true,
  className = "",
}: ProductImageWebGLProps) {
  const [webglSupported, setWebglSupported] = useState(false);
  const [failed, setFailed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enableWebGL) return;

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setWebglSupported(!!gl);
  }, [enableWebGL]);

  if (enableWebGL && webglSupported) {
    return <WebGLFoodReveal src={src} alt={alt} className="w-full" />;
  }

  const seed = encodeURIComponent(fallbackSeed || alt || "product");
  const resolvedSrc = failed
    ? `https://picsum.photos/seed/${seed}/1200/1200`
    : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${className}`.trim()}
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
}
