"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import TrueFocus from "./TrueFocus";

gsap.registerPlugin(ScrollTrigger);

const AnimatedHero = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const spheresRef = useRef<THREE.Mesh[]>([]);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Set mounted to true after component mounts
		setMounted(true);
		
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

		const handleResize = () => {
			if (cameraRef.current && rendererRef.current) {
				cameraRef.current.aspect = window.innerWidth / window.innerHeight;
				cameraRef.current.updateProjectionMatrix();
				rendererRef.current.setSize(window.innerWidth, window.innerHeight);
			}
		};

		window.addEventListener("resize", handleResize);

		if (containerRef.current) {
			rendererRef.current.setSize(window.innerWidth, window.innerHeight);
			rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			containerRef.current.appendChild(rendererRef.current.domElement);

			// Create multiple colorful spheres
			const colors = [
				0xff6b6b, // Red
				0x4ecdc4, // Teal
				0xffe66d, // Yellow
				0xa374db, // Purple
				0x95e1d3, // Mint
			];

			colors.forEach((color, index) => {
				const geometry = new THREE.SphereGeometry(0.5, 32, 32);
				const material = new THREE.MeshPhongMaterial({
					color: color,
					shininess: 100,
					specular: 0xffffff,
				});
				const sphere = new THREE.Mesh(geometry, material);

				// Position spheres in a circular pattern
				const angle = (index / colors.length) * Math.PI * 2;
				sphere.position.x = Math.cos(angle) * 3;
				sphere.position.y = Math.sin(angle) * 3;
				sphere.position.z = 0;

				// Store initial positions
				sphere.userData.initialY = sphere.position.y;
				sphere.userData.initialX = sphere.position.x;

				if (sceneRef.current) {
					sceneRef.current.add(sphere);
				}
				spheresRef.current.push(sphere);
			});

			// Add lights
			const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
			const pointLight = new THREE.PointLight(0xffffff, 1.5);
			pointLight.position.set(10, 10, 10);
			const pointLight2 = new THREE.PointLight(0xffffff, 1.2);
			pointLight2.position.set(-10, -10, 10);
			sceneRef.current.add(ambientLight, pointLight, pointLight2);

			cameraRef.current.position.z = 6;

			// Add click event listener for sphere bouncing
			const raycaster = new THREE.Raycaster();
			const mouse = new THREE.Vector2();

			const handleClick = (event: MouseEvent) => {
				mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
				mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

				if (cameraRef.current && sceneRef.current) {
					raycaster.setFromCamera(mouse, cameraRef.current);
					const intersects = raycaster.intersectObjects(spheresRef.current);

					if (intersects.length > 0) {
						const sphere = intersects[0].object;
						gsap.to(sphere.position, {
							y: sphere.userData.initialY + 2,
							duration: 0.5,
							ease: "power2.out",
							yoyo: true,
							repeat: 1,
							onComplete: () => {
								sphere.position.y = sphere.userData.initialY;
							},
						});
					}
				}
			};

			window.addEventListener("click", handleClick);

			// Animation loop
			const animate = () => {
				requestAnimationFrame(animate);

				// Rotate spheres and add floating animation
				spheresRef.current.forEach((sphere, index) => {
					sphere.rotation.x += 0.01;
					sphere.rotation.y += 0.01;

					// Add floating animation with position reset
					const floatOffset = Math.sin(Date.now() * 0.001 + index) * 0.2;
					sphere.position.y = sphere.userData.initialY + floatOffset;
					
					// Add slight horizontal movement
					const horizontalOffset = Math.cos(Date.now() * 0.0005 + index) * 0.1;
					sphere.position.x = sphere.userData.initialX + horizontalOffset;
				});

				if (sceneRef.current && cameraRef.current && rendererRef.current) {
					rendererRef.current.render(sceneRef.current, cameraRef.current);
				}
			};
			animate();

			// GSAP Animations with timeline reset
			const tl = gsap.timeline({ paused: true });

			tl.from(".hero-title", {
				opacity: 0,
				y: 100,
				duration: 1.5,
				ease: "power4.out",
			})
				.from(
					".hero-subtitle",
					{
						opacity: 0,
						y: 50,
						duration: 1.2,
						ease: "power3.out",
						clipPath: "inset(0 100% 0 0)",
					},
					"-=1"
				)
				.from(
					".cta-button",
					{
						opacity: 0,
						scale: 0.8,
						duration: 1,
						ease: "elastic.out(1, 0.5)",
					},
					"-=0.5"
				);

			// Play timeline after a short delay
			setTimeout(() => tl.play(), 300);

			// Cleanup
			return () => {
				window.removeEventListener("click", handleClick);
				window.removeEventListener("resize", handleResize);
				if (containerRef.current && rendererRef.current) {
					containerRef.current.removeChild(rendererRef.current.domElement);
				}
				// Dispose of Three.js resources
				spheresRef.current.forEach((sphere) => {
					sphere.geometry.dispose();
					(sphere.material as THREE.Material).dispose();
				});
				rendererRef.current?.dispose();
			};
		}
	}, []);

	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div ref={containerRef} className="absolute inset-0 z-20" />
			<div className="absolute inset-0 z-10 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-blue-600/20" />
			<div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4 hover:scale-105 transition-transform duration-500">
				{mounted && (
					<>
						<div className="mb-6 hero-title">
							<TrueFocus
								sentence="Dimensions ARE 4"
								manualMode={false} // Changed to false to enable automatic animation
								blurAmount={3}
								borderColor="#8b5cf6"
								glowColor="rgba(139, 92, 246, 0.6)"
								animationDuration={0.3}
								pauseBetweenAnimations={1.5}
							/>
						</div>
						<p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl hover:text-white transition-colors duration-300">
							Experience the future of technology through immersive 3D
							visualizations and cutting-edge innovations
						</p>
						<button className="cta-button px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-full text-white font-semibold text-lg hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform">
							Explore Now
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default AnimatedHero;