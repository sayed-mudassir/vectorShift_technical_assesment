// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        { id: 'system', top: '34%' },
        { id: 'prompt', top: '68%' },
      ]}
      outputs={[{ id: 'response' }]}
      accent="var(--accent-purple)"
      footer={<span>System + prompt to response</span>}
    >
      <p className="node-copy">
        Model call
      </p>
    </BaseNode>
  );
}
