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
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div style={contentStyles.gradientCyanEmerald}>
        <Image
          src="/image-8.jpg"
          width={800}
          height={300}
          className="object-cover"
          alt="Real-time Changes"
        />
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
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
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the lerience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most ree updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the lerience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
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
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
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
      <StickyScroll  content={content} />
      </section>
  );
}