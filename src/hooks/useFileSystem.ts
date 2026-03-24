import { useState } from "react"
import type { AppState, FileNode, FileSystemNode } from "../types/filesystem.types"
import { updateFileContent, addNodeToTree, removeNodeToTree } from "../utils/utils"
import { useEffect } from "react"

export function useFileSystem() {
    const [state, setState] = useState<AppState>(() => {
        const saved = localStorage.getItem("filesystem")
        return saved ? {
            tree: JSON.parse(saved),
            selectedFile: null,
            openFiles: []
        } : {
            tree: { type: "folder", name: "my-project", children: [] },
            selectedFile: null,
            openFiles: []
        }
    })

    useEffect(() => {
        localStorage.setItem("filesystem", JSON.stringify(state.tree))
    }, [state.tree])

    function handleFileSelect(file: FileNode) {
        setState(prev => ({
            ...prev,
            selectedFile: file,
            openFiles:prev.openFiles.some(f => f.name === file.name)
            ? prev.openFiles
            : [...prev.openFiles, file]
        }))
    }

    function handleOnContentChange(content: string | undefined) {
        if (!content || !state.selectedFile) return

        const fileName = state.selectedFile.name

        setState(prev => ({
            ...prev,
            tree: updateFileContent(prev.tree, fileName, content)
        }))
    }

    function handleNewNode(node: FileSystemNode) {
        setState(prev => ({
            ...prev,
            tree: addNodeToTree(prev.tree, node)
        }))
    }
    
    function handleCloseFile(file: FileNode) {
        setState(prev => ({
            ...prev,
            openFiles: prev.openFiles.filter(f => f.name !== file.name),
            selectedFile: prev.selectedFile?.name === file.name ? null : prev.selectedFile
        }))
    }

    function handleRemoveNode(node: FileSystemNode) {
        setState(prev => ({
            ...prev,
            tree: removeNodeToTree(prev.tree, node),
            openFiles: prev.openFiles.filter(file => file.name !== node.name),
            selectedFile:  prev.selectedFile?.name === node.name ? null : prev.selectedFile
        }))
    }

    return {
        handleFileSelect,
        handleNewNode,
        handleOnContentChange,
        handleCloseFile,
        handleRemoveNode,
        state
    }
}