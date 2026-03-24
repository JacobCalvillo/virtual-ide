import type { FileNode, FileSystemNode } from "../types/filesystem.types"

export function updateFileContent(tree: FileSystemNode, fileName: string, newContent: string): FileSystemNode {
    if (tree.type == "file") {
        return tree.name === fileName ? { ...tree, content: newContent } : tree
    }

    return {
        ...tree,
        children: tree.children.map((child) => updateFileContent(child, fileName, newContent))
    }
}

export function addNodeToTree(tree: FileSystemNode, newNode: FileSystemNode): FileSystemNode {
    if (tree.type === 'folder') {
        return {
            ...tree,
            children: [...tree.children, newNode]
        }
    }
    return tree
}

export function removeNodeToTree(tree: FileSystemNode, node: FileSystemNode) : FileSystemNode {
    if (tree.type === "folder") {
        return {
            ...tree,
            children: tree.children.filter(f => f.name !== node.name).map(child => removeNodeToTree(child, node))
        }
    }

    return tree
}

export function findFileByName(tree: FileSystemNode, name: string | null) : FileNode | null {
    if(!name) return null

    if (tree.type === "file") {
        return tree.name === name ? tree : null
    }

    for (const child of tree.children) {
        const found = findFileByName(child, name)

        if (found) return found
    }
    return null
}

