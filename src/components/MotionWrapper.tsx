"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
  className?: string;
  once?: boolean;
}

export default function MotionWrapper({
  children,
  delay = 0,
  direction = "up", // Por defeito, os elementos "caem" de baixo para cima
  className = "",
  once = true, // Se quiseres que anime sempre que fazes scroll, muda para false!
}: MotionWrapperProps) {
  
  // Define de onde o elemento começa antes de aparecer
  const animationVariants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      scale: direction === "scale" ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Curva de animação super fluída (estilo Apple)
      },
    },
  };

  return (
    <motion.div
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      // "once: true" faz a animação apenas 1 vez. 
      // "margin: -50px" faz com que só comece a animar quando entra um bocadinho no ecrã.
      viewport={{ once: once, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}