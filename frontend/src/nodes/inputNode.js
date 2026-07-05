// inputNode.js

import { BaseNode } from './BaseNode';
import { NodeField, SelectInput, TextInput } from './NodeControls';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const currName = data?.inputName ?? id.replace('customInput-', 'input_');
  const inputType = data?.inputType ?? 'Text';

  const inputTypeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'File', label: 'File' },
  ];

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={[{ id: 'value' }]}
      accent="var(--accent-green)"
    >
      <NodeField label="Name">
        <TextInput
          value={currName}
          onChange={(value) => updateNodeField(id, 'inputName', value)}
        />
      </NodeField>
      <NodeField label="Type">
        <SelectInput
          value={inputType}
          options={inputTypeOptions}
          onChange={(value) => updateNodeField(id, 'inputType', value)}
        />
      </NodeField>
    </BaseNode>
  );
}
