// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { EmailNode } from './nodes/emailNode';
import { DelayNode } from './nodes/delayNode';
import { MathNode } from './nodes/mathNode';
import { MergeNode } from './nodes/mergeNode';
import { createPipelineNode } from './nodeFactory';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  email: EmailNode,
  delay: DelayNode,
  math: MathNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          if (event?.dataTransfer?.getData('application/reactflow')) {
            let appData;

            try {
              appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            } catch {
              return;
            }

            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            if (!reactFlowInstance) {
              return;
            }

            const position = reactFlowInstance.screenToFlowPosition
              ? reactFlowInstance.screenToFlowPosition({
                  x: event.clientX,
                  y: event.clientY,
                })
              : reactFlowInstance.project({
                  x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
                  y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
                });

            const nodeID = getNodeID(type);
            const newNode = createPipelineNode({
              id: nodeID,
              type,
              position,
            });
      
            addNode(newNode);
          }
        },
        [addNode, getNodeID, reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <main className="pipeline-canvas-shell">
        <div ref={reactFlowWrapper} className="pipeline-canvas">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                snapToGrid
                connectionLineType='smoothstep'
                fitView
            >
                <Background color="rgba(148, 163, 184, 0.28)" gap={gridSize} variant="dots" />
                <Controls />
                <MiniMap zoomable pannable />
            </ReactFlow>
            {nodes.length === 0 ? (
              <div className="canvas-empty-state">
                <span>No nodes yet.</span>
              </div>
            ) : null}
        </div>
        </main>
    )
}
