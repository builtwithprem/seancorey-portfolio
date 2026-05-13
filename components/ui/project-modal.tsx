"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import type { Project } from "@/lib/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images      = project?.images ?? [];
  const hasMultiple = images.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop:          true,
    align:         "center",
    containScroll: false,  // lets adjacent slides peek in
  });

  // Sync dot indicator with embla's selected slide
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Reset to slide 0 when a new project opens
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0, true); // true = jump (no animation on open)
    setSelectedIndex(0);
  }, [project?.id, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { onClose(); return; }
      if (e.key === "ArrowLeft")  scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [project, onClose, scrollPrev, scrollNext]);

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

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10 lg:gap-16"
            >
              {/* Left — description + CTA */}
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

          {/* Embla carousel */}
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="flex-[0_0_92%] sm:flex-[0_0_80%] px-2"
                    >
                      {/* Mobile: fixed 60vh so web design screenshots have impact.
                          Desktop: natural height — already looks great. */}
                      <div className="h-[30vh] sm:h-auto overflow-hidden rounded-xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`${project.title} — ${i + 1}`}
                          className="w-full h-full sm:h-auto block object-cover object-top"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav controls */}
              {hasMultiple && (
                <div className="flex items-center justify-center gap-3 pt-5">
                  <button
                    onClick={scrollPrev}
                    className="w-9 h-9 rounded-full border border-forest/20 flex items-center justify-center text-forest hover:bg-forest/8 transition-colors duration-200 cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => emblaApi?.scrollTo(i)}
                        aria-label={`Image ${i + 1}`}
                        className={`rounded-full transition-all duration-250 cursor-pointer ${
                          i === selectedIndex
                            ? "w-5 h-1.5 bg-forest"
                            : "w-1.5 h-1.5 bg-forest/30 hover:bg-forest/60"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={scrollNext}
                    className="w-9 h-9 rounded-full border border-forest/20 flex items-center justify-center text-forest hover:bg-forest/8 transition-colors duration-200 cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Browser mockup preview */}
          {project.previewImage && (
            <div className="max-w-[1180px] mx-auto px-6 lg:px-12 pt-10">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 8px 48px color-mix(in srgb, var(--color-forest) 12%, transparent)" }}
              >
                {/* Browser chrome */}
                <div className="bg-forest/6 border-b border-forest/8 px-4 py-3 flex items-center gap-3">
                  {/* Traffic lights */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-forest/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-forest/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-forest/20" />
                  </div>
                  {/* URL bar */}
                  <div className="flex-1 bg-forest/6 rounded-full px-3 py-1 text-center text-[0.65rem] text-forest/40 font-sans truncate">
                    {project.url ? project.url.replace(/^https?:\/\//, "") : project.title.toLowerCase().replace(/\s+/g, "") + ".com"}
                  </div>
                </div>

                {/* Scrollable screenshot */}
                <div className="h-[420px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-forest/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.previewImage}
                    alt={`${project.title} website preview`}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
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
