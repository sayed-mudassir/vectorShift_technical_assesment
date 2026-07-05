import { BaseNode } from './BaseNode';
import { NodeField, SelectInput } from './NodeControls';
import { useStore } from '../store';

const operationOptions = [
  { value: 'add', label: 'Add' },
  { value: 'subtract', label: 'Subtract' },
  { value: 'multiply', label: 'Multiply' },
  { value: 'divide', label: 'Divide' },
];

export const MathNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const operation = data?.operation ?? 'add';

  return (
    <BaseNode
      id={id}
      title="Math"
      inputs={[
        { id: 'a', top: '36%' },
        { id: 'b', top: '70%' },
      ]}
      outputs={[{ id: 'result' }]}
      accent="var(--accent-indigo)"
    >
      <NodeField label="Operation">
        <SelectInput
          value={operation}
          options={operationOptions}
          onChange={(value) => updateNodeField(id, 'operation', value)}
        />
      </NodeField>
    </BaseNode>
  );
};
