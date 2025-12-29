import { createFileRoute } from '@tanstack/react-router'
import Editor from '@monaco-editor/react';
import { useState, useMemo } from 'react';
import showdown from 'showdown';
import { FileText, Zap, Minimize2, Award, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { parseResumeMarkdown } from '@/lib/resume-parser';
import { ResumeRenderer } from '@/components/resume-renderer';
import { SAMPLE_RESUME } from '@/lib/sample-resume';
import type { ResumeStyle } from '@/lib/resume-styles';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [markdown, setMarkdown] = useState(SAMPLE_RESUME);
  const [resumeStyle, setResumeStyle] = useState<ResumeStyle>('classic');

  const htmlContent = useMemo(() => {
    const converter = new showdown.Converter();
    return converter.makeHtml(markdown);
  }, [markdown]);

  const resumeAST = useMemo(() => {
    return parseResumeMarkdown(markdown);
  }, [markdown]);

  const wordCount = markdown.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = markdown.length;

  const handleClearContent = () => {
    setMarkdown('');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([htmlContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'markdown-output.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrintPDF = () => {
    const printWindow = window.open('', '', 'width=900,height=1200');
    if (printWindow) {
      const resumeElement = document.querySelector('[data-resume-content]');
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
    <div className="flex h-full w-full bg-background text-foreground">
      {/* Left Panel - Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-sm font-semibold">Markdown Editor</h1>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">{wordCount} words</Badge>
              <Badge variant="secondary" className="text-xs">{charCount} chars</Badge>
            </div>
          </div>
        </div>
        <Separator />

        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            language="markdown"
            value={markdown}
            onChange={(value) => setMarkdown(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineHeight: 1.6,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>

        <Separator />
        <div className="p-3">
          <Button onClick={handleClearContent} variant="outline" className="w-full h-8 text-xs">
            Clear Content
          </Button>
        </div>
      </div>

      {/* Vertical Separator */}
      <Separator orientation="vertical" />

      {/* Right Panel - Preview */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-3">
          <h1 className="text-sm font-semibold">HTML Preview</h1>
        </div>
        <Separator />

        <Tabs defaultValue="preview" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2 overflow-x-auto">
            <TabsList className="bg-transparent border-b border-border h-8">
              <TabsTrigger value="preview" className="text-xs h-7">
                Resume
              </TabsTrigger>
              <TabsTrigger value="html" className="text-xs h-7">
                HTML
              </TabsTrigger>
              <TabsTrigger value="source" className="text-xs h-7">
                Source
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="preview" className="flex-1 overflow-auto px-5">
            <Select value={resumeStyle} onValueChange={(value) => setResumeStyle(value as ResumeStyle)}>
              <SelectTrigger className="w-full text-xs border-border mb-5">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
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
              </SelectContent>
            </Select>
            <div className="p-4 bg-gray-50 flex flex-col gap-2">
              <div data-resume-content>
                <ResumeRenderer resume={resumeAST} style={resumeStyle} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="html" className="flex-1 overflow-auto">
            <div className="p-4">
              <div
                className="prose prose-invert max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </TabsContent>

          <TabsContent value="source" className="flex-1 overflow-auto">
            <pre className="p-4 text-xs overflow-auto">
              <code className="text-foreground">{htmlContent}</code>
            </pre>
          </TabsContent>
        </Tabs>

        <Separator />
        <div className="p-3 flex gap-2">
          <Button onClick={handlePrintPDF} variant="default" className="flex-1 h-8 text-xs">
            Print to PDF
          </Button>
          <Button onClick={handleDownload} variant="outline" className="flex-1 h-8 text-xs">
            Download HTML
          </Button>
        </div>
      </div>
    </div>
  );
}
