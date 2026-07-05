// textNode.js

import { useLayoutEffect, useMemo, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeControls';
import { useStore } from '../store';

const VARIABLE_PATTERN = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;

const getVariables = (text) => {
  const matches = text.matchAll(VARIABLE_PATTERN);
  return [...new Set([...matches].map((match) => match[1]))];
};

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const currText = data?.text ?? '{{input}}';

  const variables = useMemo(() => getVariables(currText), [currText]);
  const inputHandles = variables.map((variable, index) => ({
    id: variable,
    top: `${((index + 1) * 100) / (variables.length + 1)}%`,
  }));
  const longestLineLength = Math.max(
    0,
    ...currText.split('\n').map((line) => line.length)
  );
  const width = Math.min(360, Math.max(260, 240 + Math.max(0, longestLineLength - 28) * 5));

  useLayoutEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      width={width}
      minHeight={150}
      inputs={inputHandles}
      outputs={[{ id: 'output' }]}
      accent="var(--accent-blue)"
      footer={variables.length ? <span>{variables.length} variable handles</span> : null}
    >
      <NodeField label="Template">
        <textarea
          ref={textareaRef}
          className="node-input node-textarea"
          value={currText}
          rows={2}
          onChange={(event) => updateNodeField(id, 'text', event.target.value)}
        />
      </NodeField>
    </BaseNode>
  );
}
