import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import showdown from "showdown";
import { ResumeRenderer } from "@/components/resume-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { parseResumeMarkdown } from "@/lib/resume-parser";
import type { ResumeStyle } from "@/lib/resume-styles";
import { SAMPLE_RESUME } from "@/lib/sample-resume";

const Editor = lazy(() => import("@monaco-editor/react"));
const FileText = lazy(() => import("lucide-react").then((m) => ({ default: m.FileText })));
const Zap = lazy(() => import("lucide-react").then((m) => ({ default: m.Zap })));
const Minimize2 = lazy(() => import("lucide-react").then((m) => ({ default: m.Minimize2 })));
const Award = lazy(() => import("lucide-react").then((m) => ({ default: m.Award })));
const Sparkles = lazy(() => import("lucide-react").then((m) => ({ default: m.Sparkles })));

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const isMobile = useIsMobile();
	const [markdown, setMarkdown] = useState(SAMPLE_RESUME);
	const [resumeStyle, setResumeStyle] = useState<ResumeStyle>("classic");
	const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

	const htmlContent = useMemo(() => {
		const converter = new showdown.Converter();
		return converter.makeHtml(markdown);
	}, [markdown]);

	const resumeAST = useMemo(() => {
		return parseResumeMarkdown(markdown);
	}, [markdown]);

	const wordCount = markdown
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
	const charCount = markdown.length;

	const handleClearContent = () => {
		setMarkdown("");
	};

	const handleDownload = () => {
		const element = document.createElement("a");
		const file = new Blob([htmlContent], { type: "text/html" });
		element.href = URL.createObjectURL(file);
		element.download = "markdown-output.html";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const handlePrintPDF = () => {
		const printWindow = window.open("", "", "width=900,height=1200");
		if (printWindow) {
			const resumeElement = document.querySelector("[data-resume-content]");
			if (resumeElement) {
				printWindow.document.write(resumeElement.innerHTML);
				printWindow.document.write(`
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Georgia, serif; color: black; background: white; }
            @media print {
              body { margin: 0; padding: 0; }
              .no-print { display: none; }
            }
          </style>
        `);
				printWindow.document.close();
				setTimeout(() => {
					printWindow.print();
				}, 250);
			}
		}
	};

	return (
		isMobile ? (
			<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "editor" | "preview")} className="flex flex-col h-full w-full bg-background text-foreground">
				<div className="px-4 py-2 border-b border-border">
					<TabsList className="bg-transparent border-b border-border w-full">
						<TabsTrigger value="editor" className="text-xs h-8 flex-1">
							Editor
						</TabsTrigger>
						<TabsTrigger value="preview" className="text-xs h-8 flex-1">
							Preview
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="editor" className="flex-1 flex flex-col overflow-hidden px-0 mt-0">
					<div className="px-4 py-3 border-b border-border">
						<div className="flex items-center justify-between gap-2">
							<h1 className="text-sm font-semibold">Markdown Editor</h1>
							<div className="flex gap-1">
								<Badge variant="secondary" className="text-xs px-2 py-1">
									{wordCount}
								</Badge>
								<Badge variant="secondary" className="text-xs px-2 py-1">
									{charCount}
								</Badge>
							</div>
						</div>
					</div>

					<div className="flex-1 overflow-hidden">
						<Suspense fallback={<div className="w-full h-full bg-slate-900" />}>
							<Editor
								height="100%"
								language="markdown"
								value={markdown}
								onChange={(value) => setMarkdown(value || "")}
								theme="vs-dark"
								options={{
									minimap: { enabled: false },
									fontSize: 12,
									lineHeight: 1.6,
									wordWrap: "on",
									scrollBeyondLastLine: false,
									formatOnPaste: true,
									formatOnType: true,
								}}
							/>
						</Suspense>
					</div>

					<div className="p-2 border-t border-border">
						<Button
							onClick={handleClearContent}
							variant="outline"
							className="w-full h-8 text-xs"
						>
							Clear Content
						</Button>
					</div>
				</TabsContent>
				<TabsContent value="preview" className="flex-1 flex flex-col overflow-hidden px-0 mt-0">
					<Tabs
						defaultValue="resume"
						className="flex-1 flex flex-col overflow-hidden"
					>
						<div className="px-4 py-2 border-b border-border overflow-x-auto">
							<TabsList className="bg-transparent border-b border-border h-8">
								<TabsTrigger value="resume" className="text-xs h-7">
									Resume
								</TabsTrigger>
								<TabsTrigger value="source" className="text-xs h-7">
									Source
								</TabsTrigger>
							</TabsList>
						</div>
						<TabsContent value="resume" className="flex-1 overflow-auto px-3 py-3 flex flex-col">
							<Select
								value={resumeStyle}
								onValueChange={(value) => setResumeStyle(value as ResumeStyle)}
							>
								<SelectTrigger className="w-full text-xs border-border mb-3 h-8">
									<SelectValue placeholder="Select style" />
								</SelectTrigger>
								<SelectContent>
									<Suspense fallback={null}>
										<SelectItem value="classic">
											<div className="flex items-center gap-2">
												<FileText className="w-3 h-3" />
												<span>Classic</span>
											</div>
										</SelectItem>
										<SelectItem value="modern">
											<div className="flex items-center gap-2">
												<Zap className="w-3 h-3" />
												<span>Modern</span>
											</div>
										</SelectItem>
										<SelectItem value="minimal">
											<div className="flex items-center gap-2">
												<Minimize2 className="w-3 h-3" />
												<span>Minimal</span>
											</div>
										</SelectItem>
										<SelectItem value="professional">
											<div className="flex items-center gap-2">
												<Award className="w-3 h-3" />
												<span>Professional</span>
											</div>
										</SelectItem>
										<SelectItem value="creative">
											<div className="flex items-center gap-2">
												<Sparkles className="w-3 h-3" />
												<span>Creative</span>
											</div>
										</SelectItem>
									</Suspense>
								</SelectContent>
							</Select>
							<div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-md p-3 flex flex-col gap-2 overflow-auto w-full">
								<div data-resume-content className="w-full">
									<ResumeRenderer resume={resumeAST} style={resumeStyle} />
								</div>
							</div>
						</TabsContent>
						<TabsContent value="source" className="flex-1 overflow-auto">
							<Suspense fallback={<div className="w-full h-full bg-slate-900" />}>
								<Editor
									height="100%"
									language="html"
									value={htmlContent}
									theme="vs-dark"
									options={{
										readOnly: true,
										minimap: { enabled: false },
										fontSize: 11,
										lineHeight: 1.5,
										wordWrap: "on",
										scrollBeyondLastLine: false,
										formatOnPaste: false,
										formatOnType: false,
									}}
								/>
							</Suspense>
						</TabsContent>
					</Tabs>

					<div className="p-2 border-t border-border flex gap-1">
						<Button
							onClick={handlePrintPDF}
							variant="default"
							className="flex-1 h-8 text-xs"
						>
							PDF
						</Button>
						<Button
							onClick={handleDownload}
							variant="outline"
							className="flex-1 h-8 text-xs"
						>
							HTML
						</Button>
					</div>
				</TabsContent>
			</Tabs>
		) : (
			<ResizablePanelGroup className="flex h-full w-full bg-background text-foreground">
				<ResizablePanel className="flex-1 flex flex-col overflow-hidden">
					{/* Left Panel - Editor */}
					<div className="px-4 py-3">
						<div className="flex items-center justify-between gap-4">
							<div>
								<h1 className="text-sm font-semibold">Markdown Editor</h1>
							</div>
							<div className="flex gap-2">
								<Badge variant="secondary" className="text-xs">
									{wordCount} words
								</Badge>
								<Badge variant="secondary" className="text-xs">
									{charCount} chars
								</Badge>
							</div>
						</div>
					</div>
					<Separator />

					<div className="flex-1 overflow-hidden">
						<Suspense fallback={<div className="w-full h-full bg-slate-900" />}>
							<Editor
								height="100%"
								language="markdown"
								value={markdown}
								onChange={(value) => setMarkdown(value || "")}
								theme="vs-dark"
								options={{
									minimap: { enabled: false },
									fontSize: 14,
									lineHeight: 1.6,
									wordWrap: "on",
									scrollBeyondLastLine: false,
									formatOnPaste: true,
									formatOnType: true,
								}}
							/>
						</Suspense>
					</div>

					<Separator />
					<div className="p-3">
						<Button
							onClick={handleClearContent}
							variant="outline"
							className="w-full h-8 text-xs"
						>
							Clear Content
						</Button>
					</div>
				</ResizablePanel>
				{/* Vertical Separator */}
				<ResizableHandle />
				<ResizablePanel className="flex-1 flex flex-col overflow-hidden">
					{/* Right Panel - Preview */}
					<div className="px-4 py-3">
						<h1 className="text-sm font-semibold">HTML Preview</h1>
					</div>
					<Separator />
					<Tabs
						defaultValue="preview"
						className="flex-1 flex flex-col overflow-hidden"
					>
						<div className="px-4 py-2 overflow-x-auto">
							<TabsList className="bg-transparent border-b border-border h-8">
								<TabsTrigger value="preview" className="text-xs h-7">
									Resume
								</TabsTrigger>
								<TabsTrigger value="source" className="text-xs h-7">
									Source
								</TabsTrigger>
							</TabsList>
						</div>
						<TabsContent value="preview" className="flex-1 overflow-auto px-5">
							<Select
								value={resumeStyle}
								onValueChange={(value) => setResumeStyle(value as ResumeStyle)}
							>
								<SelectTrigger className="w-full text-xs border-border mb-5">
									<SelectValue placeholder="Select style" />
								</SelectTrigger>
								<SelectContent>
									<Suspense fallback={null}>
										<SelectItem value="classic">
											<div className="flex items-center gap-2">
												<FileText className="w-4 h-4" />
												<span>Classic</span>
											</div>
										</SelectItem>
										<SelectItem value="modern">
											<div className="flex items-center gap-2">
												<Zap className="w-4 h-4" />
												<span>Modern</span>
											</div>
										</SelectItem>
										<SelectItem value="minimal">
											<div className="flex items-center gap-2">
												<Minimize2 className="w-4 h-4" />
												<span>Minimal</span>
											</div>
										</SelectItem>
										<SelectItem value="professional">
											<div className="flex items-center gap-2">
												<Award className="w-4 h-4" />
												<span>Professional</span>
											</div>
										</SelectItem>
										<SelectItem value="creative">
											<div className="flex items-center gap-2">
												<Sparkles className="w-4 h-4" />
												<span>Creative</span>
											</div>
										</SelectItem>
									</Suspense>
								</SelectContent>
							</Select>
							<div className="p-4 bg-gray-50 dark:bg-gray-900 flex flex-col gap-2">
								<div data-resume-content>
									<ResumeRenderer resume={resumeAST} style={resumeStyle} />
								</div>
							</div>
						</TabsContent>
						<TabsContent value="source" className="flex-1 overflow-auto">
							<Suspense fallback={<div className="w-full h-full bg-slate-900" />}>
								<Editor
									height="100%"
									language="html"
									value={htmlContent}
									theme="vs-dark"
									options={{
										readOnly: true,
										minimap: { enabled: false },
										fontSize: 14,
										lineHeight: 1.6,
										wordWrap: "on",
										scrollBeyondLastLine: false,
										formatOnPaste: false,
										formatOnType: false,
									}}
								/>
							</Suspense>
						</TabsContent>
					</Tabs>
					<Separator />
					<div className="p-3 flex gap-2">
						<Button
							onClick={handlePrintPDF}
							variant="default"
							className="flex-1 h-8 text-xs"
						>
							Print to PDF
						</Button>
						<Button
							onClick={handleDownload}
							variant="outline"
							className="flex-1 h-8 text-xs"
						>
							Download HTML
						</Button>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		)
	);
}
