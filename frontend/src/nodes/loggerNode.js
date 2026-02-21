import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LoggerNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Logger"
      description="Tap into the pipeline to inspect values."
      variant="utility"
      handles={[
        {
          id: `${id}-input`,
          type: 'target',
          position: Position.Left,
        },
        {
          id: `${id}-output`,
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <div className="vs-node__hint">
        <span>Use this to debug intermediate results.</span>
      </div>
    </BaseNode>
  );
};


