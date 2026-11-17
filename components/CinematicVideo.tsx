"use client";

import { useEffect, useRef } from "react";

type CinematicVideoProps = {
  src: string;
  poster: string;
  className: string;
  playbackRate?: number;
  preload?: "none" | "metadata" | "auto";
};

export function CinematicVideo({ src, poster, className, playbackRate = 1, preload = "metadata" }: CinematicVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyRate = () => { video.playbackRate = playbackRate; };
    const playIfAllowed = () => {
      applyRate();
      if (!reducedMotion.matches) void video.play().catch(() => undefined);
    };
    const onMotionChange = () => { if (reducedMotion.matches) video.pause(); else playIfAllowed(); };
    applyRate();
    if (reducedMotion.matches) video.pause(); else void video.play().catch(() => undefined);
    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("ratechange", applyRate);
    reducedMotion.addEventListener?.("change", onMotionChange);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) playIfAllowed(); else video.pause();
    }, { threshold: 0.08 });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("ratechange", applyRate);
      reducedMotion.removeEventListener?.("change", onMotionChange);
    };
  }, [playbackRate]);

  return <video ref={ref} className={className} muted loop playsInline preload={preload} poster={poster}>
    <source src={src} type="video/mp4" />
  </video>;
}
