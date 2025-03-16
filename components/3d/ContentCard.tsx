"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
interface PixelConstructor {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    color: string;
    speed: number;
    delay: number;
  }
class Pixel {
    private width: number;
    private height: number;
    private ctx: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private color: string;
    private speed: number;
    private size: number;
    private sizeStep: number;
    private minSize: number;
    private maxSizeInteger: number;
    private maxSize: number;
    private delay: number;
    private counter: number;
    private counterStep: number;
    public isIdle: boolean;
    private isReverse: boolean;
    private isShimmer: boolean;
  
  constructor({canvas, context, x, y, color, speed, delay}: PixelConstructor) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min:number , max:number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value: string | number, reducedMotion: boolean): number {
    const min = 0;
    const max = 100;
    const throttle = 0.001;
    const parsed = typeof value === 'string' ? parseInt(value, 10) : value;
  
    if (parsed <= min || reducedMotion) {
      return min;
    } else if (parsed >= max) {
      return max * throttle;
    } else {
      return parsed * throttle;
    }
  }

const VARIANTS = {
  default: {
    activeColor: null,
    gap: 5,
    speed: 35,
    colors: "#00FFFF,#4169E1,#87CEEB",
    noFocus: false
  },
  blue: {
    activeColor: "#e0f2fe",
    gap: 10,
    speed: 25,
    colors: "#e0f2fe,#7dd3fc,#0ea5e9",
    noFocus: false
  },
  cyan: {
    activeColor: "#00FFFF",
    gap: 8,
    speed: 30,
    colors: "#00FFFF,#87CEEB,#4169E1",
    noFocus: false
  }
};

interface ContentCardProps {
  title: string;
  description: string;
  icon?: string;
  variant?: "default" | "blue" | "cyan";
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  showTooltip?: boolean;
  subtitle?: string;
  additionalInfo?: React.ReactNode;
}

const ContentCard = ({
  title,
  description,
  icon,
  variant = "default",
  gap,
  speed,
  colors,
  noFocus,
  showTooltip = false,
  subtitle,
  additionalInfo
}: ContentCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timePreviousRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const variantCfg = VARIANTS[variant] || VARIANTS.default;
  const finalGap = gap ?? variantCfg.gap;
  const finalSpeed = speed ?? variantCfg.speed;
  const finalColors = colors ?? variantCfg.colors;
  const finalNoFocus = noFocus ?? variantCfg.noFocus;

  const initPixels = () => {
    if (!cardRef.current || !canvasRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const colorsArray = finalColors.split(",");
    const pxs: Pixel[] = [];
    for (let x = 0; x < width; x += parseInt(finalGap.toString(), 10)) {
      for (let y = 0; y < height; y += parseInt(finalGap.toString(), 10)) {
        const color =
          colorsArray[Math.floor(Math.random() * colorsArray.length)];

        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance;

        pxs.push(
            new Pixel({
              canvas: canvasRef.current,
              context: ctx,
              x,
              y,
              color,
              speed: getEffectiveSpeed(finalSpeed.toString(), reducedMotion),
              delay
            })
          );
      }
    }
    pixelsRef.current = pxs;
  };

  const doAnimate = (fnName: "appear" | "disappear") => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    
    if (timePreviousRef.current === 0) {
      timePreviousRef.current = timeNow;
      return;
    }
    
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60; // ~60 FPS

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      pixel[fnName]();
      if (!pixel.isIdle) {
        allIdle = false;
      }
    }
    if (allIdle) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleAnimation = (name: "appear" | "disappear") => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(() => doAnimate(name));
  };

  const onMouseEnter = () => handleAnimation("appear");
  const onMouseLeave = () => handleAnimation("disappear");
  const onFocus = (e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    handleAnimation("appear");
  };
  const onBlur = (e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    handleAnimation("disappear");
  };

  useEffect(() => {
    // Check for reduced motion preference
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    
    // GSAP scroll animation
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Initialize pixel effect
    initPixels();
    
    // Handle resize
    const observer = new ResizeObserver(() => {
      initPixels();
    });
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [finalGap, finalSpeed, finalColors, finalNoFocus]);

  return (
    <div
      ref={cardRef}
      className="relative p-6 sm:p-8 rounded-xl overflow-hidden transition-all duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      {/* Canvas for pixel animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
      
      {/* Background gradient - more subtle now that we have pixels */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/5 to-[#4169E1]/5 dark:from-[#00FFFF]/3 dark:to-[#4169E1]/3 backdrop-blur-sm border border-[#00FFFF]/20 dark:border-[#00FFFF]/10" />
      
      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div className="w-12 h-12 mb-4 text-[#00FFFF] dark:text-[#E0FFFF] transition-colors duration-300">
            <img
              src={icon}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] to-[#4169E1] dark:from-[#E0FFFF] dark:to-[#87CEEB] transition-colors duration-300">
          {title}
        </h3>
        {subtitle && (
          <h4 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">
            {subtitle}
          </h4>
        )}
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base sm:text-lg transition-colors duration-300">
          {description}
        </p>
        {additionalInfo && (
          <div className="mt-4">{additionalInfo}</div>
        )}
      </div>

      {/* Simplified tooltip */}
      {showTooltip && (
  <div className="pointer-events-none absolute left-4 top-4 rounded-md bg-[#1A1F3C] dark:bg-[#0A0F1C] px-3 py-2 text-sm text-[#00FFFF] dark:text-[#E0FFFF] z-[3] hidden sm:block border border-[#00FFFF]/20 dark:border-[#00FFFF]/10 transition-opacity duration-300 opacity-0 hover:opacity-100">
    {title}
  </div>
)}
    </div>
  );
};

export default ContentCard;