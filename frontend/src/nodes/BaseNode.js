import { useEffect, useMemo } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';

const resolvePosition = (position, fallback) => {
  if (!position) {
    return fallback;
  }

  return Position[position] || position;
};

const renderHandle = (nodeId, handle, type, defaultPosition, index) => {
  const position = resolvePosition(handle.position, defaultPosition);
  const handleId = handle.id ? `${nodeId}-${handle.id}` : undefined;
  const isHorizontalHandle = position === Position.Top || position === Position.Bottom;
  const offset = `${((index + 1) * 100) / ((handle.count || 1) + 1)}%`;
  const offsetStyle = isHorizontalHandle
    ? { left: handle.left ?? offset }
    : { top: handle.top ?? offset };

  return (
    <Handle
      key={`${type}-${handle.id || index}`}
      id={handleId}
      type={type}
      position={position}
      className={`node-handle node-handle-${type}`}
      style={{ ...offsetStyle, ...handle.style }}
      isConnectable={handle.isConnectable}
    />
  );
};

const getHandleSignature = (handles) =>
  handles
    .map((handle) =>
      [
        handle.id,
        handle.position,
        handle.top,
        handle.right,
        handle.bottom,
        handle.left,
      ].join(':')
    )
    .join('|');

export const BaseNode = ({
  id,
  title,
  children,
  inputs = [],
  outputs = [],
  footer,
  width = 240,
  minHeight = 130,
  className = '',
  style,
  accent = 'var(--accent-blue)',
}) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const inputHandles = inputs.map((handle) => ({ ...handle, count: inputs.length }));
  const outputHandles = outputs.map((handle) => ({ ...handle, count: outputs.length }));
  const inputSignature = useMemo(() => getHandleSignature(inputs), [inputs]);
  const outputSignature = useMemo(() => getHandleSignature(outputs), [outputs]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, inputSignature, outputSignature, updateNodeInternals]);

  return (
    <div
      className={`node-card ${className}`}
      style={{
        width,
        minHeight,
        '--node-accent': accent,
        ...style,
      }}
    >
      {inputHandles.map((handle, index) =>
        renderHandle(id, handle, 'target', Position.Left, index)
      )}

      <div className="node-header">
        <span className="node-accent" aria-hidden="true" />
        <span className="node-title">{title}</span>
      </div>

      <div className="node-body">{children}</div>

      {footer ? <div className="node-footer">{footer}</div> : null}

      {outputHandles.map((handle, index) =>
        renderHandle(id, handle, 'source', Position.Right, index)
      )}
    </div>
  );
};
