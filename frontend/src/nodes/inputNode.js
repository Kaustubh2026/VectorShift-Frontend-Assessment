import { useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      variant="input"
      handles={[
        {
          id: `${id}-value`,
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <div className="vs-field">
        <label className="vs-label">
          <span className="vs-label__text">Name</span>
          <input
            className="vs-input"
            type="text"
            value={currName}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div className="vs-field">
        <label className="vs-label">
          <span className="vs-label__text">Type</span>
          <CustomSelect
            value={inputType}
            onChange={handleTypeChange}
            options={[{ value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }]}
            ariaLabel="Input type"
          />
        </label>
      </div>
    </BaseNode>
  );
}
