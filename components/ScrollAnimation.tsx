"use client";
import React from "react";
import Image from "next/image";
// import { StickyScroll } from "./StickyScroll";
import { StickyScroll } from "./StickyScroll";

// CSS variables for content elements
const contentStyles = {
  gradientCyanEmerald: {
    background: "linear-gradient(to bottom right, #06b6d4, #10b981)",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
    color: "#ffffff"
  },
  gradientOrangeYellow: {
    background: "linear-gradient(to bottom right, #f97316, #eab308)",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff"
  }
};

const content = [
  {
    title: "AI & Machine Learning Workshop",
		description:
			"Dive deep into the world of artificial intelligence and machine learning. Learn from expert practitioners, get hands-on experience with cutting-edge tools, and discover how AI is transforming industries across the globe.",
    content: (
      <div style={contentStyles.gradientCyanEmerald}>
        <Image
          src="/image-8.jpg"
          width={800}
          height={300}
          className="object-cover"
          alt="img"
        />
      </div>
    ),
  },
  {
    title: "Startup Pitch Competition",
		description:
			"Watch innovative startups pitch their groundbreaking ideas to top investors. Experience the excitement as entrepreneurs compete for funding and mentorship opportunities. Network with founders and investors shaping the future.",
    content: (
      <div style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff"
      }}>
        <Image
          src="/image-9.jpg"
          width={800}
          height={300}
          className="object-cover w-full h-full"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Web3 & Blockchain Forum",
		description:
			"Explore the decentralized future with our comprehensive Web3 and blockchain forum. Learn about cryptocurrency, NFTs, DeFi, and the revolutionary potential of blockchain technology from industry pioneers.",
    content: (
      <div style={contentStyles.gradientOrangeYellow} >
         <Image
          src="/image-6.jpg"
          width={800}
          height={300}
          className="object-cover"
          alt="Version Control"
        />
      </div>
    ),
  },
  {
    title: "Gaming & Esports Festival",
		description:
			"Experience the ultimate gaming celebration! Compete in tournaments, try the latest VR/AR games, meet professional gamers, and explore the future of interactive entertainment. Perfect for gamers and tech enthusiasts alike.",
    content: (
      <div style={contentStyles.gradientCyanEmerald}>
         <Image
          src="/image-8.jpg"
          width={800}
          height={500}
          className="object-cover"
          alt="Real-time Changes"
        />
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
   <section className="overflow-hidden w-screen h-[400vh]">
      <StickyScroll  eventContent={content} />
      </section>
  );
}
