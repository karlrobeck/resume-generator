import {
	createMemoryHistory,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { routeTree } from "./routeTree.gen";

const elem = document.getElementById("root");
if (!elem) {
	throw new Error("Root element not found");
}

const memoryHistory = createMemoryHistory({
	initialEntries: ["/"],
});

const router = createRouter({
	routeTree,
	Wrap: ({ children }) => (
		<ThemeProvider defaultTheme="dark" storageKey="shadcn-ui-theme">
			{children}
		</ThemeProvider>
	),
	history: memoryHistory,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const app = (
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);

createRoot(elem).render(app);
