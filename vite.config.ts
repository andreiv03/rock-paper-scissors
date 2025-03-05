import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	base: "/rock-paper-scissors/",
	plugins: [react()],
	resolve: {
		alias: {
			"@app": path.resolve(__dirname, "src/App"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@components": path.resolve(__dirname, "src/components"),
			"@contexts": path.resolve(__dirname, "src/contexts"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@providers": path.resolve(__dirname, "src/providers"),
			"@styles": path.resolve(__dirname, "src/styles"),
			"@typings": path.resolve(__dirname, "src/typings"),
			"@utils": path.resolve(__dirname, "src/utils"),
		},
	},
});
