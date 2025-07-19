import { useEffect, useState } from 'react';
import Canvas from './Canvas';
import { DndProvider } from './DnDContext';
import NodesPanel from './NodesPanel'
import { useReactFlow } from '@xyflow/react';
import SettingsPanel from './components/SettingsPanel';


function App() {
  const [selectedNode, setSelectedNode] = useState(undefined);
  let { onNodeClick, onPaneClick } = useReactFlow();

    onNodeClick = (e, node) => {
      return setSelectedNode(node);
    }

    onPaneClick = () => {
      return setSelectedNode(undefined)
    }

  return (
    <DndProvider>
      <div className="flex w-screen h-screen">
        <Canvas onNodeClick={onNodeClick} onPaneClick={onPaneClick} selectedNode={selectedNode} />
        {selectedNode?.id ? (
          <SettingsPanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        ) : (<NodesPanel />)}
      </div>
    </DndProvider>
  );
};

export default App
