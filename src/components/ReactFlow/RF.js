'use client'

import 'reactflow/dist/style.css';

import React, { useCallback } from 'react';
import ReactFlow, { addEdge, useEdgesState, useNodesState } from 'reactflow';

import BaseNode from './BaseNode';

export default function RF() {

  // Import Node Types
  const nodeTypes = {
    custom: BaseNode,
  };

  // INITIAL NODES
  const initialNodes = [
    { id: '1', type: 'custom', position: { x: 0, y: 0 }, data: { name: 'file1' } },
    { id: '2',type: 'custom', position: { x: 0, y: 100 }, data: { name: 'file2' } },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  // INITIAL EDGES
  const initialEdges = [{ }]; //id: 'e1-2', source: '1', target: '2'  example
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
    </div>
  );
}