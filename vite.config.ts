import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tailwindcss(),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
		VitePWA({
			registerType: "autoUpdate",
			strategies: "generateSW",
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
			manifest: {
				name: "Resume Builder",
				short_name: "Resume Builder",
				description: "Build and preview your resume in real-time",
				theme_color: "#ffffff",
				background_color: "#ffffff",
				display: "standalone",
				scope: "/resume-generator/",
				start_url: "/resume-generator/",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "pwa-maskable-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "pwa-maskable-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				screenshots: [
					{
						src: "screenshot-1.png",
						sizes: "540x720",
						form_factor: "narrow",
					},
					{
						src: "screenshot-2.png",
						sizes: "1280x720",
						form_factor: "wide",
					},
				],
				categories: ["productivity"],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2,ttf,eot}"],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365,
							},
						},
					},
				],
			},
		}),
	],
	base: "/resume-generator/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		outDir: "dist",
		sourcemap: false,
	},
	server: {
		port: 5173,
		open: true,
	},
});
