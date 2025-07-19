

export const initialNodes = [
    {
        id: '0',
        type: 'textUpdater',
        position: { x: 0, y: 0 },
        data: {
            title: 'Text Node',
            message: 'Hello 👋 There',
            date: ''
        },
        type: 'Textupdater'
    },
    {
        id: '1',
        type: 'textUpdater',
        position: { x: 400, y: 100 },
        data: {
            title: 'Text Node',
            message: 'I am John',
            date: ''
        },
        type: 'Textupdater'
    },
    {
        id: '2',
        type: 'textUpdater',
        position: { x: 800, y: 200 },
        data: {
            title: 'Text Node',
            message: 'Welcome John How I can assist you.',
            date: ''
        },
        type: 'Textupdater'
    },
];

export const initialEdges = [
    {
        id: '1',
        source: '0',
        target: '1',
        type: 'myEdge',
    },
    {
        id: '2',
        source: '1',
        target: '2',
        type: 'myEdge',
    },
];

