import { useEffect, useState } from "react"
import { ChevronLeft, MessageCircle, Save } from "lucide-react"
import { useReactFlow } from '@xyflow/react'

function SettingsPanel({ setSelectedNode, selectedNode }) {
    const [newMessage, setMessage] = useState(selectedNode?.data.message);
    const { updateNodeData } = useReactFlow();

    useEffect(() => {
        setMessage(selectedNode?.data.message || "");
    }, [selectedNode?.id]);

    const onChangeHandle = (value) => {
        setMessage(value);
    }

    const onSubmit = () => {
        updateNodeData(selectedNode?.id, { message: newMessage });
    }

    return (
        <div className="w-[30%] h-full bg-white border-l border-gray-200">
            <div className="h-full flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <button
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => setSelectedNode(undefined)}
                        >
                            <ChevronLeft size={16} />
                            Back
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900">Node Settings</h2>
                        <div className="w-12"></div>
                    </div>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto">
                    {selectedNode ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="p-2 bg-blue-100 rounded-md">
                                    <MessageCircle size={16} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-blue-900">{selectedNode?.data.title}</h3>
                                    <p className="text-sm text-blue-700">Configure your message content</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-900" htmlFor="message">
                                    Message Content
                                </label>
                                <textarea 
                                    id="message"
                                    className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 resize-none"
                                    placeholder={selectedNode?.data.message || "Enter your message..."}
                                    value={newMessage}
                                    onChange={(e) => onChangeHandle(e.target.value)}
                                    rows={5}
                                />
                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span>{newMessage?.length || 0}/200 characters</span>
                                    <span>Plain text only</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <button 
                                    onClick={onSubmit} 
                                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm"
                                >
                                    <Save size={16} />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="p-4 bg-gray-100 rounded-full mb-4">
                                <MessageCircle size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Node Selected</h3>
                            <p className="text-sm text-gray-500">Select a node from the canvas to edit its properties</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SettingsPanel