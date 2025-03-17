// DroneContext.tsx
"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

interface DroneContextType {
  droneScale: number;
  dronePosition: [number, number, number];
  canvasSize: { width: string; height: string };
  canvasPosition: { top: string; right: string };
  animationSpeed: number;
  isVisible: boolean;
  updateDroneScale: (scale: number) => void;
  updateDronePosition: (position: [number, number, number]) => void;
  updateCanvasSize: (size: { width: string; height: string }) => void;
  updateCanvasPosition: (position: { top: string; right: string }) => void;
  updateAnimationSpeed: (speed: number) => void;
  setDroneVisibility: (visible: boolean) => void;
}

const DroneContext = createContext<DroneContextType | undefined>(undefined);

export const DroneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [droneScale, setDroneScale] = useState(0.65);
  const [dronePosition, setDronePosition] = useState<[number, number, number]>([0, 0, 0]);
  const [canvasSize, setCanvasSize] = useState({ width: '50%', height: '50%' });
  const [canvasPosition, setCanvasPosition] = useState({ top: '5%', right: '-0%' });
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const updateDroneScale = useCallback((scale: number) => {
    setDroneScale(scale);
  }, []);

  const updateDronePosition = useCallback((position: [number, number, number]) => {
    setDronePosition(position);
  }, []);

  const updateCanvasSize = useCallback((size: { width: string; height: string }) => {
    setCanvasSize(size);
  }, []);

  const updateCanvasPosition = useCallback((position: { top: string; right: string }) => {
    setCanvasPosition(position);
  }, []);

  const updateAnimationSpeed = useCallback((speed: number) => {
    setAnimationSpeed(speed);
  }, []);

  const setDroneVisibility = useCallback((visible: boolean) => {
    setIsVisible(visible);
  }, []);

  return (
    <DroneContext.Provider
      value={{
        droneScale,
        dronePosition,
        canvasSize,
        canvasPosition,
        animationSpeed,
        isVisible,
        updateDroneScale,
        updateDronePosition,
        updateCanvasSize,
        updateCanvasPosition,
        updateAnimationSpeed,
        setDroneVisibility,
      }}
    >
      {children}
    </DroneContext.Provider>
  );
};
export const useDroneContext = () => {
    const context = useContext(DroneContext);
    if (!context) {
      throw new Error('useDroneContext must be used within a DroneProvider');
    }
    return context;
  };
  