import { BaseNode } from './BaseNode';
import { NodeField, TextInput } from './NodeControls';
import { useStore } from '../store';

export const EmailNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const recipient = data?.recipient ?? 'team@example.com';
  const subject = data?.subject ?? 'Pipeline update';

  return (
    <BaseNode
      id={id}
      title="Email"
      inputs={[{ id: 'body' }]}
      outputs={[{ id: 'sent' }]}
      accent="var(--accent-pink)"
    >
      <NodeField label="Recipient">
        <TextInput
          value={recipient}
          onChange={(value) => updateNodeField(id, 'recipient', value)}
        />
      </NodeField>
      <NodeField label="Subject">
        <TextInput
          value={subject}
          onChange={(value) => updateNodeField(id, 'subject', value)}
        />
      </NodeField>
    </BaseNode>
  );
};
