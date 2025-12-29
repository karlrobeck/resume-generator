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
					<div className="flex-1 min-w-0 flex items-center gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen flex-shrink-0">
							<path d="M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34"/>
							<path d="M14 2v5a1 1 0 0 0 1 1h5"/>
							<path d="M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z"/>
						</svg>
						<div>
							<h1 className="text-xl md:text-2xl font-bold tracking-tight truncate">Resumebuilder</h1>
							{!isMobile && (
								<p className="text-xs text-muted-foreground mt-1">
									Build professional resumes with precision formatting
								</p>
							)}
						</div>
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
