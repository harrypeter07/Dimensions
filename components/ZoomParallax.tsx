// src/components/ZoomParallax/index.tsx
import { useRef } from 'react';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './styles.module.css';

interface PictureItem {
  src: string;
  scale: import('framer-motion').MotionValue<number>; // Type for framer-motion transform scale
}

export default function ZoomParallax(): React.ReactElement {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  // Create transform scales
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Using direct paths to images in public folder
  const pictures: PictureItem[] = [
    {
      src: '/images/1.jpg',
      scale: scale4
    },
    {
      src: '/images/2.jpg',
      scale: scale5
    },
    {
      src: '/images/3.jpg',
      scale: scale6
    },
    {
      src: '/images/4.jpg',
      scale: scale5
    },
    {
      src: '/images/5.jpg',
      scale: scale6
    },
    {
      src: '/images/6.jpg',
      scale: scale8
    },
    {
      src: '/images/7.jpg',
      scale: scale9
    },
  
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <Image
                  src={src}
                  fill
                  alt={`parallax image ${index + 1}`}
                  sizes="(max-width: 868px) 100vw, 70vw"
                  quality={90}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}