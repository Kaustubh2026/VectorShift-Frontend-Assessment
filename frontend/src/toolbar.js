import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-head">
                <div className="toolbar-brand" aria-hidden>◇</div>
                <h1 className="app-title">Pipeline Builder</h1>
            </div>
            <p className="app-subtitle">
                <span className="toolbar-badge">Drag to canvas</span>
                Add nodes and connect them to build your AI workflow.
            </p>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='logger' label='Logger' />
                <DraggableNode type='api' label='API Call' />
            </div>
        </div>
    );
};
