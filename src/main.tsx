import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@app";
import { GameProvider } from "@providers/game-provider";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<GameProvider>
			<App />
		</GameProvider>
	</StrictMode>,
);
