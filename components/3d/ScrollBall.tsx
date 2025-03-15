"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollBall = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const ballRef = useRef<THREE.Mesh | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// Initialize Three.js scene
		sceneRef.current = new THREE.Scene();
		cameraRef.current = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		rendererRef.current = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});

		// Set up renderer
		rendererRef.current.setSize(100, 100); // Small canvas size for the ball
		rendererRef.current.setPixelRatio(window.devicePixelRatio);
		containerRef.current.appendChild(rendererRef.current.domElement);

		// Add lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
		const pointLight = new THREE.PointLight(0xffffff, 1.5);
		pointLight.position.set(5, 5, 5);
		const pointLight2 = new THREE.PointLight(0xffffff, 1.2);
		pointLight2.position.set(-5, -5, 5);
		sceneRef.current.add(ambientLight, pointLight, pointLight2);

		// Position camera
		cameraRef.current.position.z = 3;

		// Create ball
		const geometry = new THREE.SphereGeometry(1, 32, 32);
		const material = new THREE.MeshPhongMaterial({
			color: 0x4ecdc4,
			shininess: 150,
			specular: 0xffffff,
			emissive: 0x4ecdc4,
			emissiveIntensity: 0.2,
		});
		ballRef.current = new THREE.Mesh(geometry, material);
		sceneRef.current.add(ballRef.current);

		// Position camera
		cameraRef.current.position.z = 4;

		// Handle resize
		const handleResize = () => {
			if (cameraRef.current && rendererRef.current) {
				cameraRef.current.aspect = 1; // Keep aspect ratio 1:1
				cameraRef.current.updateProjectionMatrix();
				rendererRef.current.setSize(100, 100);
			}
		};
		window.addEventListener("resize", handleResize);

		// Animation
		const animate = () => {
			requestAnimationFrame(animate);
			if (ballRef.current) {
				ballRef.current.rotation.x += 0.01;
				ballRef.current.rotation.y += 0.01;
			}
			if (sceneRef.current && cameraRef.current && rendererRef.current) {
				rendererRef.current.render(sceneRef.current, cameraRef.current);
			}
		};
		animate();

		// Scroll animation with spring physics
		gsap.to(containerRef.current, {
			scrollTrigger: {
				trigger: document.body,
				start: "top top",
				end: "bottom bottom",
				scrub: 0.5,
				onUpdate: (self) => {
					if (ballRef.current) {
						// Change color based on scroll position
						const hue = self.progress * 360;
						const color = new THREE.Color(`hsl(${hue}, 70%, 50%)`);
						(ballRef.current.material as THREE.MeshPhongMaterial).color = color;

						// Improved bouncy effect
						const bounce = Math.sin(self.progress * Math.PI * 2) * 0.15;
						ballRef.current.position.y = bounce;
						const scale = 1 + Math.abs(bounce) * 0.2;
						ballRef.current.scale.set(scale, scale, scale);
					}
				},
			},
			y: window.innerHeight - 100,
			ease: "none",
		});

		// Cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
			if (containerRef.current && rendererRef.current) {
				containerRef.current.removeChild(rendererRef.current.domElement);
			}
			geometry.dispose();
			material.dispose();
			rendererRef.current?.dispose();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="fixed right-8 top-8 w-[100px] h-[100px] z-50 pointer-events-none transform-gpu"
			style={{
				willChange: "transform",
				transform: "translate3d(0, 0, 0)",
			}}
		/>
	);
};

export default ScrollBall;
