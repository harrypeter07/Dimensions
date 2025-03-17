"use client";
import React from "react";
import { useDroneContext } from "./DroneContext";

const DroneControls = () => {
  const {
    droneScale,
    dronePosition,
    animationSpeed,
    canvasSize,
    canvasPosition,
    updateDroneScale,
    updateDronePosition,
    updateCanvasSize,
    updateCanvasPosition,
    updateAnimationSpeed,
  } = useDroneContext();

  return (
    <div style={{ padding: "10px", background: "#222", color: "white" }}>
      <h3>Drone & Canvas Controls</h3>

      {/* Control Drone Scale */}
      <label>Drone Scale:</label>
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.01"
        value={droneScale}
        onChange={(e) => updateDroneScale(parseFloat(e.target.value))}
      />

      {/* Control Drone Position */}
      <label>Drone Position (X, Y, Z):</label>
      <input
        type="number"
        value={dronePosition[0]}
        onChange={(e) => updateDronePosition([parseFloat(e.target.value), dronePosition[1], dronePosition[2]])}
      />
      <input
        type="number"
        value={dronePosition[1]}
        onChange={(e) => updateDronePosition([dronePosition[0], parseFloat(e.target.value), dronePosition[2]])}
      />
      <input
        type="number"
        value={dronePosition[2]}
        onChange={(e) => updateDronePosition([dronePosition[0], dronePosition[1], parseFloat(e.target.value)])}
      />

      {/* Control Animation Speed */}
      <label>Animation Speed:</label>
      <input
        type="range"
        min="0.1"
        max="3"
        step="0.1"
        value={animationSpeed}
        onChange={(e) => updateAnimationSpeed(parseFloat(e.target.value))}
      />

      {/* Control Canvas Size */}
      <label>Canvas Size:</label>
      <input
        type="text"
        value={canvasSize.width}
        onChange={(e) => updateCanvasSize({ ...canvasSize, width: e.target.value })}
      />
      <input
        type="text"
        value={canvasSize.height}
        onChange={(e) => updateCanvasSize({ ...canvasSize, height: e.target.value })}
      />

      {/* Control Canvas Position */}
      <label>Canvas Position (Top, Right):</label>
      <input
        type="text"
        value={canvasPosition.top}
        onChange={(e) => updateCanvasPosition({ ...canvasPosition, top: e.target.value })}
      />
      <input
        type="text"
        value={canvasPosition.right}
        onChange={(e) => updateCanvasPosition({ ...canvasPosition, right: e.target.value })}
      />
    </div>
  );
};

export default DroneControls;
