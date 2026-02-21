// Displays the drag-and-drop UI

import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { DelayNode } from './nodes/delayNode';
import { ConditionNode } from './nodes/conditionNode';
import { LoggerNode } from './nodes/loggerNode';
import { APICallNode } from './nodes/apiCallNode';

import 'reactflow/dist/style.css';

const gridSize = 32;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: React.memo(InputNode),
  llm: React.memo(LLMNode),
  customOutput: React.memo(OutputNode),
  text: React.memo(TextNode),
  math: React.memo(MathNode),
  delay: React.memo(DelayNode),
  condition: React.memo(ConditionNode),
  logger: React.memo(LoggerNode),
  api: React.memo(APICallNode),
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onReconnect: state.onReconnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      onReconnect,
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div className="pipeline-main">
        <div
          ref={reactFlowWrapper}
          className={`pipeline-canvas${isDragging ? ' is-dragging' : ''}`}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeUpdate={onReconnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeDragStart={() => setIsDragging(true)}
                onNodeDragStop={() => setIsDragging(false)}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType="default"
                defaultEdgeOptions={{ reconnectable: true }}
                deleteKeyCode={['Backspace', 'Delete']}
                elementsSelectable
            >
                <Background color="rgba(255,255,255,0.06)" gap={gridSize} />
                <Controls showInteractive={false} />
                <MiniMap
                  pannable
                  zoomable
                  nodeColor="#8b5cf6"
                  maskColor="rgba(10, 10, 20, 0.8)"
                  style={{ background: 'rgba(15, 15, 25, 0.85)' }}
                />
            </ReactFlow>
        </div>
        </div>
    )
}
