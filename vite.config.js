import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import postcssPresetEnv from "postcss-preset-env";
import purgeCSSPlugin from "@fullhuman/postcss-purgecss";

export default defineConfig({
	plugins: [
		createHtmlPlugin({
			minify: true,
		}),
	],
	css: {
		postcss: {
			plugins: [
				postcssPresetEnv,
				purgeCSSPlugin({
					content: ["./index.html"],
					variables: true,
					keyframes: true,
				}),
			],
		},
	},
});
