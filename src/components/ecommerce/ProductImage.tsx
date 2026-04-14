"use client";

import React, { useState } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Stable seed for the picsum fallback. Defaults to the alt text. */
  fallbackSeed?: string;
}

/**
 * An <img> that swaps to a seeded picsum placeholder if its source fails to
 * load (or is blocked by hot-link rules). Keeps the grid looking polished
 * even when an Unsplash URL 404s.
 */
export default function ProductImage({
  src,
  alt = "",
  fallbackSeed,
  onError,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);
  const seed = encodeURIComponent(fallbackSeed ?? alt ?? "product");
  const resolvedSrc = failed
    ? `https://picsum.photos/seed/${seed}/1200/1200`
    : src;

  return (
    <img
      {...rest}
      src={resolvedSrc}
      alt={alt}
      onError={(e) => {
        if (!failed) setFailed(true);
        onError?.(e);
      }}
    />
  );
}
