import type { FileNode } from "../types/filesystem.types"
import { Editor as MonacoEditor } from "@monaco-editor/react"

interface EditorProps {
    selectedFile: FileNode | null
    onContentChange: (content: string | undefined) => void
}

export function Editor({ selectedFile, onContentChange }: EditorProps) {

    if (!selectedFile) return <div>No file selected</div>

    return (
        <>
            <MonacoEditor
                options={{
                    fontFamily: 'Jetbrains-Mono',
                }}
                value={selectedFile.content}
                height="100%"
                language="typescript"
                onChange={onContentChange}
            />
        </>

    )
}