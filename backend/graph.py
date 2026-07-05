from collections import deque
from typing import Any, Dict, List


def graph_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    node_ids = {node.get('id') for node in nodes if node.get('id') is not None}

    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source is not None:
            node_ids.add(source)
        if target is not None:
            node_ids.add(target)

    adjacency = {node_id: [] for node_id in node_ids}
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')

        if source is None or target is None:
            continue

        adjacency[source].append(target)
        indegree[target] += 1

    queue = deque(node_id for node_id, degree in indegree.items() if degree == 0)
    visited_count = 0

    while queue:
        node_id = queue.popleft()
        visited_count += 1

        for neighbor in adjacency[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)
