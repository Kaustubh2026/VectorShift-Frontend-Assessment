import { useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const MathNode = ({ id }) => {
  const [operation, setOperation] = useState('add');

  return (
    <BaseNode
      id={id}
      title="Math"
      description="Combine two numeric inputs."
      variant="math"
      handles={[
        {
          id: `${id}-a`,
          type: 'target',
          position: Position.Left,
          style: { top: '35%' },
        },
        {
          id: `${id}-b`,
          type: 'target',
          position: Position.Left,
          style: { top: '65%' },
        },
        {
          id: `${id}-result`,
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <div className="vs-field">
        <label className="vs-label">
          <span className="vs-label__text">Operation</span>
          <CustomSelect
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            options={[
              { value: 'add', label: 'Add' },
              { value: 'sub', label: 'Subtract' },
              { value: 'mul', label: 'Multiply' },
              { value: 'div', label: 'Divide' },
            ]}
            ariaLabel="Math operation"
          />
        </label>
      </div>
    </BaseNode>
  );
};


