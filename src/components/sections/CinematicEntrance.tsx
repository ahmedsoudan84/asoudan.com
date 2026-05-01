"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { HeroReel } from "./HeroReel";

/* ── Floating ambient particles ── */
const PARTICLES = [
  { x: "14%", y: "20%", size: 2,   dur: 13, delay: 0   },
  { x: "30%", y: "70%", size: 1.5, dur: 17, delay: 2.5 },
  { x: "46%", y: "38%", size: 2.5, dur: 15, delay: 1   },
  { x: "60%", y: "80%", size: 1.5, dur: 19, delay: 4   },
  { x: "72%", y: "24%", size: 2,   dur: 12, delay: 1.5 },
  { x: "82%", y: "57%", size: 3,   dur: 16, delay: 3   },
  { x: "90%", y: "32%", size: 1.5, dur: 21, delay: 0.5 },
  { x: "20%", y: "52%", size: 2,   dur: 14, delay: 5   },
  { x: "52%", y: "16%", size: 1.5, dur: 18, delay: 2   },
  { x: "64%", y: "67%", size: 2.5, dur: 13, delay: 3.5 },
  { x: "38%", y: "86%", size: 2,   dur: 20, delay: 1   },
  { x: "94%", y: "74%", size: 1.5, dur: 15, delay: 4.5 },
];

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: "rgba(61,155,155,0.9)",
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(61,155,155,0.3)`,
          }}
          animate={{ y: [-8, -24, -8], opacity: [0, 0.55, 0.3, 0.55, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Glitch text effect ── */
function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 opacity-0"
        style={{ color: "var(--accent)", clipPath: "inset(20% 0 40% 0)" }}
        animate={{ opacity: [0, 0.7, 0], x: [0, -3, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 8, delay: Math.random() * 5 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ── Encrypted text reveal ── */
function EncryptedReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 0.5;
      if (iteration > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [started, text]);

  return <span>{started ? displayed : ""}</span>;
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" as const } },
};

/* ── Name SVG with one-shot shimmer sweep ── */
function NameSVG() {
  return (
    <div className="relative overflow-hidden">
    <svg viewBox="0 0 222 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ fill: "currentColor" }}>
      <path d="M6.84375 38.024L24.874 2.394H33.994L51.835 42.294H42.145L27.553 7.068H31.201L20.8438 36.294C14.8438 35.794 8.9212 36.8611 6.84375 38.024ZM15.982 33.744L18.433 26.733H38.953L41.461 33.744H15.982Z" />
      <path d="M73.9867 11.172C76.4187 11.172 78.5846 11.666 80.4846 12.654C82.4227 13.604 83.9426 15.086 85.0447 17.1C86.1467 19.076 86.6977 21.622 86.6977 24.738V42.294H77.8057V26.106C77.8057 23.636 77.2546 21.812 76.1526 20.634C75.0886 19.456 73.5686 18.867 71.5927 18.867C70.1867 18.867 68.9137 19.171 67.7737 19.779C66.6717 20.349 65.7977 21.242 65.1517 22.458C64.5437 23.674 64.2397 25.232 64.2397 27.132V42.294H55.3477V0H64.2397V20.121L62.2447 17.556C63.3467 15.504 64.9237 13.927 66.9757 12.825C69.0277 11.723 71.3647 11.172 73.9867 11.172Z" />
      <path d="M134.031 11.172C136.463 11.172 138.61 11.666 140.472 12.654C142.372 13.604 143.854 15.086 144.918 17.1C146.02 19.076 146.571 21.622 146.571 24.738V37.294H137.679V26.106C137.679 23.636 137.166 21.812 136.14 20.634C135.114 19.456 133.67 18.867 131.808 18.867C130.516 18.867 129.357 19.171 128.331 19.779C127.305 20.349 126.507 21.223 125.937 22.401C125.367 23.579 125.082 25.08 125.082 26.904V42.294H116.19V26.106C116.19 23.636 115.677 21.812 114.651 20.634C113.663 19.456 112.238 18.867 110.376 18.867C109.084 18.867 107.925 19.171 106.899 19.779C105.873 20.349 105.075 21.223 104.505 22.401C103.935 23.579 103.65 25.08 103.65 26.904V42.294H94.7578V11.628H103.251V20.007L101.655 17.556C102.719 15.466 104.22 13.889 106.158 12.825C108.134 11.723 110.376 11.172 112.884 11.172C115.696 11.172 118.147 11.894 120.237 13.338C122.365 14.744 123.771 16.91 124.455 19.836L121.32 18.981C122.346 16.587 123.98 14.687 126.222 13.281C128.502 11.875 131.105 11.172 134.031 11.172Z" />
      <path d="M169.983 42.75C166.487 42.75 163.409 42.066 160.749 40.698C158.127 39.33 156.094 37.468 154.65 35.112C153.206 32.718 152.484 30.001 152.484 26.961C152.484 23.883 153.187 21.166 154.593 18.81C156.037 16.416 157.994 14.554 160.464 13.224C162.934 11.856 165.727 11.172 168.843 11.172C171.845 11.172 174.543 11.818 176.937 13.11C179.369 14.364 181.288 16.188 182.694 18.582C184.1 20.938 184.803 23.769 184.803 27.075C184.803 27.417 184.784 27.816 184.746 28.272C184.708 28.69 184.67 29.089 184.632 29.469H159.723V24.282H179.958L176.538 25.821C176.538 24.225 176.215 22.838 175.569 21.66C174.923 20.482 174.03 19.57 172.89 18.924C171.75 18.24 170.42 17.898 168.9 17.898C167.38 17.898 166.031 18.24 164.853 18.924C163.713 19.57 162.82 20.501 162.174 21.717C161.528 22.895 161.205 24.301 161.205 25.935V27.303C161.205 28.975 161.566 30.457 162.288 31.749C163.048 33.003 164.093 33.972 165.423 34.656C166.791 35.302 168.387 35.625 170.211 35.625C171.845 35.625 173.27 35.378 174.486 34.884C175.74 34.39 176.88 33.649 177.906 32.661L182.637 37.791C181.231 39.387 179.464 40.622 177.336 41.496C175.208 42.332 172.757 42.75 169.983 42.75Z" />
      <path d="M203.89 42.75C201.002 42.75 198.399 42.104 196.081 40.812C193.763 39.482 191.92 37.639 190.552 35.283C189.222 32.927 188.557 30.153 188.557 26.961C188.557 23.731 189.222 20.938 190.552 18.582C191.92 16.226 193.763 14.402 196.081 13.11C198.399 11.818 201.002 11.172 203.89 11.172C206.474 11.172 208.735 11.742 210.673 12.882C212.611 14.022 214.112 15.751 215.176 18.069C216.24 20.387 216.772 23.351 216.772 26.961C216.772 30.533 216.259 33.497 215.233 35.853C214.207 38.171 212.725 39.9 210.787 41.04C208.887 42.18 206.588 42.75 203.89 42.75ZM205.429 35.454C206.873 35.454 208.184 35.112 209.362 34.428C210.54 33.744 211.471 32.775 212.155 31.521C212.877 30.229 213.238 28.709 213.238 26.961C213.238 25.175 212.877 23.655 212.155 22.401C211.471 21.147 210.54 20.178 209.362 19.494C208.184 18.81 206.873 18.468 205.429 18.468C203.947 18.468 202.617 18.81 201.439 19.494C200.261 20.178 199.311 21.147 198.589 22.401C197.905 23.655 197.563 25.175 197.563 26.961C197.563 28.709 197.905 30.229 198.589 31.521C199.311 32.775 200.261 33.744 201.439 34.428C202.617 35.112 203.947 35.454 205.429 35.454ZM213.466 42.294V36.024L213.637 26.904L213.067 17.841V0H221.959V42.294H213.466Z" />
      <path d="M16.245 81.9789C13.053 81.9789 9.994 81.5609 7.068 80.7249C4.142 79.8509 1.786 78.7299 0 77.3619L3.135 70.4079C4.845 71.6239 6.859 72.6309 9.177 73.4289C11.533 74.1889 13.908 74.5689 16.302 74.5689C18.126 74.5689 19.589 74.3979 20.691 74.0559C21.831 73.6759 22.667 73.1629 23.199 72.5169C23.731 71.8709 23.997 71.1299 23.997 70.2939C23.997 69.2299 23.579 68.3939 22.743 67.7859C21.907 67.1399 20.805 66.6269 19.437 66.2469C18.069 65.8289 16.549 65.4489 14.877 65.1069C13.243 64.7269 11.59 64.2709 9.918 63.7389C8.284 63.2069 6.783 62.5229 5.415 61.6869C4.047 60.8509 2.926 59.7489 2.052 58.3809C1.216 57.0129 0.798 55.2649 0.798 53.1369C0.798 50.8569 1.406 48.7859 2.622 46.9239C3.876 45.0239 5.738 43.5229 8.208 42.4209C10.716 41.2809 13.851 40.7109 17.613 40.7109C20.121 40.7109 22.591 41.0149 25.023 41.6229C27.455 42.1929 29.602 43.0669 31.464 44.2449L28.614 51.2559C26.752 50.1919 24.89 49.4129 23.028 48.9189C21.166 48.3869 19.342 48.1209 17.556 48.1209C15.77 48.1209 14.307 48.3299 13.167 48.7479C12.027 49.1659 11.21 49.7169 10.716 50.4009C10.222 51.0469 9.975 51.8069 9.975 52.6809C9.975 53.7069 10.393 54.5429 11.229 55.1889C12.065 55.7969 13.167 56.2909 14.535 56.6709C15.903 57.0509 17.404 57.4309 19.038 57.8109C20.71 58.1909 22.363 58.6279 23.997 59.1219C25.669 59.6159 27.189 60.2809 28.557 61.1169C29.925 61.9529 31.027 63.0549 31.863 64.4229C32.737 65.7909 33.174 67.5199 33.174 69.6099C33.174 71.8519 32.547 73.9039 31.293 75.7659C30.039 77.6279 28.158 79.1289 25.65 80.2689C23.18 81.4089 20.045 81.9789 16.245 81.9789Z" />
      <path d="M53.4486 81.7509C50.1806 81.7509 47.2736 81.0669 44.7276 79.6989C42.2196 78.3309 40.2246 76.4689 38.7426 74.1129C37.2986 71.7189 36.5766 69.0019 36.5766 65.9619C36.5766 62.8839 37.2986 60.1669 38.7426 57.8109C40.2246 55.4169 42.2196 53.5549 44.7276 52.2249C47.2736 50.8569 50.1806 50.1729 53.4486 50.1729C56.6786 50.1729 59.5666 50.8569 62.1126 52.2249C64.6586 53.5549 66.6536 55.3979 68.0976 57.7539C69.5416 60.1099 70.2636 62.8459 70.2636 65.9619C70.2636 69.0019 69.5416 71.7189 68.0976 74.1129C66.6536 76.4689 64.6586 78.3309 62.1126 79.6989C59.5666 81.0669 56.6786 81.7509 53.4486 81.7509ZM53.4486 74.4549C54.9306 74.4549 56.2606 74.1129 57.4386 73.4289C58.6166 72.7449 59.5476 71.7759 60.2316 70.5219C60.9156 69.2299 61.2576 67.7099 61.2576 65.9619C61.2576 64.1759 60.9156 62.6559 60.2316 61.4019C59.5476 60.1479 58.6166 59.1789 57.4386 58.4949C56.2606 57.8109 54.9306 57.4689 53.4486 57.4689C51.9666 57.4689 50.6366 57.8109 49.4586 58.4949C48.2806 59.1789 47.3306 60.1479 46.6086 61.4019C45.9246 62.6559 45.5826 64.1759 45.5826 65.9619C45.5826 67.7099 45.9246 69.2299 46.6086 70.5219C47.3306 71.7759 48.2806 72.7449 49.4586 73.4289C50.6366 74.1129 51.9666 74.4549 53.4486 74.4549Z" />
      <path d="M89.1462 81.7509C86.6002 81.7509 84.3202 81.2569 82.3062 80.2689C80.3302 79.2809 78.7912 77.7799 77.6892 75.7659C76.5872 73.7139 76.0362 71.1109 76.0362 67.9569V50.6289H84.9282V66.6459C84.9282 69.1919 85.4602 71.0729 86.5242 72.2889C87.6262 73.4669 89.1652 74.0559 91.1412 74.0559C92.5092 74.0559 93.7252 73.7709 94.7892 73.2009C95.8532 72.5929 96.6892 71.6809 97.2972 70.4649C97.9052 69.2109 98.2092 67.6529 98.2092 65.7909V50.6289H107.101V81.2949H98.6652V72.8589L100.204 75.3099C99.1782 77.4379 97.6582 79.0529 95.6442 80.1549C93.6682 81.2189 91.5022 81.7509 89.1462 81.7509Z" />
      <path d="M128.506 81.7509C125.618 81.7509 123.015 81.1049 120.697 79.8129C118.379 78.4829 116.536 76.6399 115.168 74.2839C113.838 71.9279 113.173 69.1539 113.173 65.9619C113.173 62.7319 113.838 59.9389 115.168 57.5829C116.536 55.2269 118.379 53.4029 120.697 52.1109C123.015 50.8189 125.618 50.1729 128.506 50.1729C131.09 50.1729 133.351 50.7429 135.289 51.8829C137.227 53.0229 138.728 54.7519 139.792 57.0699C140.856 59.3879 141.388 62.3519 141.388 65.9619C141.388 69.5339 140.875 72.4979 139.849 74.8539C138.823 77.1719 137.341 78.9009 135.403 80.0409C133.503 81.1809 131.204 81.7509 128.506 81.7509ZM130.045 74.4549C131.489 74.4549 132.8 74.1129 133.978 73.4289C135.156 72.7449 136.087 71.7759 136.771 70.5219C137.493 69.2299 137.854 67.7099 137.854 65.9619C137.854 64.1759 137.493 62.6559 136.771 61.4019C136.087 60.1479 135.156 59.1789 133.978 58.4949C132.8 57.8109 131.489 57.4689 130.045 57.4689C128.563 57.4689 127.233 57.8109 126.055 58.4949C124.877 59.1789 123.927 60.1479 123.205 61.4019C122.521 62.6559 122.179 64.1759 122.179 65.9619C122.179 67.7099 122.521 69.2299 123.205 70.5219C123.927 71.7759 124.877 72.7449 126.055 73.4289C127.233 74.1129 128.563 74.4549 130.045 74.4549ZM138.082 81.2949V75.0249L138.253 65.9049L137.683 56.8419V40.2949H146.847L146.575 81.2949H138.082Z" />
      <path d="M173.615 81.2949V75.3099L173.045 73.9989V63.2829C173.045 61.3829 172.456 59.9009 171.278 58.8369C170.138 57.7729 168.371 57.2409 165.977 57.2409C164.343 57.2409 162.728 57.5069 161.132 58.0389C159.574 58.5329 158.244 59.2169 157.142 60.0909L153.95 53.8779C155.622 52.6999 157.636 51.7879 159.992 51.1419C162.348 50.4959 164.742 50.1729 167.174 50.1729C171.848 50.1729 175.477 51.2749 178.061 53.4789C180.645 55.6829 181.937 59.1219 181.937 63.7959V81.2949H173.615ZM164.267 81.7509C161.873 81.7509 159.821 81.3519 158.111 80.5539C156.401 79.7179 155.09 78.5969 154.178 77.1909C153.266 75.7849 152.81 74.2079 152.81 72.4599C152.81 70.6359 153.247 69.0399 154.121 67.6719C155.033 66.3039 156.458 65.2399 158.396 64.4799C160.334 63.6819 162.861 63.2829 165.977 63.2829H174.128V68.4699H166.946C164.856 68.4699 163.412 68.8119 162.614 69.4959C161.854 70.1799 161.474 71.0349 161.474 72.0609C161.474 73.2009 161.911 74.1129 162.785 74.7969C163.697 75.4429 164.932 75.7659 166.49 75.7659C167.972 75.7659 169.302 75.4239 170.48 74.7399C171.658 74.0179 172.513 72.9729 173.045 71.6049L174.413 75.7089C173.767 77.6849 172.589 79.1859 170.879 80.2119C169.169 81.2379 166.965 81.7509 164.267 81.7509Z" />
      <path d="M208.624 50.1729C211.056 50.1729 213.222 50.6669 215.122 51.6549C217.06 52.6049 218.58 54.0869 219.682 56.1009C220.784 58.0769 221.335 60.6229 221.335 63.7389V81.2949H212.443V65.1069C212.443 62.6369 211.892 60.8129 210.79 59.6349C209.726 58.4569 208.206 57.8679 206.23 57.8679C204.824 57.8679 203.551 58.1719 202.411 58.7799C201.309 59.3499 200.435 60.2429 199.789 61.4589C199.181 62.6749 198.877 64.2329 198.877 66.1329V81.2949H189.985V50.6289H198.478V59.1219L196.882 56.5569C197.984 54.5049 199.561 52.9279 201.613 51.8259C203.665 50.7239 206.002 50.1729 208.624 50.1729Z" />
    </svg>
    {/* One-shot shimmer light sweep */}
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(105deg, transparent 25%, rgba(145,251,255,0.25) 50%, transparent 75%)",
        backgroundSize: "200% 100%",
      }}
      initial={{ backgroundPositionX: "-100%" }}
      animate={{ backgroundPositionX: "200%" }}
      transition={{ duration: 1.0, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
    />
    </div>
  );
}

export default function CinematicEntrance() {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax springs — text drifts with cursor, photo moves against it
  const pTx = useMotionValue(0); const sTx = useSpring(pTx, { stiffness: 80, damping: 28 });
  const pTy = useMotionValue(0); const sTy = useSpring(pTy, { stiffness: 80, damping: 28 });
  const pPx = useMotionValue(0); const sPx = useSpring(pPx, { stiffness: 55, damping: 22 });
  const pPy = useMotionValue(0); const sPy = useSpring(pPy, { stiffness: 55, damping: 22 });
  const lightX = useMotionValue(0); const sLx = useSpring(lightX, { stiffness: 50, damping: 30 });
  const lightY = useMotionValue(0); const sLy = useSpring(lightY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 2200);
    const t2 = setTimeout(() => setPhase(3), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    pTx.set(relX * 14);
    pTy.set(relY * 9);
    pPx.set(relX * -22);
    pPy.set(relY * -14);
    lightX.set(relX * rect.width * 0.2);
    lightY.set(relY * rect.height * 0.2);
  }, [pTx, pTy, pPx, pPy, lightX, lightY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="font-montserrat relative min-h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* ── Floating particles ── */}
      <FloatingParticles />

      {/* ── Vignette overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{
        background: "var(--bg-primary)",
        WebkitMaskImage: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
        maskImage: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
      }} />

      {/* ── Mouse-reactive light ── */}
      <motion.div
        className="pointer-events-none absolute z-10"
        style={{
          left: "50%",
          top: "50%",
          marginLeft: -300,
          marginTop: -300,
          x: sLx,
          y: sLy,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(61,155,155,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />

      {/* ── Subtle scan line ── */}
      <div
        className="pointer-events-none absolute left-0 w-full z-30"
        style={{
          top: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(145,251,255,0.15), transparent)",
          animation: "scanline 8s linear infinite",
          willChange: "transform",
        }}
      />

      {/* ── Phase 1 & 2: Mysterious Preloader ── */}
      <AnimatePresence>
        {phase < 3 && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "var(--bg-primary)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute rounded-full border border-[#3D9B9B]/20"
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: 300, height: 300, opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute rounded-full border border-[#3D9B9B]/10"
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: 500, height: 500, opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            />

            {/* Center line */}
            {phase === 1 && (
              <motion.div
                className="h-px bg-[#3D9B9B]"
                initial={{ width: 0, opacity: 0.8 }}
                animate={{ width: "60vw", opacity: 0.4 }}
                transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}

            {/* Encrypted name */}
            <motion.p
              className="mt-8 text-[11px] uppercase tracking-[10px] font-light"
              style={{ color: "var(--fg-20)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <EncryptedReveal text="AHMED SOUDAN" delay={500} />
            </motion.p>

            {/* Loading line */}
            <motion.div
              className="absolute bottom-[30%] left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#3D9B9B]/30 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "40vw" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phase 3: Hero Content ── */}
      {phase === 3 && (
        <div className="relative z-30 flex min-h-screen items-center">
          {/* Photo — full viewport, positioned to the right */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Breathing glow behind photo */}
            <div className="absolute inset-0 flex items-center justify-end">
              <motion.div
                className="w-[520px] h-[520px] lg:w-[740px] lg:h-[740px] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(61,155,155,0.14) 0%, rgba(61,155,155,0.05) 38%, transparent 70%)",
                  filter: "blur(90px)",
                  marginRight: "4%",
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Photo container — cinematic rising reveal */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center lg:justify-end"
              style={{ x: sPx, y: sPy, willChange: "transform" }}
              initial={{ clipPath: "inset(100% 0 0 0)", filter: "blur(12px)" }}
              animate={{ clipPath: "inset(0% 0 0 0)",   filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-[100vw] h-[90vh] max-w-[550px] lg:w-[50vw] lg:max-w-[700px] lg:h-[100vh] lg:mr-[5%] translate-y-[5%]">
                <Image
                  src="/images/ahmed-cutout.png"
                  alt="Ahmed Soudan"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_0_60px_rgba(61,155,155,0.08)]"
                  priority
                />
                <HeroReel />
              </div>
            </motion.div>

            {/* Blending overlays — solid bg-primary + mask for smooth theme transitions */}
            {/* Radial vignette — soft circular fade around photo */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "var(--bg-primary)",
                WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 55% 38%, transparent 35%, rgba(0,0,0,0.5) 60%, black 85%)",
                maskImage: "radial-gradient(ellipse 60% 55% at 55% 38%, transparent 35%, rgba(0,0,0,0.5) 60%, black 85%)",
              }}
            />
            {/* Bottom fade — dissolve shoulders/lower body */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
              style={{
                background: "var(--bg-primary)",
                WebkitMaskImage: "linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.6) 60%, transparent 100%)",
                maskImage: "linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.6) 60%, transparent 100%)",
              }}
            />
            {/* Left fade — text readability on mobile */}
            <div
              className="absolute inset-0 pointer-events-none lg:hidden"
              style={{
                background: "var(--bg-primary)",
                WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 30%, transparent 60%)",
                maskImage: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 30%, transparent 60%)",
              }}
            />
            {/* Left fade — desktop: solid on text area, then gentle fade */}
            <div
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{
                background: "var(--bg-primary)",
                WebkitMaskImage: "linear-gradient(to right, black 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.4) 35%, transparent 50%)",
                maskImage: "linear-gradient(to right, black 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.4) 35%, transparent 50%)",
              }}
            />
            {/* Right edge fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "var(--bg-primary)",
                WebkitMaskImage: "linear-gradient(to left, black 0%, rgba(0,0,0,0.7) 8%, transparent 20%)",
                maskImage: "linear-gradient(to left, black 0%, rgba(0,0,0,0.7) 8%, transparent 20%)",
              }}
            />
            {/* Top fade */}
            <div
              className="absolute top-0 left-0 right-0 h-[18%] pointer-events-none"
              style={{
                background: "var(--bg-primary)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
              }}
            />
          </div>

          {/* Text content — overlaid on photo */}
          <div className="relative mx-auto flex w-full max-w-7xl px-6 lg:px-16">
            <motion.div
              className="flex flex-1 flex-col justify-start lg:justify-center min-h-screen pt-20 pb-[128px] lg:pt-24 lg:pb-24 lg:max-w-[55%]"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ x: sTx, y: sTy, willChange: "transform" }}
            >
              {/* Name SVG — mobile */}
              <motion.div className="w-[240px] mb-2 lg:hidden" style={{ color: "var(--fg)" }} variants={slideUp}>
                <NameSVG />
              </motion.div>

              {/* Name SVG — desktop */}
              <motion.div className="hidden lg:block w-[440px] mb-2" style={{ color: "var(--fg)" }} variants={slideUp}>
                <NameSVG />
              </motion.div>

              {/* Title label with line + year counter */}
              <motion.div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mt-6" variants={slideUp}>
                <p className="text-[11px] font-semibold uppercase tracking-[5px]" style={{ color: "var(--accent)" }}>
                  Product Designer <span style={{ color: "var(--fg-30)" }}> · </span> 22 yrs
                </p>
                <div className="w-12 h-px" style={{ background: "var(--accent)" }} />
              </motion.div>

              {/* Spacer — pushes bio & buttons to bottom on mobile */}
              <div className="flex-1 lg:hidden" />

              {/* Bio with accent highlights */}
              <motion.div className="mt-8 lg:mt-8 max-w-md relative" variants={fadeIn}>
                <div className="border-l-2 pl-5" style={{ borderColor: "var(--accent)", opacity: 0.5 }}>
                  <p className="text-[15px] leading-[1.65]" style={{ color: "var(--fg-60)" }}>
                    <span style={{ color: "var(--accent)", textShadow: "0 0 20px rgba(var(--accent-rgb), 0.35)" }}>22 years</span> crafting digital experiences — from architecture to product design. <span style={{ color: "var(--accent)", textShadow: "0 0 20px rgba(var(--accent-rgb), 0.35)" }}>300+ projects</span> delivered across the globe. Currently shaping the future of education at <span style={{ color: "var(--accent)", textShadow: "0 0 20px rgba(var(--accent-rgb), 0.35)" }}>Oxford University Press</span>.
                  </p>
                </div>
              </motion.div>

              {/* CTA buttons */}
              <motion.div className="mt-10 hidden lg:flex flex-wrap gap-4" variants={slideUp}>
                <button
                  onClick={() => scrollTo("#projects")}
                  className="cta-primary-glow group relative overflow-hidden rounded-full border px-8 py-3.5 text-[12px] font-medium uppercase tracking-[3px]"
                  style={{ color: "var(--fg-70)", background: "rgba(var(--accent-rgb), 0.04)", borderColor: "rgba(var(--accent-rgb), 0.2)", boxShadow: "0 0 0 1px rgba(var(--accent-rgb),0.1), 0 0 18px rgba(var(--accent-rgb),0.15)" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/10 to-[var(--accent)]/0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10">Projects</span>
                </button>
                <button
                  onClick={() => scrollTo("#experience")}
                  className="cta-secondary-glow rounded-full border px-8 py-3.5 text-[12px] font-medium uppercase tracking-[3px]"
                  style={{ borderColor: "var(--secondary)", color: "var(--secondary)", boxShadow: "0 0 0 1px rgba(var(--secondary-rgb),0.1), 0 0 18px rgba(var(--secondary-rgb),0.15)" }}
                >
                  Experience
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Scroll indicator ── */}
      {phase === 3 && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[var(--accent)]/40 to-transparent"
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="text-[10px] uppercase tracking-[4px]" style={{ color: "var(--fg-15)" }}>
            Scroll
          </p>
        </motion.div>
      )}
    </div>
  );
}