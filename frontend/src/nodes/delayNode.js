import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DelayNode = ({ id }) => {
  const [delayMs, setDelayMs] = useState(1000);

  return (
    <BaseNode
      id={id}
      title="Delay"
      description="Delay passing the input through."
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
      <div className="vs-field">
        <label className="vs-label">
          <span className="vs-label__text">Delay (ms)</span>
          <input
            className="vs-input"
            type="number"
            min="0"
            value={delayMs}
            onChange={(e) => setDelayMs(e.target.value)}
          />
        </label>
      </div>
    </BaseNode>
  );
};


