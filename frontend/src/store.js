import { createWithEqualityFn as create } from "zustand/traditional";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({
          ...connection,
          type: 'default',
          animated: true,
          reconnectable: true,
          markerEnd: { type: MarkerType.Arrow, height: 14, width: 14 },
        }, get().edges),
      });
    },
    onReconnect: (oldEdge, newConnection) => {
      const edges = get().edges.map((e) =>
        e.id === oldEdge.id
          ? { ...e, source: newConnection.source, target: newConnection.target, sourceHandle: newConnection.sourceHandle, targetHandle: newConnection.targetHandle }
          : e
      );
      set({ edges });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    deleteNode: (nodeId) => {
      const { nodes, edges } = get();
      set({
        nodes: nodes.filter((n) => n.id !== nodeId),
        edges: edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      });
    },
  }));
