import { useState } from "react"
import type { FileSystemNode, FileNode, FolderNode } from "../types/filesystem.types"

interface SidebarProps {
    tree: FileSystemNode
    onFileSelect: (file: FileNode) => void
    onNewNode: (node: FileSystemNode) => void
    selectedFile: FileNode | null
}

function FileTreeNode({ tree, onFileSelect, onNewNode, selectedFile }: SidebarProps) {
    if (tree.type === "file") {
        return (
            <div onClick={() => onFileSelect(tree)} className={`file-item ${selectedFile?.name === tree.name ? "active" : ""}`} >
                {tree.name}
            </div>
        )
    }
    
    if (tree.type === "folder") {
        return (
            <div>
                <span>{tree.name}</span>
                {
                    tree.children.map((child) => (
                        <FileTreeNode
                            selectedFile={selectedFile}
                            key={child.name}
                            tree={child}
                            onFileSelect={onFileSelect}
                            onNewNode={onNewNode}
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
                <button onClick={() => setIsCreating("file")}>New File</button>
                <button onClick={() => setIsCreating("folder")}>New Folder</button>
            </div>
            <div>
                <FileTreeNode
                    selectedFile={selectedFile}
                    tree={tree}
                    onFileSelect={onFileSelect}
                    onNewNode={onNewNode}
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