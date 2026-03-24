# Virtual IDE

A code editor that runs entirely in the browser, built as a learning project with React and TypeScript.

## Stack

- **React 19** + **TypeScript**
- **Vite** as bundler and dev server
- **Monaco Editor** (`@monaco-editor/react`) for the code editor
- **localStorage** for filesystem persistence

## Features

- **Recursive file tree** — supports infinitely nested folders
- **Create files and folders** from the Sidebar
- **Code editor** with TypeScript syntax highlighting via Monaco
- **Open file tabs** VS Code style
- **Auto persistence** — the file tree is saved to localStorage on every edit
- **Delete files and folders** from the tree

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <project-url>
cd virtual-ide

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Build for production

```bash
npm run build
```

## Architecture

```
src/
├── components/
│   ├── Sidebar.tsx        # Recursive file tree + node creation
│   ├── Editor.tsx         # Monaco Editor with syntax highlighting
│   └── Tabs.tsx           # Open file tabs
├── hooks/
│   └── useFileSystem.ts   # Filesystem logic encapsulated
├── types/
│   └── filesystem.types.ts
├── utils/
│   └── utils.ts           # Pure tree transformation functions
└── App.tsx
```

## Data Model

```typescript
type FileNode = {
    type: "file"
    name: string
    content: string
}

type FolderNode = {
    type: "folder"
    name: string
    children: (FileNode | FolderNode)[]
}

type FileSystemNode = FileNode | FolderNode

type AppState = {
    tree: FileSystemNode        // full file tree
    selectedFileName: string | null
    openFilesNames: string[]
}
```

## Contributing

Contributions are welcome! Here's how to get started:

### Fork & Pull Request Workflow

1. Fork the repository
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "[feat]: add your feature description"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request describing your changes

### Code Style Guidelines

- Use **TypeScript** strictly — avoid `any` and type assertions (`as`)
- Keep components focused on a **single responsibility**
- Place business logic in hooks or `utils/`, not in components
- Use **pure functions** for tree transformations
- Follow the existing folder structure

### Reporting Bugs

If you find a bug, please open an issue including:
- A clear description of the problem
- Steps to reproduce it
- Expected vs actual behavior
- Browser and OS version

### Open Issues / Good First Issues

Check the [Roadmap](#roadmap) section for features that still need to be implemented. Any of those are great starting points for contributions.