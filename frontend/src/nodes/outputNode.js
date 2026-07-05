// outputNode.js

import { BaseNode } from './BaseNode';
import { NodeField, SelectInput, TextInput } from './NodeControls';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const currName = data?.outputName ?? id.replace('customOutput-', 'output_');
  const outputType = data?.outputType ?? 'Text';

  const outputTypeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'Image', label: 'Image' },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={[{ id: 'value' }]}
      accent="var(--accent-orange)"
    >
      <NodeField label="Name">
        <TextInput
          value={currName}
          onChange={(value) => updateNodeField(id, 'outputName', value)}
        />
      </NodeField>
      <NodeField label="Type">
        <SelectInput
          value={outputType}
          options={outputTypeOptions}
          onChange={(value) => updateNodeField(id, 'outputType', value)}
        />
      </NodeField>
    </BaseNode>
  );
}
