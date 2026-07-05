import { BaseNode } from './BaseNode';
import { NodeField, TextInput } from './NodeControls';
import { useStore } from '../store';

export const DelayNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const milliseconds = data?.milliseconds ?? '1000';

  return (
    <BaseNode
      id={id}
      title="Delay"
      inputs={[{ id: 'start' }]}
      outputs={[{ id: 'done' }]}
      accent="var(--accent-yellow)"
      footer={<span>{milliseconds || 0} ms</span>}
    >
      <NodeField label="Milliseconds">
        <TextInput
          type="number"
          value={milliseconds}
          onChange={(value) => updateNodeField(id, 'milliseconds', value)}
        />
      </NodeField>
    </BaseNode>
  );
};
