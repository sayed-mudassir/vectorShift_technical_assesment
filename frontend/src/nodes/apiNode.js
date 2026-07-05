import { BaseNode } from './BaseNode';
import { NodeField, SelectInput, TextInput } from './NodeControls';
import { useStore } from '../store';

const methodOptions = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
];

export const APINode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const endpoint = data?.endpoint ?? '/v1/resource';
  const method = data?.method ?? 'GET';

  return (
    <BaseNode
      id={id}
      title="API"
      inputs={[{ id: 'payload' }]}
      outputs={[{ id: 'response' }]}
      accent="var(--accent-cyan)"
    >
      <NodeField label="Endpoint">
        <TextInput
          value={endpoint}
          onChange={(value) => updateNodeField(id, 'endpoint', value)}
        />
      </NodeField>
      <NodeField label="Method">
        <SelectInput
          value={method}
          options={methodOptions}
          onChange={(value) => updateNodeField(id, 'method', value)}
        />
      </NodeField>
    </BaseNode>
  );
};
