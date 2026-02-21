import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ConditionNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Condition"
      description="Route based on a boolean condition."
      variant="logic"
      handles={[
        {
          id: `${id}-condition`,
          type: 'target',
          position: Position.Left,
          style: { top: '30%' },
        },
        {
          id: `${id}-input`,
          type: 'target',
          position: Position.Left,
          style: { top: '65%' },
        },
        {
          id: `${id}-true`,
          type: 'source',
          position: Position.Right,
          style: { top: '35%' },
        },
        {
          id: `${id}-false`,
          type: 'source',
          position: Position.Right,
          style: { top: '70%' },
        },
      ]}
    >
      <div className="vs-node__hint">
        <span>Outputs: true / false branches.</span>
      </div>
    </BaseNode>
  );
};


