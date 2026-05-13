"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const images      = project?.images ?? [];
  const hasMultiple = images.length > 1;

  const prev = (imgIdx - 1 + images.length) % images.length;
  const next = (imgIdx + 1) % images.length;

  const go = (i: number) => setImgIdx((i + images.length) % images.length);

  useEffect(() => { setImgIdx(0); }, [project?.id]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (images.length <= 1) return;
      if (e.key === "ArrowLeft")  go(imgIdx - 1);
      if (e.key === "ArrowRight") go(imgIdx + 1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [project, onClose, imgIdx, images.length]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-sage overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-10 w-10 h-10 rounded-full bg-forest/8 hover:bg-forest/15 flex items-center justify-center text-forest transition-colors duration-200 cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-20 pb-14">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-forest text-[clamp(2.25rem,5vw,4.5rem)] leading-tight mb-10"
            >
              {project.title}
            </motion.h2>

            {/* Two-column: description+CTA left, services right */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10 lg:gap-16"
            >
              {/* Left */}
              <div>
                <p className="font-sans text-[1.1rem] text-forest/70 leading-relaxed mb-8">
                  {project.description}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-forest hover:bg-forest/85 text-white rounded-full px-7 h-11 text-sm font-sans transition-colors duration-300"
                  >
                    Visit Website <ArrowUpRight size={15} />
                  </a>
                )}
              </div>

              {/* Right — services */}
              {project.services && project.services.length > 0 && (
                <div>
                  <p className="text-[0.8rem] uppercase tracking-[0.18em] text-forest font-semibold font-sans mb-4">
                    Services
                  </p>
                  {/* >3 items on mobile → two columns */}
                  <ul className={`gap-x-6 gap-y-2 ${
                    project.services.length > 3
                      ? "grid grid-cols-2 lg:grid-cols-1"
                      : "space-y-2"
                  }`}>
                    {project.services.map(s => (
                      <li key={s} className="text-[1rem] text-forest/70 font-sans">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* 3-up carousel — prev · center · next always fill full width */}
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {images.length === 1 ? (
                // Single image — centred, constrained width
                <div className="px-6 lg:px-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images[0]} alt={project.title} className="w-full h-auto block rounded-xl" />
                </div>
              ) : (
                // 3-up slots — each exactly 1/3 of full width, no scroll
                <div className="flex gap-3 px-3">
                  {/* Prev */}
                  <div
                    className="w-1/3 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer opacity-60 hover:opacity-80 transition-opacity duration-200"
                    onClick={() => go(prev)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={images[prev]} alt="" className="w-full h-auto block" />
                  </div>

                  {/* Active */}
                  <div className="w-1/3 flex-shrink-0 rounded-xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={imgIdx}
                        src={images[imgIdx]}
                        alt={`${project.title} — ${imgIdx + 1}`}
                        className="w-full h-auto block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Next */}
                  <div
                    className="w-1/3 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer opacity-60 hover:opacity-80 transition-opacity duration-200"
                    onClick={() => go(next)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={images[next]} alt="" className="w-full h-auto block" />
                  </div>
                </div>
              )}

              {/* Nav controls */}
              {hasMultiple && (
                <div className="flex items-center justify-center gap-3 pt-5">
                  <button
                    onClick={() => go(imgIdx - 1)}
                    className="w-9 h-9 rounded-full border border-forest/20 flex items-center justify-center text-forest hover:bg-forest/8 transition-colors duration-200 cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        aria-label={`Image ${i + 1}`}
                        className={`rounded-full transition-all duration-250 cursor-pointer ${
                          i === imgIdx ? "w-5 h-1.5 bg-forest" : "w-1.5 h-1.5 bg-forest/30 hover:bg-forest/60"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => go(imgIdx + 1)}
                    className="w-9 h-9 rounded-full border border-forest/20 flex items-center justify-center text-forest hover:bg-forest/8 transition-colors duration-200 cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Case study */}
          <div className="max-w-2xl mx-auto px-6 lg:px-12 pt-10 pb-20">
            {project.caseStudy && project.caseStudy.length > 0 ? (
              <div className="space-y-10">
                {project.caseStudy.map((block, i) => (
                  <div key={i}>
                    {block.heading && (
                      <h3 className="font-display font-semibold text-[1.15rem] text-forest mb-3">
                        {block.heading}
                      </h3>
                    )}
                    <p className="font-sans text-[1.1rem] text-forest/70 leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-forest/25 font-sans text-sm italic">
                Case study coming soon.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
