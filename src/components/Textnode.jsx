import { Handle, Position, useReactFlow } from '@xyflow/react'
import { MessageCircle, X, Plus } from 'lucide-react'

function Textnode({ data, id }) {
  const { setNodes } = useReactFlow();
  
  const handleDelete = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
  }
  
  return (
    <div className={`w-64 overflow-hidden bg-white border-2 rounded-lg shadow-sm ${
        data.selected 
          ? 'border-blue-400' 
          : 'border-gray-300'
      }`}>
      
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
        <div className="bg-blue-50  rounded-2xl p-2"><MessageCircle size={16} className="text-blue-600" /></div>
        <span className="text-sm text-gray-700 font-medium">{data.title}</span>
      </div>
      
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Message</span>
            <div className="w-2 h-2 bg-green-400 text-white rounded-full flex items-center justify-center text-xs font-medium">
            </div>
          </div>
          <button 
            onClick={handleDelete}
            className="w-5 h-5 hover:bg-red-100 rounded-full flex items-center justify-center"
          >
            <X size={12} className="text-red-500" />
          </button>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded p-2 mb-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.message}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{data.message.length}/200</span>
          <span className=" text-gray-500 text-xs px-3 py-1 rounded font-sm">
            {data.date}
          </span>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right}
        className="!w-4 !h-4 !bg-gray-800 !border-2 !border-white shadow-md"
      />
      <Handle 
        type="target" 
        position={Position.Left}
        className="!w-4 !h-4 !bg-gray-800 !border-2 !border-white shadow-md"
      />
    </div>
  )
}

export default Textnode