"use client"

import * as React from "react"
import { motion, HTMLMotionProps, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  distance?: number
  stagger?: boolean
  children: React.ReactNode
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  distance = 20,
  stagger = false,
  className,
  ...props
}: FadeInProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: { x: 0, y: 0 },
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        ...(stagger && {
          staggerChildren: 0.1,
        }),
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeInStagger({
  children,
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.1,
  className,
  ...props
}: FadeInProps & { staggerDelay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
