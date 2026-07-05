const getInitNodeData = (nodeID, type) => ({
  id: nodeID,
  nodeType: type,
});

export const createPipelineNode = ({ id, type, position }) => ({
  id,
  type,
  position,
  data: getInitNodeData(id, type),
});
