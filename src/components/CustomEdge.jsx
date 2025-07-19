import { IoIosClose } from "react-icons/io";
import {
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';

function CustomEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BezierEdge {...props} style={{color: 'blue'}} />
      <EdgeLabelRenderer>
        <button
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            position: 'absolute',
            pointerEvents: 'all',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => {
            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
          }}
        >
          <IoIosClose className="text-red-400 text-xl" />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
