from collections import deque
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Build adjacency list and indegree counts for Kahn's algorithm
    adjacency = {node.id: [] for node in pipeline.nodes}
    indegree = {node.id: 0 for node in pipeline.nodes}

    for edge in pipeline.edges:
        # Ensure both ends exist in the maps even if edges reference ids not in nodes
        if edge.source not in adjacency:
            adjacency[edge.source] = []
            indegree.setdefault(edge.source, 0)
        if edge.target not in adjacency:
            adjacency[edge.target] = []
            indegree.setdefault(edge.target, 0)

        adjacency[edge.source].append(edge.target)
        indegree[edge.target] = indegree.get(edge.target, 0) + 1

    queue = deque([node_id for node_id, degree in indegree.items() if degree == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1
        for neighbor in adjacency.get(current, []):
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited == len(indegree)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag,
    }

