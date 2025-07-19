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
import { useCallback, useEffect } from 'react';
import { nanoid } from 'nanoid';
import CanvasHeader from './components/CanvasHeader'
import Textnode from './components/Textnode';
import CustomEdge from './components/CustomEdge';
import { initialNodes, initialEdges } from './Workflow.constants';
import { useDnD } from './DnDContext';

const nodeTypes = {
  Textupdater: Textnode,
};

const edgeTypes = {
  myEdge: (edgeProps) => <CustomEdge {...edgeProps} />
};

function Canvas({ onNodeClick, onPaneClick, selectedNode }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map((node) => ({
      ...node,
      data: { ...node.data, selected: false },
    }))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

  const onConnect = useCallback((connection) => {
    const edge = { ...connection, id: nanoid(), type: 'myEdge' };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
  }, [setEdges]);

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
    const {source, target} = connection;

    return source === target ? false : true;
  }


  return (
     <div className="flex-1 h-full bg-gray-50 relative">
      <CanvasHeader nodes={nodes} edges={edges} />
      <div className="h-full">
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
            style={{width: 80, height: 80}}
            />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Canvas;
