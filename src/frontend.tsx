import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { Router, RouterProvider, createMemoryHistory, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";

const elem = document.getElementById("root")!;

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
})

const router = new Router({
  routeTree,
  Wrap: ({ children }) => (
    <ThemeProvider defaultTheme="dark" storageKey="shadcn-ui-theme">
      {children}
    </ThemeProvider>
  ),
  history:memoryHistory
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

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
