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
console.log(mounted);
	useEffect(() => {
		setMounted(true);
		
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

			// Updated sphere colors with new color scheme
			const colors = [
				0x00FFFF, // Electric Blue
				0xFF00FF, // Magenta
				0x00FF00, // Neon Green
				0x4169E1, // Royal Blue
				0xFF1493  // Deep Pink
			];

			colors.forEach((color, index) => {
				const geometry = new THREE.SphereGeometry(0.5, 32, 32);
				const material = new THREE.MeshPhongMaterial({
					color: color,
					shininess: 150,
					specular: 0xffffff,
					emissive: color,
					emissiveIntensity: 0.2
				});
				const sphere = new THREE.Mesh(geometry, material);

				const angle = (index / colors.length) * Math.PI * 2;
				sphere.position.x = Math.cos(angle) * 3;
				sphere.position.y = Math.sin(angle) * 3;
				sphere.position.z = 0;

				sphere.userData.initialY = sphere.position.y;
				sphere.userData.initialX = sphere.position.x;

				if (sceneRef.current) {
					sceneRef.current.add(sphere);
				}
				spheresRef.current.push(sphere);
			});

			// Enhanced lighting setup
			const ambientLight = new THREE.AmbientLight(0x0A0F1C, 0.5);
			const pointLight1 = new THREE.PointLight(0x00FFFF, 2); // Electric Blue
			pointLight1.position.set(10, 10, 10);
			const pointLight2 = new THREE.PointLight(0xFF00FF, 1.5); // Magenta
			pointLight2.position.set(-10, -10, 10);
			const pointLight3 = new THREE.PointLight(0x00FF00, 1.2); // Neon Green
			pointLight3.position.set(0, 0, 15);

			sceneRef.current.add(ambientLight, pointLight1, pointLight2, pointLight3);

			cameraRef.current.position.z = 6;

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
							y: sphere.position.y + 1,
							duration: 0.5,
							yoyo: true,
							repeat: 1,
							ease: "power2.out"
						});
					}
				}
			};

			window.addEventListener("click", handleClick);

			const animate = () => {
				requestAnimationFrame(animate);

				spheresRef.current.forEach((sphere, index) => {
					const time = Date.now() * 0.001;
					const offset = index * (Math.PI / spheresRef.current.length);
					
					sphere.rotation.x += 0.01;
					sphere.rotation.y += 0.01;

					// Orbital movement
					const radius = 3;
					sphere.position.x = Math.cos(time + offset) * radius;
					sphere.position.y = Math.sin(time + offset) * radius;
				});

				if (rendererRef.current && sceneRef.current && cameraRef.current) {
					rendererRef.current.render(sceneRef.current, cameraRef.current);
				}
			};

			animate();

			return () => {
				window.removeEventListener("resize", handleResize);
				window.removeEventListener("click", handleClick);
			};
		}
	}, []);

	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div ref={containerRef} className="absolute inset-0" />
			<div className="relative z-10 flex items-center justify-center h-full">
				<div className="text-center">
					<TrueFocus
						sentence="Welcome to Dimensions"
						manualMode={false}
						blurAmount={3}
						borderColor="#00FFFF"
						glowColor="rgba(0, 255, 255, 0.6)"
					/>
					<p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto px-4">
						Experience the future of technology at our premier tech festival
					</p>
				</div>
			</div>
		</div>
	);
};

export default AnimatedHero;