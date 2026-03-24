import { useState } from "react"
import type { AppState, FileNode, FileSystemNode } from "../types/filesystem.types"
import { updateFileContent, addNodeToTree, removeNodeToTree, findFileByName } from "../utils/utils"
import { useEffect } from "react"

export function useFileSystem() {
    const [state, setState] = useState<AppState>(() => {
        const saved = localStorage.getItem("filesystem")
        return saved ? {
            tree: JSON.parse(saved),
            selectedFileName: null,
            openFilesNames: []
        } : {
            tree: { type: "folder", name: "my-project", children: [] },
            selectedFileName: null,
            openFilesNames: []
        }
    })

    const selectedFile = findFileByName(state.tree, state.selectedFileName)

    useEffect(() => {
        localStorage.setItem("filesystem", JSON.stringify(state.tree))
    }, [state.tree])


    function handleFileSelect(file: FileNode) {
        setState(prev => ({
            ...prev,
            selectedFileName: file?.name,
            openFilesNames: prev.openFilesNames.some(name => name === file.name)
                ? prev.openFilesNames
                : [...prev.openFilesNames, file.name]
        }))
    }

    function handleOnContentChange(content: string | undefined) {
        if (!state.selectedFileName || content == undefined) return

        const fileName = state.selectedFileName

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
            openFilesNames: prev.openFilesNames.filter(f => f !== file.name),
            selectedFileName: prev.selectedFileName === file.name ? null : prev.selectedFileName
        }))
    }

    function handleRemoveNode(node: FileSystemNode) {
        setState(prev => ({
            ...prev,
            tree: removeNodeToTree(prev.tree, node),
            openFilesNames: prev.openFilesNames.filter(file => file !== node.name),
            selectedFileName: prev.selectedFileName === node.name ? null : prev.selectedFileName
        }))
    }

    const openFiles = state.openFilesNames
        .map(name => findFileByName(state.tree, name))
        .filter((file): file is FileNode => file !== null)

    return {
        handleFileSelect,
        handleNewNode,
        handleOnContentChange,
        handleCloseFile,
        handleRemoveNode,
        selectedFile,
        openFiles,
        state
    }
}