'use client';

import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

// Style A: Text opacity 0 → blurred → sharp with fade-in
export function BlurFadeReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-sm translate-y-4",
        className,
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Style F: Text reveals line by line with mask effect
export function LineMaskReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        className={cn("transition-all duration-900 ease-out", isVisible ? "translate-y-0" : "translate-y-full")}
        style={{
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
