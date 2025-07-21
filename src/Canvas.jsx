import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useReactFlow,
  useNodesState,
  MiniMap
} from '@xyflow/react';
import { BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import CanvasHeader from './components/CanvasHeader'
import Textnode from './components/Textnode';
import CustomEdge from './components/CustomEdge';
import { initialNodes, initialEdges } from './Workflow.constants';
import { useDnD } from './DnDContext';
import { getDocument } from './appwriteService'

const nodeTypes = {
  Textupdater: Textnode,
};

const edgeTypes = {
  myEdge: (edgeProps) => <CustomEdge {...edgeProps} />
};

function Canvas({ onNodeClick, onPaneClick, selectedNode }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, setViewport } = useReactFlow();
  const [type, setType] = useDnD();
  const [headerData, setheaderData] = useState({});

  const onConnect = useCallback((connection) => {
    const newEdge = { ...connection, id: nanoid(), type: 'myEdge' };
    setEdges((prevEdges) => addEdge(newEdge, prevEdges))
  }, []);


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    if (!type) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: nanoid(),
      position,
      data: {
        message: 'This is my text node', title: 'Text Node', selected: false,
        date: new Date(Date.now()).toLocaleString(),
      },
      type,
    };

    setNodes((nds) => nds.concat(newNode));
  }, [screenToFlowPosition, type]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          selected: selectedNode?.id === node.id,
        },
      }))
    );
  }, [selectedNode, setNodes]);

  const isValidConnection = (connection) => {
    const { source, target } = connection;

    return source === target ? false : true;
  }


  useEffect(() => {
    const FlowData = async () => {
      try {
        const data = await getDocument();
        setheaderData(JSON.parse(data.Flow));
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    };
    FlowData();
  }, []);

  useEffect(() => {
    if (Object.keys(headerData).length > 0) {
      const { nodes = [], edges = [], viewport = {} } = headerData;
      const { x = 0, y = 0, zoom = 1 } = viewport;

      setNodes(nodes);
      setEdges(edges);
      setViewport({ x, y, zoom }); // ✅ Correct usage: an object, not separate arguments
    }
  }, [headerData]);



  return (
    <div className="flex-1 h-full bg-gray-50 relative ">
      <CanvasHeader nodes={nodes} edges={edges} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          isValidConnection={isValidConnection}
          fitView
        >
          <Background
            gap={30}
            size={1}
            color="gray"
            bgColor="#f8fafc"
            variant={BackgroundVariant.Dots}
          />
          <Controls
            className="!bg-white !border-gray-200 !shadow-lg"
            showInteractive={false}
          />
          <MiniMap
            style={{ width: 80, height: 80 }}
          />
        </ReactFlow>
    </div>
  );
}

export default Canvas;
