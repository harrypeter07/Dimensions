import React, { useRef, useEffect, useState } from "react";

// Define props interface
interface LogoHoverEffectProps {
  text: string;
  fontSize?: string;
}

// Utility function for class names
const cn = (...inputs: string[]): string => {
  return inputs.filter(Boolean).join(" ");
};

const LogoHoverEffect: React.FC<LogoHoverEffectProps> = ({ 
  text, 
  fontSize = "102px" 
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [cursor, setCursor] = useState<{ x: number | null; y: number | null }>({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<boolean>(false);
  const [maskPosition, setMaskPosition] = useState<{ cx: string; cy: string }>({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>): void => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="pt-7 mx-auto w-full max-w-md">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="select-none"
      >
        <defs>
          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            cx="50%"
            cy="50%"
            r="25%"
          >
            {hovered && (
              <>
                {/* Enhanced brighter colors */}
                <stop offset="0%" stopColor="#fcd34d" /> {/* Brighter yellow */}
                <stop offset="25%" stopColor="#f87171" /> {/* Brighter red */}
                <stop offset="50%" stopColor="#60a5fa" /> {/* Brighter blue */}
                <stop offset="75%" stopColor="#22d3ee" /> {/* Brighter cyan */}
                <stop offset="100%" stopColor="#a78bfa" /> {/* Brighter purple */}
              </>
            )}
          </linearGradient>
          
          <radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="30%" 
            cx={maskPosition.cx}
            cy={maskPosition.cy}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="85%" stopColor="gray" /> {/* Added intermediate color */}
            <stop offset="100%" stopColor="black" />
          </radialGradient>
          
          <mask id="textMask">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#revealMask)"
            />
          </mask>
        </defs>
        
        {/* Background Text - Improved default visibility */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.6"
          className={cn(
            "font-bold fill-transparent stroke-neutral-300 dark:stroke-neutral-600", /* Lighter stroke for better visibility */
            hovered ? "opacity-80" : "opacity-30" /* Always somewhat visible */
          )}
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: fontSize,
            transition: "opacity 0.3s ease"
          }}
        >
          {text}
        </text>
        
        {/* Animated Stroke Text - Higher contrast */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.8" 
          className="fill-transparent stroke-neutral-300 dark:stroke-neutral-500"
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: fontSize,
            strokeDasharray: "1000",
            strokeDashoffset: "0",
            animation: "dash 3s ease-in-out forwards" /* Slightly faster animation */
          }}
        >
          {text}
        </text>
        
        {/* Gradient Text with Mask - Increased intensity */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#textGradient)"
          strokeWidth="1" 
          mask="url(#textMask)"
          className="fill-transparent"
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: fontSize,
            filter: "drop-shadow(0 0 2px rgba(255,255,255,0.5))" /* Adding subtle glow */
          }}
        >
          {text}
        </text>
        
        <style jsx>{`
          @keyframes dash {
            from {
              stroke-dashoffset: 1000;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default LogoHoverEffect;