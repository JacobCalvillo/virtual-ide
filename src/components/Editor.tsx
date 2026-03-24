import type { FileNode } from "../types/filesystem.types"
import { Editor as MonacoEditor, loader } from "@monaco-editor/react"

interface EditorProps {
    selectedFile: FileNode | null
    onContentChange: (content: string | undefined) => void
}

loader.init().then((monaco) => {
    monaco.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [],
        color: {
            'editor.background': '#000'
        }
    })
})

export function Editor({ selectedFile, onContentChange }: EditorProps) {

    if (!selectedFile) return <div>No file selected</div>

    return (
        <>
            <MonacoEditor
                theme="myTheme"
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