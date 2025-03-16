"use client";

import React from "react";
import TrueFocus from "./TrueFocus";

const AnimatedHero = () => {
  return (
    <div className="overflow-hidden relative w-full h-screen">
      <div className="flex relative z-10 justify-center items-center h-full">
        <div className="text-center">
          <TrueFocus
            sentence="Welcome to Dimensions"
            manualMode={false}
            blurAmount={3}
            borderColor="#00FFFF"
            glowColor="rgba(0, 255, 255, 0.6)"
          />
          <p className="px-4 mx-auto mt-6 max-w-2xl text-xl text-gray-300">
            Experience the future of technology at our premier tech festival
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHero;