import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex flex-col h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Resumebuilder</h1>
              <p className="text-xs text-muted-foreground mt-1">Build professional resumes with precision formatting</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">v1.0.0</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card px-6 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex gap-4">
              <span>© 2025 Resumebuilder</span>
              <span>•</span>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>Made by</span>
              <Button asChild variant={"link"} className='p-0'>
                <a href='https://github.com/karlrobeck' className="font-medium">Karl Robeck Alferez</a>
              </Button>
              <span>•</span>
              <Button asChild variant={"link"} className='p-0'>
                <a href='https://github.com/karlrobeck/porfolio-generator?tab=MIT-1-ov-file' className="font-medium">MIT License</a>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  )
}
