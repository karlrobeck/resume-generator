import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import packageMetadata from "../../package.json" with {type:"json"}

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const isMobile = useIsMobile();

	return (
		<div className="flex flex-col h-screen bg-background text-foreground">
			{/* Header */}
			<header className="border-b border-border bg-card px-4 md:px-6 py-3 md:py-4">
				<div className="flex items-center justify-between gap-2">
					<div className="flex-1 min-w-0">
						<h1 className="text-xl md:text-2xl font-bold tracking-tight truncate">Resumebuilder</h1>
						{!isMobile && (
							<p className="text-xs text-muted-foreground mt-1">
								Build professional resumes with precision formatting
							</p>
						)}
					</div>
					<div className="flex items-center gap-2 md:gap-4 shrink-0">
						<ThemeSwitcher />
						{!isMobile && (
							<div className="text-sm text-muted-foreground">
								<span className="font-medium">v{packageMetadata.version}</span>
							</div>
						)}
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1 overflow-hidden">
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="border-t border-border bg-card px-4 md:px-6 py-2 md:py-3">
				{!isMobile ? (
					<div className="flex items-center justify-between text-xs text-muted-foreground">
						<div className="flex gap-4">
							<span>© 2025 Resumebuilder</span>
							<span>•</span>
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-foreground transition-colors"
							>
								GitHub
							</a>
						</div>
						<div className="flex items-center gap-2">
							<span>Made by</span>
							<Button asChild variant={"link"} className="p-0 h-auto">
								<a href="https://github.com/karlrobeck" className="font-medium">
									Karl Robeck Alferez
								</a>
							</Button>
							<span>•</span>
							<Button asChild variant={"link"} className="p-0 h-auto">
								<a
									href="https://github.com/karlrobeck/porfolio-generator?tab=MIT-1-ov-file"
									className="font-medium"
								>
									MIT License
								</a>
							</Button>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground text-center">
						<div className="font-medium">© 2025 Resumebuilder</div>
						<div className="flex items-center gap-0 justify-center">
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-foreground transition-colors"
							>
								GitHub
							</a>
							<span className="px-1">•</span>
							<Button asChild variant={"link"} className="p-0 h-auto text-xs">
								<a href="https://github.com/karlrobeck" className="font-medium">
									Karl Robeck
								</a>
							</Button>
						</div>
					</div>
				)}
			</footer>
		</div>
	);
}
