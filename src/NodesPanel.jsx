import React from 'react'
import { GripVertical, MessageCircle, Settings, Zap, Database } from "lucide-react";
import { useDnD } from './DnDContext';

function NodesPanel() {
    const [type, setType] = useDnD();

    const onDragStart = (e, nodeType) => {
        setType(nodeType);
        e.dataTransfer.effectAllowed = 'move';
    }

    const nodeTypes = [
        {
            id: 'Textupdater',
            name: 'Text Node',
            description: 'Send a text message',
            icon: MessageCircle,
            color: 'text-blue-600',
            draggable: true,
        },
        {
            id: 'SettingsNode',
            name: 'Settings',
            description: 'Configure node settings',
            icon: Settings,
            color: 'text-gray-600',
            draggable: false,
        },
        {
            id: 'ActionNode',
            name: 'Action',
            description: 'Trigger an action',
            icon: Zap,
            color: 'text-yellow-600',
            draggable: false,
        },
        {
            id: 'DataNode',
            name: 'Data',
            description: 'Store and retrieve data',
            icon: Database,
            color: 'text-green-600',
            draggable: false,
        }
    ];

    return (
        <div className="w-[30%] h-full bg-white border-r border-l border-gray-200 shadow-sm ">
            <div className="h-full flex flex-col">
                <div className="px-6 py-3 border-b border-gray-200 bg-gray-0 ">
                    <h2 className="text-md font-semibold text-gray-900">Components</h2>
                    <p className="text-sm text-gray-500 mt">Drag components to canvas</p>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-3">
                        {nodeTypes.map((node) => {
                            const IconComponent = node.icon;
                            return (
                                <div
                                    key={node.id}
                                    id="draggable"
                                    onDragStart={(e) => onDragStart(e, node.id)}
                                    draggable={node.draggable}
                                    className="group relative bg-white border border-gray-200 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <div className={`p-2 rounded-md bg-gray-50 group-hover:bg-gray-100 transition-colors ${node.color}`}>
                                                <IconComponent size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                                    {node.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                    {node.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 ml-2">
                                            <GripVertical size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* <div className="mt-8 px-4 py-4 rounded-lg">
                        <p className="flex-wrap text-xs text-gray-800 space-x-4">
                            Bit-Speed Assignment By: <span className='px-2 text-blue-800  '>Ketan Jadhav</span>
                        </p>
                        <div className="flex-wrap mt-4 space-x-4 text-xs font-mono text-gray-800">
                            <a className='px-3 font-stretch-90% py-1 border border-gray-200 rounded-2xl bg-gray-50 overflow-hidden hover:bg-blue-500 hover:border-gray-50 hover:border hover:text-white' href="https://github.com/ketanrj">Github</a>
                            <a className='px-3 py-1 font-stretch-90% border border-gray-200 rounded-2xl bg-gray-50 overflow-hidden hover:bg-blue-500 hover:border-gray-50 hover:border hover:text-white' href="https://x.com/ketaannnn">Twitter</a>
                            <a className='px-3 font-stretch-90% py-1 border border-gray-200 rounded-2xl bg-gray-50 overflow-hidden hover:bg-blue-500 hover:border-gray-50 hover:border hover:text-white' href="https://ketan-dev.vercel.app/">Portfolio</a>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default NodesPanel