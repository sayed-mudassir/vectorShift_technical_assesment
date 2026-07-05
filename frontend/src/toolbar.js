// toolbar.js

import { DraggableNode } from './draggableNode';
import { NODE_CATALOG } from './nodeCatalog';
import { createPipelineNode } from './nodeFactory';
import { useStore } from './store';

export const PipelineToolbar = () => {
    const getNodeID = useStore((state) => state.getNodeID);
    const addNode = useStore((state) => state.addNode);
    const nodeCount = useStore((state) => state.nodes.length);

    const addNodeFromToolbar = (type) => {
        const nodeID = getNodeID(type);
        const column = nodeCount % 4;
        const row = Math.floor(nodeCount / 4);

        addNode(createPipelineNode({
            id: nodeID,
            type,
            position: {
                x: 80 + column * 260,
                y: 80 + row * 180,
            },
        }));
    };

    return (
        <aside className="pipeline-toolbar" aria-label="Pipeline nodes">
            <div className="toolbar-heading">
                <div>
                    <p className="toolbar-kicker">VectorShift</p>
                    <h1>Pipeline Builder</h1>
                </div>
            </div>
            <div className="toolbar-grid">
                {NODE_CATALOG.map((node) => (
                    <DraggableNode
                        key={node.type}
                        type={node.type}
                        label={node.label}
                        icon={node.icon}
                        description={node.description}
                        onAdd={addNodeFromToolbar}
                    />
                ))}
            </div>
        </aside>
    );
};
