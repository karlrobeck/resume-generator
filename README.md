# Resumebuilder

Build professional resumes with precision formatting. A modern, feature-rich resume builder that transforms markdown into beautifully formatted resumes with multiple style options.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue)

🚀 **[Live Demo](https://karlrobeck.github.io/resume-generator/)** - Try it out right now!

## Features

✨ **Multiple Resume Styles** - Choose from 5 professionally designed formats:
- Classic (Georgia serif, timeless design)
- Modern (system fonts, contemporary layout)
- Minimal (compact, clean aesthetic)
- Professional (Cambria formal, corporate style)
- Creative (red accents, unique design)

🎨 **Real-time Preview** - See your resume update instantly as you edit the markdown source

📝 **Markdown Editor** - Intuitive Monaco editor with syntax highlighting for writing resume content

🖨️ **Print to PDF** - Export your resume directly as a PDF-ready format

💾 **Download HTML** - Save your resume as a standalone HTML file

📊 **Live Statistics** - Word and character count displayed in real-time

🔄 **Smart Markdown Parser** - Intelligent parsing that auto-detects email, phone, and social media links

🌓 **Theme Switcher** - Toggle between Light, Dark, and System-preference themes with a elegant dropdown menu

📱 **Mobile Responsive** - Fully responsive design with optimized layouts for all screen sizes. Mobile mode features tab-based navigation for editor and preview panels

📲 **Progressive Web App (PWA)** - Install as a native app on any device with offline support, automatic updates, and seamless installation experience

## Tech Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TanStack React Router** - Client-side routing
- **Monaco Editor** - Professional code editor
- **Tailwind CSS v4** - Utility-first styling with Vite plugin
- **Shadcn UI** - High-quality React components
- **Lucide React** - Beautiful icon library
- **Showdown** - Markdown to HTML conversion
- **Vite Plugin PWA** - Progressive Web App support with service workers
- **Sharp** - Image processing for PWA icons
- **Bun** - Fast JavaScript runtime

## Getting Started

### Prerequisites

- Bun runtime installed ([Download Bun](https://bun.sh))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-generator
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Toggle Theme**: Click the theme switcher button in the header to choose between Light, Dark, or System theme preference
2. **Edit Resume**: Use the left panel markdown editor (desktop) or Editor tab (mobile) to write your resume content
3. **Select Style**: Choose a resume format from the dropdown at the top of the preview
4. **Preview**: View your formatted resume in the Preview tab
5. **Export**:
   - Click "Print to PDF" to print or save as PDF
   - Click "Download HTML" to save as an HTML file
6. **View Source**: Check the HTML or Source tabs to see the generated code

**Desktop Layout**: Side-by-side resizable panels for editor and preview  
**Mobile Layout**: Tab-based interface with Editor and Preview tabs for optimal mobile experience

## Progressive Web App (PWA)

This application is fully configured as a Progressive Web App, enabling you to:

- **Install Locally** - Add Resume Builder to your home screen on any device
- **Work Offline** - Continue editing and viewing resumes without internet connection
- **Fast Loading** - Service worker caches assets for instant app startup
- **Auto Updates** - Automatically fetches new versions in the background
- **Native Feel** - Runs as a standalone app without browser UI chrome

### Installing the App

**Desktop (Chrome/Edge/Firefox):**
1. Visit the live demo URL
2. Look for "Install" button in the address bar or menu
3. Click to install as a desktop app

**Mobile (Android):**
1. Open the site in your browser
2. Tap the menu and select "Install app" or "Add to Home Screen"
3. Launch from your home screen

**iOS/macOS:**
1. Open the site in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

## Resume Markdown Format

The parser supports the following sections:

```markdown
# [Your Name]
email@example.com • (555) 123-4567 • github.com/yourname

## Summary
Brief professional summary about yourself.

## Experience

### Job Title
**Company Name** | Start Date – End Date
- Achievement or responsibility
- Another key accomplishment

### Another Job
**Previous Company** | Start Date – End Date
- Project or achievement description

## Education

### Degree Name
**University Name** | Graduation Date
GPA: 3.8/4.0 | Relevant Coursework: Courses

## Skills
- Skill Category: JavaScript, TypeScript, React, Node.js
- Another Category: Skill, Skill, Skill

## Certifications
- **Certification Name** | Issuing Organization | Date

## Projects
### Project Name
Brief description of the project and your role.

## Awards
- **Award Name** | Awarding Organization | Date
```

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx  # Theme switcher dropdown
│   │   ├── resizable.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   └── tabs.tsx
│   ├── resume-renderer.tsx     # Resume output renderer
│   ├── theme-provider.tsx      # Theme context provider
│   └── theme-switcher.tsx      # Theme toggle component
├── hooks/
│   └── use-mobile.tsx          # Mobile detection hook
├── lib/
│   ├── resume-parser.ts        # Markdown to AST converter
│   ├── resume-styles.ts        # Theme configurations
│   ├── sample-resume.ts        # Example resume data
│   └── utils.ts
├── routes/
│   ├── __root.tsx              # Root layout with header/footer
│   └── index.tsx               # Main editor page
└── types/
    └── resume.ts               # TypeScript interfaces
```

## Architecture

### Resume Parser (`resume-parser.ts`)
Intelligently parses markdown content into a structured Resume AST (Abstract Syntax Tree). Features include:
- Automatic section detection
- Email and phone number parsing
- URL detection for social media profiles
- Date range parsing and formatting
- Support for nested list structures

### Resume Renderer (`resume-renderer.tsx`)
React component that renders the Resume AST with dynamic styling. Supports:
- Conditional section rendering
- Theme-based styling via CSS variables
- Print-friendly CSS
- Responsive layout

### Style System (`resume-styles.ts`)
Centralized theme configuration with 5 complete style definitions. Each style includes:
- Font family and sizes
- Color palette
- Spacing and margins
- Border and divider styles
- Section-specific styling

## Available Scripts

```bash
# Development server with hot reload
bun run dev

# Generate routes
bun run generate-routes

# Build for production (Vite)
bun run build

# Preview production build
bun run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Author

**Karl Robeck Alferez**

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com) for component library
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Tailwind CSS](https://tailwindcss.com) for styling framework
- [TanStack Router](https://tanstack.com/router) for routing
