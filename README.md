# Aether UI - AI Interface Prototype

A comprehensive AI interface prototype built with Next.js, React, TypeScript, and Tailwind CSS. This project demonstrates modern web development practices with a focus on accessibility, user experience, and component-driven architecture.

## 🚀 Live Demo

[Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/your-username/aether-ui)

## 📋 Table of Contents

- [Research](#research)
- [Design](#design)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Component Library](#component-library)
- [API Documentation](#api-documentation)
- [Accessibility](#accessibility)
- [Contributing](#contributing)

## 🔬 Research

### AI UI Analysis

We analyzed leading AI interfaces to extract the most compelling features and design patterns:

#### 1. OpenAI Playground
**Strengths:**
- Clean parameter controls with real-time feedback
- Excellent model selection interface
- Clear separation between input and output areas
- Comprehensive token usage tracking

**Key Features Adopted:**
- Parameter sliders with live values
- Model dropdown with detailed information
- Token counting and limits

#### 2. Anthropic Claude UI
**Strengths:**
- Conversational chat interface
- Excellent message formatting and readability
- Clear role differentiation (user vs assistant)
- Smooth scrolling and message management

**Key Features Adopted:**
- Chat bubble design with role indicators
- Message copying functionality
- Conversation export/import

#### 3. Hugging Face Spaces
**Strengths:**
- Template-based approach for different use cases
- Community-driven prompt sharing
- Diverse model ecosystem integration
- Clear documentation and examples

**Key Features Adopted:**
- Template system with parameter substitution
- Saved prompts functionality
- Category-based organization

#### 4. Microsoft Copilot Lab
**Strengths:**
- Professional interface design
- Advanced parameter controls
- Integration with development workflows
- Comprehensive settings management

**Key Features Adopted:**
- Professional sidebar layout
- Advanced parameter panel
- Theme switching capabilities

#### 5. Perplexity AI
**Strengths:**
- Search-integrated AI responses
- Source citations and references
- Clean, readable output formatting
- Mobile-responsive design

**Key Features Adopted:**
- Search functionality within conversations
- Responsive design patterns
- Clean typography and spacing

### Compelling Features Extracted

1. **Intelligent Model Selection** - Dropdown with provider information, capabilities, and token limits
2. **Template System** - Pre-built prompts with parameter substitution
3. **Advanced Parameter Controls** - Sliders and inputs for fine-tuning model behavior
4. **Conversation Management** - Export/import, search, and organization features
5. **Professional UI/UX** - Clean design with excellent accessibility
6. **Theme System** - Light/dark mode with user preferences

## 🎨 Design

### Design System

Our design system is built on Tailwind CSS with a focus on accessibility and consistency.

#### Color Palette
- **Primary**: `oklch(0.205 0 0)` - Professional dark gray for primary actions
- **Secondary**: `oklch(0.97 0 0)` - Light gray for secondary elements
- **Accent**: `oklch(0.488 0.243 264.376)` - Blue accent for highlights
- **Background**: `oklch(1 0 0)` / `oklch(0.145 0 0)` - Light/dark backgrounds
- **Foreground**: `oklch(0.145 0 0)` / `oklch(0.985 0 0)` - Text colors

#### Typography
- **Primary Font**: Geist Sans - Modern, readable sans-serif
- **Monospace Font**: Geist Mono - For code and technical content
- **Scale**: 0.875rem (small) → 1rem (base) → 1.125rem (large)

#### Spacing System
- **Base Unit**: 0.25rem (4px)
- **Component Spacing**: 1rem (16px) standard gap
- **Section Spacing**: 1.5rem (24px) between major sections
- **Page Margins**: 1rem mobile, 2rem desktop

#### Component Mapping

**Sidebar Layout**
\`\`\`tsx
<div className="flex h-screen">
  <Sidebar className="w-80 border-r" />
  <main className="flex-1 flex flex-col" />
</div>
\`\`\`

**Chat Interface**
\`\`\`tsx
<Card className={cn(
  "relative group",
  role === "user" ? "ml-12 bg-primary/5" : "mr-12 bg-muted/50"
)}>
\`\`\`

**Parameter Controls**
\`\`\`tsx
<Slider
  min={0} max={2} step={0.1}
  className="w-full"
  onValueChange={updateParameter}
/>
\`\`\`

### Responsive Breakpoints
- **Mobile**: < 768px - Single column, collapsible sidebar
- **Tablet**: 768px - 1024px - Adaptive layout
- **Desktop**: > 1024px - Full sidebar + main content

## ✨ Features

### Core Functionality
- **Model Selection**: Choose from multiple AI providers (OpenAI, Anthropic, Google, Meta, Mistral)
- **Parameter Control**: Fine-tune temperature, max tokens, top-p, and penalties
- **Template System**: Pre-built prompts with parameter substitution
- **Chat Interface**: Conversational AI interaction with message history
- **Export/Import**: Save and load chat sessions as JSON

### Advanced Features
- **Saved Prompts**: Local storage for custom prompt templates
- **Search**: Find specific messages within conversations
- **Keyboard Shortcuts**: Power user navigation (Ctrl+Enter, Ctrl+K, Ctrl+S)
- **Theme System**: Light/dark mode with system preference detection
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader compatibility

### Developer Features
- **TypeScript**: Full type safety throughout the application
- **Component Library**: Reusable UI components with Storybook documentation
- **Mock APIs**: Realistic API simulation for development and testing
- **Responsive Design**: Mobile-first approach with desktop enhancements

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks and context
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS v4** - Utility-first styling with design tokens

### UI Components
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management

### Development Tools
- **Storybook** - Component development and documentation
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Vercel Analytics** - Performance monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/aether-ui.git
cd aether-ui
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Start development server**
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Storybook Development

\`\`\`bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
\`\`\`

Navigate to [http://localhost:6006](http://localhost:6006)

### Building for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## 📁 Project Structure

\`\`\`
aether-ui/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── chat/                 # Chat completion endpoint
│   │   ├── models/               # AI models data
│   │   └── templates/            # Prompt templates
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── accessibility-provider.tsx
│   ├── aether-interface.tsx      # Main interface layout
│   ├── aether-ui.tsx            # Root component
│   ├── chat-area.tsx            # Chat interface
│   ├── model-selector.tsx       # AI model selection
│   ├── parameters-panel.tsx     # Model parameters
│   ├── prompt-editor.tsx        # Prompt input and templates
│   ├── saved-prompts.tsx        # Saved prompt management
│   ├── skip-nav.tsx             # Accessibility navigation
│   ├── template-parameter-form.tsx
│   └── theme-toggle.tsx         # Theme switching
├── contexts/                     # React contexts
│   └── session-context.tsx      # Session state management
├── hooks/                        # Custom React hooks
│   ├── use-announce.ts          # Screen reader announcements
│   ├── use-focus-trap.ts        # Focus management
│   ├── use-keyboard-shortcuts.ts
│   └── use-local-storage.ts     # Local storage utilities
├── lib/                          # Utility functions
│   └── utils.ts                 # Common utilities (cn, etc.)
├── stories/                      # Storybook stories
│   ├── Button.stories.tsx
│   ├── ChatBubble.stories.tsx
│   ├── Dialog.stories.tsx
│   ├── ModelSelector.stories.tsx
│   └── Slider.stories.tsx
├── types/                        # TypeScript type definitions
│   └── index.ts                 # Shared types
├── .storybook/                   # Storybook configuration
│   ├── main.js
│   └── preview.js
└── package.json                  # Dependencies and scripts
\`\`\`

## 📚 Component Library

### Core Components

#### Button
Versatile button component with multiple variants and sizes.
\`\`\`tsx
<Button variant="default" size="md" onClick={handleClick}>
  Click me
</Button>
\`\`\`

#### Slider
Range input component for numeric values.
\`\`\`tsx
<Slider
  min={0}
  max={100}
  step={1}
  value={[value]}
  onValueChange={setValue}
/>
\`\`\`

#### Dialog
Modal dialog component with accessibility features.
\`\`\`tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
\`\`\`

#### ChatBubble
Message display component for chat interfaces.
\`\`\`tsx
<ChatBubble
  role="user"
  content="Hello, AI!"
  timestamp={new Date()}
  onCopy={handleCopy}
/>
\`\`\`

### Custom Components

#### ModelSelector
AI model selection with detailed information.
\`\`\`tsx
<ModelSelector
  selectedModel={model}
  onModelSelect={setModel}
  loading={false}
/>
\`\`\`

#### ParametersPanel
Model parameter controls with sliders and inputs.
\`\`\`tsx
<ParametersPanel />
\`\`\`

#### PromptEditor
Prompt input with template support.
\`\`\`tsx
<PromptEditor />
\`\`\`

## 🔌 API Documentation

### Models API
**GET** `/api/models`

Returns available AI models with metadata.

\`\`\`json
{
  "models": [
    {
      "id": "gpt-4-turbo",
      "name": "GPT-4 Turbo",
      "provider": "OpenAI",
      "description": "Most capable GPT-4 model",
      "maxTokens": 4096,
      "supportedFeatures": ["chat", "completion"]
    }
  ],
  "total": 5
}
\`\`\`

### Templates API
**GET** `/api/templates`

Returns prompt templates with parameters.

\`\`\`json
{
  "templates": [
    {
      "id": "creative-writing",
      "name": "Creative Writing Assistant",
      "description": "Help with creative writing tasks",
      "category": "Creative",
      "content": "You are a creative writing assistant...",
      "parameters": [
        {
          "name": "topic",
          "type": "string",
          "defaultValue": "",
          "description": "Writing topic"
        }
      ]
    }
  ],
  "total": 5
}
\`\`\`

### Chat API
**POST** `/api/chat`

Process chat completion request.

\`\`\`json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, AI!"
    }
  ],
  "model": "gpt-4-turbo",
  "parameters": {
    "temperature": 0.7,
    "maxTokens": 2048
  }
}
\`\`\`

## ♿ Accessibility

### Features
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Comprehensive ARIA labels and live regions
- **Focus Management**: Proper focus trapping in modals and navigation
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects user motion preferences
- **Skip Navigation**: Quick access to main content

### Keyboard Shortcuts
- **Ctrl/Cmd + Enter**: Send message
- **Ctrl/Cmd + K**: Clear chat
- **Ctrl/Cmd + S**: Export chat
- **Tab**: Navigate between elements
- **Escape**: Close modals/dropdowns

### Screen Reader Support
- Live announcements for state changes
- Descriptive labels for all controls
- Proper heading hierarchy
- Role and state information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update Storybook stories for new components
- Ensure accessibility compliance
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the excellent component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives

---

Built with ❤️ using modern web technologies
