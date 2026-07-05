import { BaseNode } from './BaseNode';

export const MergeNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Merge"
    inputs={[
      { id: 'input-a', top: '30%' },
      { id: 'input-b', top: '50%' },
      { id: 'input-c', top: '70%' },
    ]}
    outputs={[{ id: 'merged' }]}
    accent="var(--accent-teal)"
    footer={<span>Combines three streams</span>}
  >
    <p className="node-copy">
      Merge inputs
    </p>
  </BaseNode>
);
