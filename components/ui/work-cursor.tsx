"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface WorkCursorProps {
  isHovering: boolean;
}

export function WorkCursor({ isHovering }: WorkCursorProps) {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Spring-follows the mouse for a smooth, weighted feel
  const x = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const y = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      // translateX/Y centre the circle on the pointer
      style={{ x, y, translateX: "-50%", translateY: "-50%", backgroundColor: "var(--color-sage)" }}
      animate={{
        opacity: isHovering ? 1 : 0,
        scale:   isHovering ? 1 : 0.3,
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="hidden md:flex fixed top-0 left-0 z-[100] pointer-events-none w-[108px] h-[108px] rounded-full bg-sage items-center justify-center"
    >
      <ArrowUpRight size={38} strokeWidth={1.5} className="text-forest" />
    </motion.div>
  );
}
