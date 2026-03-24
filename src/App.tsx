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
    } = useFileSystem()

    return (
        <div className="app-container">
            <Sidebar
                selectedFile={state.selectedFile}
                onNewNode={handleNewNode}
                tree={state.tree}
                onFileSelect={handleFileSelect}
            />
            <div className="editor-container">
                <Tabs 
                    openFiles={state.openFiles}
                    selectedFile={state.selectedFile}
                    onFileSelect={handleFileSelect}
                    onClose={handleCloseFile}
                />
                <Editor
                    selectedFile={state.selectedFile}
                    onContentChange={handleOnContentChange}
                />
            </div>

        </div>
    )
}
