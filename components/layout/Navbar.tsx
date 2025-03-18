// "use client"
// import { useState } from "react";
// import { useTheme } from "next-themes";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FaSun, FaMoon } from "react-icons/fa";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { theme, setTheme } = useTheme();

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="fixed z-50 w-full shadow-lg backdrop-blur-md bg-white/80 dark:bg-gray-900/80"
//     >
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">
//                 Dimensions
//               </Link>
//             </motion.div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden items-center space-x-8 md:flex">
//             <motion.div className="flex items-center space-x-6" initial={false}>
//               {[
//                 { href: "/", label: "Home" },
//                 { href: "/about", label: "About" },
//                 { href: "/events", label: "Events" },
//                 { href: "/speakers", label: "Speakers" },
//                 { href: "/infinitemenu", label: "INfinite" },
                
//               ].map((link) => (
//                 <motion.div
//                   key={link.href}
//                   whileHover={{ y: -2, scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Link
//                     href={link.href}
//                     className="relative text-gray-700 transition-colors duration-300 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
//                   >
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
//                     {link.label}
//                   </Link>
//                 </motion.div>
//               ))}
//               <motion.button
//                 whileHover={{ y: -2, scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={toggleTheme}
//                 className="p-2 text-gray-700 bg-gray-100 rounded-full transition-colors duration-300 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
//               >
//                 {theme === "dark" ? (
//                   <FaSun className="w-5 h-5" />
//                 ) : (
//                   <FaMoon className="w-5 h-5" />
//                 )}
//               </motion.button>
//             </motion.div>
//           </div>

//           {/* Mobile Navigation Button */}
//           <div className="flex items-center space-x-4 md:hidden">
//             <button
//               onClick={toggleTheme}
//               className="p-2 text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-200"
//             >
//               {theme === "dark" ? (
//                 <FaSun className="w-5 h-5" />
//               ) : (
//                 <FaMoon className="w-5 h-5" />
//               )}
//             </button>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="bg-white rounded-b-2xl shadow-lg md:hidden dark:bg-gray-900"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {[
//                 { href: "/", label: "Home" },
//                 { href: "/about", label: "About" },
//                 { href: "/events", label: "Events" },
//                 { href: "/speakers", label: "Speakers" },
//                 { href: "/infinitemenu", label: "INfinite" },

//               ].map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md transition-colors duration-300 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;
"use client"
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

interface NavItem {
  label: string;
  href: string;
}

interface GooeyNavEffectProps {
  items: NavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

const GooeyNavEffect: React.FC<GooeyNavEffectProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  
  const noise = (n: number = 1): number => n / 2 - Math.random() * n;
  
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  
  interface Particle {
    start: [number, number];
    end: [number, number];
    time: number;
    scale: number;
    color: number;
    rotate: number;
  }
  
  const createParticle = (i: number, t: number, d: [number, number], r: number): Particle => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };
  const makeParticles = (element: HTMLElement): void => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // do nothing
          }
        }, t);
      }, 30);
    }
  };
  
  const updateEffectPosition = (element: HTMLElement): void => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };
  
  const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number): void => {
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current?.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl } as React.MouseEvent<HTMLLIElement>, index);
      }
    }
  };
  
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <>
      <style>{`
        :root {
          --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
        }
        .effect {
          position: absolute;
          opacity: 1;
          pointer-events: none;
          display: grid;
          place-items: center;
          z-index: 1;
        }
        .effect.text {
          color: white;
          transition: color 0.3s ease;
        }
        .effect.text.active {
          color: black;
        }
        .effect.filter {
          filter: blur(7px) contrast(100) blur(0);
          mix-blend-mode: lighten;
        }
        // .effect.filter::before {
        //   content: "";
        //   position: absolute;
        //   inset: -75px;
        //   z-index: -2;
        //   background: black;
        // }
        .effect.filter::after {
          content: "";
          position: absolute;
          inset: 0;
          background: white;
          transform: scale(0);
          opacity: 0;
          z-index: -1;
          border-radius: 9999px;
        }
        .effect.active::after {
          animation: pill 0.3s ease both;
        }
        @keyframes pill {
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .particle,
        .point {
          display: block;
          opacity: 0;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          transform-origin: center;
        }
        .particle {
          --time: 5s;
          position: absolute;
          top: calc(50% - 8px);
          left: calc(50% - 8px);
          animation: particle calc(var(--time)) ease 1 -350ms;
        }
        .point {
          background: var(--color);
          opacity: 1;
          animation: point calc(var(--time)) ease 1 -350ms;
        }
        @keyframes particle {
          0% {
            transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
            opacity: 1;
            animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
          }
          70% {
            transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
            opacity: 1;
            animation-timing-function: ease;
          }
          85% {
            transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
            opacity: 1;
          }
          100% {
            transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
            opacity: 1;
          }
        }
        @keyframes point {
          0% {
            transform: scale(0);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
          }
          25% {
            transform: scale(calc(var(--scale) * 0.25));
          }
          38% {
            opacity: 1;
          }
          65% {
            transform: scale(var(--scale));
            opacity: 1;
            animation-timing-function: ease;
          }
          85% {
            transform: scale(var(--scale));
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
        .gooey-nav li.active {
          color: black;
          text-shadow: none;
        }
        .gooey-nav li.active::after {
          opacity: 1;
          transform: scale(1);
        }
        .gooey-nav li::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: white;
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
          z-index: -1;
        }
      `}</style>
      <div className="relative" ref={containerRef}>
        <nav className="flex relative" style={{ transform: "translate3d(0,0,0.01px)" }}>
          <ul
            ref={navRef}
            className="flex gap-8 list-none p-0 px-4 m-0 relative z-[3] gooey-nav"
            style={{
              color: "white",
              textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
            }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`py-[0.6em] px-[1em] rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={(e) => handleClick(e, index)}
              >
                <Link
                  href={item.href}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="outline-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span className="filter effect" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Define navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Speakers", href: "/speakers" },
    { label: "Legends", href: "/infinitemenu" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-50 p-3 w-full shadow-lg backdrop-blur-md bg-gray-900/80 dark:bg-gray-900/80"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">
                Dimensions
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation with Gooey Effect */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center space-x-6">
              <GooeyNavEffect
                items={navItems}
                animationTime={600}
                particleCount={15}
                particleDistances={[42, 20]}
                particleR={75}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                timeVariance={300}
              />
              <motion.button
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 ml-4 text-gray-700 bg-gray-100 rounded-full transition-colors duration-300 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {theme === "dark" ? (
                  <FaSun className="w-5 h-5" />
                ) : (
                  <FaMoon className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-200"
            >
              {theme === "dark" ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-b-2xl shadow-lg md:hidden dark:bg-gray-900"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md transition-colors duration-300 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;