import Sidebar from "./components/Sidebar";
import { Editor } from "./components/Editor";
import { useFileSystem } from "./hooks/useFileSystem";
import { Tabs } from "./components/Tabs";

export default function App() {
    const {
        state,
        handleFileSelect,
        handleNewNode,
        handleOnContentChange,
        handleCloseFile,
        selectedFile,
        openFiles
    } = useFileSystem()

    return (
        <div className="app-container">
            <Sidebar
                selectedFile={selectedFile}
                onNewNode={handleNewNode}
                tree={state.tree}
                onFileSelect={handleFileSelect}
            />
            <div className="editor-container">
                <Tabs 
                    openFiles={openFiles}
                    selectedFile={selectedFile}
                    onFileSelect={handleFileSelect}
                    onClose={handleCloseFile}
                />
                <Editor
                    selectedFile={selectedFile}
                    onContentChange={handleOnContentChange}
                />
            </div>

        </div>
    )
}
