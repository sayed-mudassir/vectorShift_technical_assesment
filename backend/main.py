from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from graph import graph_is_dag

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],
    allow_origin_regex=r'^http://(localhost|127\.0\.0\.1):\d+$',
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class PipelinePayload(BaseModel):
    nodes: List[Dict[str, Any]] = Field(default_factory=list)
    edges: List[Dict[str, Any]] = Field(default_factory=list)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    return {
        'num_nodes': len(payload.nodes),
        'num_edges': len(payload.edges),
        'is_dag': graph_is_dag(payload.nodes, payload.edges),
    }
