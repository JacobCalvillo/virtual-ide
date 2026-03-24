import { useState } from "react"
import type { FileSystemNode, FileNode, FolderNode } from "../types/filesystem.types"

interface SidebarProps {
    tree: FileSystemNode
    onFileSelect: (file: FileNode) => void
    onNewNode: (node: FileSystemNode) => void
    selectedFile: FileNode | null
}

interface FileTreeNodeProps {
    tree: FileSystemNode
    onFileSelect: (file: FileNode) => void
    onNewNode: (node: FileSystemNode) => void
    selectedFile: FileNode | null
    depth: number
}

function FileTreeNode({ tree, onFileSelect, onNewNode, selectedFile, depth = 0 }: FileTreeNodeProps) {

    const [isOpen, setIsOpen] = useState<boolean>(true)

    if (tree.type === "file") {
        return (
            <div
                style={{ paddingLeft: depth * 16 }}
                onClick={() => onFileSelect(tree)}
                className={`file-item ${selectedFile?.name === tree.name ? "active" : ""}`} >
                {tree.name}
            </div>
        )
    }

    if (tree.type === "folder") {
        return (
            <div style={{ paddingLeft: depth * 16 }}>
                <span onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "▼" : "▶"} {tree.name}
                </span>
                {
                    isOpen && tree.children.map((child) => (
                        <FileTreeNode
                            selectedFile={selectedFile}
                            key={child.name}
                            tree={child}
                            onFileSelect={onFileSelect}
                            onNewNode={onNewNode}
                            depth={depth + 1}
                        />
                    ))
                }
            </div>
        )
    }
}

export default function Sidebar({ tree, onFileSelect, onNewNode, selectedFile }: SidebarProps) {
    const [isCreating, setIsCreating] = useState<"file" | "folder" | null>(null)
    const [newName, setNewName] = useState("")

    return (
        <div className="sidebar">
            <div>
                <button 
                    className="button"
                    onClick={() => setIsCreating("file")}>New File</button>
                <button 
                    className="button"
                    onClick={() => setIsCreating("folder")}>New Folder</button>
            </div>
            <div>
                <FileTreeNode
                    selectedFile={selectedFile}
                    tree={tree}
                    onFileSelect={onFileSelect}
                    onNewNode={onNewNode}
                    depth={0}
                />
                {isCreating !== null && (
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (isCreating === 'file') {
                                    const newFile: FileNode = {
                                        type: "file",
                                        name: newName,
                                        content: ""
                                    }
                                    onNewNode(newFile)
                                } else {
                                    const newFolder: FolderNode = {
                                        type: "folder",
                                        name: newName,
                                        children: []
                                    }
                                    onNewNode(newFolder)
                                }
                                setIsCreating(null)
                                setNewName("")
                            }
                        }}
                    />
                )}
            </div>
        </div>
    )
}