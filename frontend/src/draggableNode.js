// draggableNode.js

import { useRef } from 'react';

export const DraggableNode = ({ type, label, icon, description, onAdd }) => {
    const dragClickGuard = useRef(false);

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      dragClickGuard.current = true;
      event.currentTarget.classList.add('dragging');
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = (event) => {
      event.currentTarget.classList.remove('dragging');
      window.setTimeout(() => {
        dragClickGuard.current = false;
      }, 120);
    };

    const handleClick = () => {
      if (dragClickGuard.current) {
        return;
      }

      onAdd?.(type);
    };
  
    return (
      <button
        type="button"
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        onClick={handleClick}
        aria-label={`Add ${label} node`}
        draggable
      >
          <span className="draggable-node-icon" aria-hidden="true">{icon}</span>
          <span className="draggable-node-copy">
            <strong>{label}</strong>
            <small>{description}</small>
          </span>
      </button>
    );
  };
  
