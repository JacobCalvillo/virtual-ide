import type { FileNode } from "../types/filesystem.types"

interface TabsProps {
    openFiles: FileNode[]
    selectedFile: FileNode | null
    onFileSelect: (file: FileNode) => void
    onClose: (file: FileNode) => void
}

export function Tabs({ openFiles, selectedFile, onFileSelect, onClose }: TabsProps) {
    return (
        <div className="tabs">
            {openFiles.map(file => (
                <div key={file.name} className={`tab ${selectedFile?.name === file.name ? "active": ""}`}>
                    <span onClick={() => onFileSelect(file)}>{file.name}</span>
                    <button onClick={() => onClose(file)}>x</button>
                </div>
            ))}
        </div>
    )
}