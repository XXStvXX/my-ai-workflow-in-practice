"use client";

import { useEffect, useRef, useState } from "react";
import type { PosterItem } from "./site-data";
import styles from "./syans.module.css";

export function PosterCarousel({ posters }: { posters: PosterItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const touchStart = useRef<number | null>(null);
  const hasMultiple = posters.length > 1;
  const activePoster = posters[index];

  const show = (next: number) => {
    if (!posters.length) return;
    setIndex((next + posters.length) % posters.length);
  };

  useEffect(() => {
    if (!hasMultiple || paused || previewOpen) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % posters.length), 7000);
    return () => window.clearInterval(timer);
  }, [hasMultiple, paused, posters.length, previewOpen]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setPreviewOpen(false);
      if (event.key === "ArrowRight" && hasMultiple) setIndex((current) => (current + 1) % posters.length);
      if (event.key === "ArrowLeft" && hasMultiple) setIndex((current) => (current - 1 + posters.length) % posters.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [hasMultiple, posters.length, previewOpen]);

  return (
    <section
      className={styles.posterWindow}
      aria-label="公司 News & Events 海报"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; setPaused(true); }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        if (start != null && end != null && Math.abs(start - end) > 42 && hasMultiple) show(index + (start > end ? 1 : -1));
        touchStart.current = null;
        setPaused(false);
      }}
    >
      <header className={styles.posterHeader}>
        <span>NEWS &amp; EVENTS</span>
        {posters.length ? <b>{String(index + 1).padStart(2, "0")} / {String(posters.length).padStart(2, "0")}</b> : <b>00 / 00</b>}
      </header>
      <div className={styles.posterStage}>
        {posters.length ? (
          <div className={styles.posterTrack} style={{ transform: `translateX(-${index * 100}%)` }}>
            {posters.map((poster, posterIndex) => (
              <button
                className={styles.posterPreviewButton}
                type="button"
                key={poster.id}
                tabIndex={posterIndex === index ? 0 : -1}
                onClick={() => setPreviewOpen(true)}
                aria-label={`放大查看：${poster.alt}`}
              >
                <img src={poster.file} alt={poster.alt} />
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.posterEmpty} aria-label="当前暂无公司海报" />
        )}
        {hasMultiple ? (
          <>
            <button className={`${styles.posterArrow} ${styles.posterArrowPrevious}`} type="button" onClick={() => show(index - 1)} aria-label="上一张海报">←</button>
            <button className={`${styles.posterArrow} ${styles.posterArrowNext}`} type="button" onClick={() => show(index + 1)} aria-label="下一张海报">→</button>
          </>
        ) : null}
      </div>
      {hasMultiple ? (
        <div className={styles.posterDots} aria-label="海报页码">
          {posters.map((poster, dotIndex) => (
            <button key={poster.id} type="button" className={dotIndex === index ? styles.posterDotActive : ""} onClick={() => show(dotIndex)} aria-label={`转到第 ${dotIndex + 1} 张海报`} />
          ))}
        </div>
      ) : null}
      {previewOpen && activePoster ? (
        <div className={styles.posterLightbox} role="dialog" aria-modal="true" aria-label={activePoster.alt} onClick={() => setPreviewOpen(false)}>
          <button type="button" onClick={() => setPreviewOpen(false)} aria-label="关闭大图预览">×</button>
          <img src={activePoster.file} alt={activePoster.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </section>
  );
}
