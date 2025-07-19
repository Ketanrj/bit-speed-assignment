import { Save, Eye, Play, MoreHorizontal } from 'lucide-react'


function CanvasHeader({ nodes, edges }) {

  const handleSave = () => {
    const totalNodes = nodes.length;

    const nodesWithNoIncoming = nodes.filter((node) => {
      const isTargeted = edges.some((edge) => edge.target === node.id);
      return !isTargeted;
    });

    if (totalNodes > 0 && nodesWithNoIncoming.length > 1) {
      alert('Error: More than one node has no incoming connection.');
      return;
    }

    console.log('Flow is valid. Proceeding to save...');
  };

  const handlePreview = () => {
    console.log('Preview flow...');
  };

  const handleRun = () => {
    console.log('Run flow...');
  };

  return (
    <div className="absolute top-0 left-0 right-0 py-0.5 z-50 bg-white border-b border-gray-200 ">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">Flow Builder</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              {nodes.length} nodes
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              {edges.length} connections
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* <button 
            onClick={handlePreview}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            <Eye size={16} />
            Preview
          </button>
          
          <button 
            onClick={handleRun}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Play size={16} />
            Run
          </button>

          <button 
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            <Save size={16} />
            Save
          </button> */}

          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CanvasHeader;