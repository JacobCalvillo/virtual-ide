export type FileNode = {
    type: "file"
    name: string
    content: string
}

export type FolderNode = {
    type: "folder"
    name: string
    children: (FileNode | FolderNode)[]
}

export type FileSystemNode = FileNode | FolderNode;


export type AppState = {
    tree: FileSystemNode
    selectedFile: null | FileNode
    openFiles: FileNode[]
}

