import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";

import { nodeTypes } from "./nodes/nodeTypes";
import { Toolbar } from "./components/Toolbar";
import { SubmitButton } from "./components/SubmitButton";

let nodeId = 0;
const getId = (type) => `${type}_${++nodeId}`;

const initialNodes = [
  {
    id: "customInput_0",
    type: "customInput",
    position: { x: 80, y: 200 },
    data: { inputName: "user_query", inputType: "Text" },
  },
  {
    id: "llm_0",
    type: "llm",
    position: { x: 380, y: 200 },
    data: { model: "gpt-4o" },
  },
  {
    id: "customOutput_0",
    type: "customOutput",
    position: { x: 680, y: 200 },
    data: { outputName: "response", outputType: "Text" },
  },
];

const initialEdges = [
  {
    id: "e1",
    source: "customInput_0",
    sourceHandle: "value",
    target: "llm_0",
    targetHandle: "prompt",
    animated: true,
  },
  {
    id: "e2",
    source: "llm_0",
    sourceHandle: "response",
    target: "customOutput_0",
    targetHandle: "value",
    animated: true,
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  const addNode = useCallback(
    (type) => {
      const id = getId(type);
      const center = reactFlowInstance
        ? reactFlowInstance.project({
            x: window.innerWidth / 2 - 110 + Math.random() * 80 - 40,
            y: window.innerHeight / 2 - 80 + Math.random() * 80 - 40,
          })
        : { x: 300 + Math.random() * 200, y: 200 + Math.random() * 200 };

      setNodes((nds) =>
        nds.concat({
          id,
          type,
          position: center,
          data: {},
        }),
      );
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <div style={{ width: "100vw", height: "100vh", background: "var(--bg)" }}>
      <Toolbar onAddNode={addNode} />

      <div
        style={{ width: "100%", height: "100%", paddingTop: 56 }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          defaultEdgeOptions={{ animated: true }}
          connectionLineStyle={{ stroke: "#7c6af7", strokeWidth: 2 }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1.5}
            color="#1e1e35"
          />
          <Controls style={{ bottom: 80 }} />
          <MiniMap
            style={{ bottom: 80, right: 16 }}
            nodeColor={(node) => {
              const colors = {
                customInput: "#6af7c8",
                customOutput: "#f76ac8",
                llm: "#7c6af7",
                text: "#f7c86a",
                transform: "#f7a06a",
                filter: "#6af0f7",
                merge: "#c86af7",
                api: "#f76a6a",
                memory: "#6a9af7",
              };
              return colors[node.type] || "#7c6af7";
            }}
            maskColor="rgba(10,10,15,0.8)"
          />
        </ReactFlow>
      </div>

      <SubmitButton nodes={nodes} edges={edges} />
    </div>
  );
}
