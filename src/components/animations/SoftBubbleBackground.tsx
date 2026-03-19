'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const SoftBubbleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initBubbles = () => {
      const bubbles: Bubble[] = [];
      const bubbleCount = 20;

      for (let i = 0; i < bubbleCount; i++) {
        const baseSize = Math.random() * 25 + 8;
        bubbles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: baseSize,
          baseSize: baseSize,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.25 + 0.15,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.005 + 0.003
        });
      }
      bubblesRef.current = bubbles;
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;
        bubble.x += Math.sin(time * 0.0002 + bubble.pulsePhase) * 0.2;
        bubble.y += Math.cos(time * 0.0002 + bubble.pulsePhase) * 0.15;
        bubble.size = bubble.baseSize * (Math.sin(time * bubble.pulseSpeed + bubble.pulsePhase) * 0.08 + 1);

        if (bubble.x < -50) bubble.x = canvas.width + 50;
        if (bubble.x > canvas.width + 50) bubble.x = -50;
        if (bubble.y < -50) bubble.y = canvas.height + 50;
        if (bubble.y > canvas.height + 50) bubble.y = -50;

        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.size * 0.2,
          bubble.y - bubble.size * 0.2,
          0,
          bubble.x,
          bubble.y,
          bubble.size
        );

        if (theme === 'light') {
          gradient.addColorStop(0, `rgba(255, 223, 0, ${bubble.opacity * 0.6})`);
          gradient.addColorStop(0.5, `rgba(212, 175, 55, ${bubble.opacity * 0.4})`);
          gradient.addColorStop(1, `rgba(212, 175, 55, ${bubble.opacity * 0.1})`);
        } else {
          gradient.addColorStop(0, `rgba(80, 200, 120, ${bubble.opacity * 0.6})`);
          gradient.addColorStop(0.5, `rgba(16, 185, 129, ${bubble.opacity * 0.4})`);
          gradient.addColorStop(1, `rgba(16, 185, 129, ${bubble.opacity * 0.1})`);
        }

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = theme === 'light' 
          ? `rgba(212, 175, 55, ${bubble.opacity * 0.2})`
          : `rgba(16, 185, 129, ${bubble.opacity * 0.2})`;
        ctx.globalAlpha = 0.3; // Lowered from 0.7 for better hero clarity
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initBubbles();
    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
};

export default SoftBubbleBackground;
