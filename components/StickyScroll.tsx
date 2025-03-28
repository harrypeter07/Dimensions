"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";

// CSS variables for the component
const cssVariables = {
  "--slate-900": "#0f172a",
  "--black": "#000000",
  "--neutral-900": "#171717",
  "--cyan-500": "#06b6d4",
  "--emerald-500": "#10b981",
  "--pink-500": "#ec4899",
  "--indigo-500": "#6366f1",
  "--orange-500": "#f97316",
  "--yellow-500": "#eab308",
  "--slate-100": "#f1f5f9",
  "--slate-300": "#cbd5e1",
};

const eventContent = [
  {
    title: "Tech Summit 2024",
    description:
      "Join us for the largest tech conference of the year! Experience groundbreaking innovations, connect with industry leaders, and explore the future of technology. Featuring keynote speakers, interactive workshops, and networking opportunities.",
    content: (
      <div className="w-full h-full bg-[url('/images/e1.jpg')] bg-cover bg-center rounded-lg" />
    ),
  },
  {
    title: "AI & Machine Learning Workshop",
    description:
      "Dive deep into the world of artificial intelligence and machine learning. Learn from expert practitioners, get hands-on experience with cutting-edge tools, and discover how AI is transforming industries across the globe.",
    content: (
      <div className="w-full h-full bg-[url('/images/e2.jpg')] bg-cover bg-center rounded-lg" />
    ),
  },
  {
    title: "Startup Pitch Competition",
    description:
      "Watch innovative startups pitch their groundbreaking ideas to top investors. Experience the excitement as entrepreneurs compete for funding and mentorship opportunities. Network with founders and investors shaping the future.",
    content: (
      <div className="w-full h-full bg-[url('/images/e3.jpg')] bg-cover bg-center rounded-lg" />
    ),
  },
  {
    title: "Web3 & Blockchain Forum",
    description:
      "Explore the decentralized future with our comprehensive Web3 and blockchain forum. Learn about cryptocurrency, NFTs, DeFi, and the revolutionary potential of blockchain technology from industry pioneers.",
    content: (
      <div className="w-full h-full bg-[url('/images/e4.jpg')] bg-cover bg-center rounded-lg" />
    ),
  },
  {
    title: "Gaming & Esports Festival",
    description:
      "Experience the ultimate gaming celebration! Compete in tournaments, try the latest VR/AR games, meet professional gamers, and explore the future of interactive entertainment. Perfect for gamers and tech enthusiasts alike.",
    content: (
      <div className="w-full h-full bg-[url('/images/e5.jpg')] bg-cover bg-center rounded-lg" />
    ),
  },
];

interface StickyScrollProps {
  eventContent?: Array<{
    title: string;
    description: string;
    content: React.ReactNode;  // Changed from eventContent to content
  }>;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  eventContent: propEventContent,
}) => {
  const content = propEventContent || eventContent;
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track if the component is in view
  const { scrollYProgress: componentVisibility } = useScroll({
    target: componentRef,
    offset: ["start end", "end start"],
  });

  // Track scroll progress within the component
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 10%", "end start"],
  });

  const cardLength = content.length;

  // Update visibility based on whether component is in viewport
  useMotionValueEvent(componentVisibility, "change", (latest) => {
    setIsVisible(latest > 0.15 && latest < 0.85);
  });

  // Update active card based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);  // Fixed: eventContent to content
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];
  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]);  // Added linearGradients to dependency array

  return (
    <div ref={componentRef} className="relative w-full">
      <motion.div
        animate={{
          backgroundColor:
            backgroundColors[activeCard % backgroundColors.length],
        }}
        className="flex relative flex-col justify-center items-center w-full min-h-screen"
        ref={scrollRef}
        style={cssVariables as React.CSSProperties}
      >
        {/* Text Sections */}
        {content.map((item, index) => (
          <div
            key={item.title + index}
            className="flex justify-start items-center px-4 py-20 w-full h-screen"
            style={{ minHeight: "100vh" }}
          >
            <div className="ml-14 max-w-2xl">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
                style={{ color: "var(--slate-100)" }}
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mt-10 max-w-prose text-lg text-slate-300"
                style={{ color: "var(--slate-300)" }}
              >
                {item.description}
              </motion.p>
            </div>
          </div>
        ))}

        {/* Sticky Visual Container - Only visible when component is in view */}
        <motion.div
          className="hidden overflow-hidden fixed top-1/2 left-1/2 z-10 mr-8 w-[92vh] h-[38vh] rounded-md transform -translate-y-1/2 lg:block"
          style={{
            background: backgroundGradient,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {content[activeCard].content ?? null}
        </motion.div>
      </motion.div>
    </div>
  );
};