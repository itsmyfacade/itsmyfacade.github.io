"use client";

import Image from "next/image";
import { type PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ImageLightbox.module.css";

export type GalleryImage = {
  src: string;
  title: string;
  caption: string;
};

type ImageLightboxProps = {
  images: readonly GalleryImage[];
  projectLabel: string;
};

export function ImageLightbox({ images, projectLabel }: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const originRef = useRef<HTMLButtonElement | null>(null);
  const dragRef = useRef({ active: false, x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const scrollLockRef = useRef<{ body: string; document: string } | null>(null);

  const resetView = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const restoreScroll = useCallback(() => {
    const previous = scrollLockRef.current;
    if (!previous) return;
    document.body.style.overflow = previous.body;
    document.documentElement.style.overflow = previous.document;
    scrollLockRef.current = null;
  }, []);

  const open = (index: number, trigger: HTMLButtonElement) => {
    originRef.current = trigger;
    setActiveIndex(index);
    resetView();
  };

  const close = useCallback(() => {
    restoreScroll();
    setActiveIndex(null);
    resetView();
    window.requestAnimationFrame(() => originRef.current?.focus());
  }, [resetView, restoreScroll]);

  const move = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => current === null ? current : (current + direction + images.length) % images.length);
    resetView();
  }, [images.length, resetView]);

  const changeZoom = useCallback((amount: number) => {
    setZoom((current) => {
      const next = Math.min(4, Math.max(1, Number((current + amount).toFixed(2))));
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();
    scrollLockRef.current = {
      body: document.body.style.overflow,
      document: document.documentElement.style.overflow,
    };
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "+" || event.key === "=") changeZoom(0.5);
      if (event.key === "-") changeZoom(-0.5);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreScroll();
    };
  }, [activeIndex, changeZoom, close, move, restoreScroll]);

  const onPointerDown = (event: PointerEvent<HTMLImageElement>) => {
    if (zoom === 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { active: true, x: event.clientX, y: event.clientY, offsetX: offset.x, offsetY: offset.y };
  };

  const onPointerMove = (event: PointerEvent<HTMLImageElement>) => {
    if (!dragRef.current.active) return;
    setOffset({
      x: dragRef.current.offsetX + event.clientX - dragRef.current.x,
      y: dragRef.current.offsetY + event.clientY - dragRef.current.y,
    });
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
  };

  return <>
    <section className="lightbox-gallery" aria-label={`${projectLabel} screenshots`}>
      {images.map((image, index) => <figure className="evidence-item" key={image.src}>
        <button
          className="evidence-trigger"
          type="button"
          style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden" }}
          aria-label={`Open ${image.title} screenshot in full screen`}
          onClick={(event) => open(index, event.currentTarget)}
        >
          <Image src={image.src} alt={image.title} fill sizes="(max-width: 700px) 100vw, 50vw" loading="lazy" style={{ objectFit: "contain" }} />
          <span className="expand-mark" aria-hidden="true">↗</span>
        </button>
        <figcaption><strong>{image.title}</strong><span>{image.caption}</span></figcaption>
      </figure>)}
    </section>
    {activeIndex !== null && typeof document !== "undefined" && createPortal(<div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectLabel} image viewer`}
    >
      <div className={styles.toolbar}>
        <span className={styles.counter}>{activeIndex + 1} / {images.length}</span>
        <fieldset className={styles.controls}>
          <legend style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>Image controls</legend>
          <button type="button" onClick={() => changeZoom(-0.5)} aria-label="Zoom out">−</button>
          <button type="button" onClick={resetView} aria-label="Reset zoom">Reset</button>
          <button type="button" onClick={() => changeZoom(0.5)} aria-label="Zoom in">+</button>
          <button ref={closeButtonRef} type="button" onClick={close} aria-label="Close image viewer">Close</button>
        </fieldset>
      </div>
      <div className={styles.viewerRow}>
        <button className={styles.nav} type="button" onClick={() => move(-1)} aria-label="Previous image">‹</button>
        <div className={styles.stage}>
        <Image
          className={`${styles.image}${zoom > 1 ? ` ${styles.zoomed}` : ""}`}
          fill
          sizes="100vw"
          unoptimized
          style={{ objectFit: "contain", transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
          src={images[activeIndex].src}
          alt={images[activeIndex].title}
          onWheel={(event) => { event.preventDefault(); changeZoom(event.deltaY < 0 ? 0.5 : -0.5); }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          draggable={false}
        />
        </div>
        <button className={styles.nav} type="button" onClick={() => move(1)} aria-label="Next image">›</button>
      </div>
      <p className={styles.caption}>{images[activeIndex].title} · {images[activeIndex].caption}</p>
    </div>, document.body)}
  </>;
}
