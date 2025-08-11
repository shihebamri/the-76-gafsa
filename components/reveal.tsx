"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  delay?: number // ms
  duration?: number // ms
  y?: number // initial translateY in px
  x?: number // initial translateX in px
  threshold?: number
  once?: boolean
  rootMargin?: string
}

/**
 * Reveal
 * - IntersectionObserver-based, GPU-accelerated fade/slide in
 * - Mobile friendly and respects prefers-reduced-motion
 */
export default function Reveal({
  as: Tag = "div",
  className,
  children,
  delay = 0,
  duration = 600,
  y = 20,
  x = 0,
  threshold = 0.22,
  once = true,
  rootMargin = "0px",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : `translate3d(${x}px, ${y}px, 0)`,
    transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity ${duration}ms ease ${delay}ms`,
    willChange: "transform, opacity",
  }

  return (
    <Tag ref={ref as any} className={cn(className)} style={style}>
      {children}
    </Tag>
  )
}
