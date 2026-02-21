import { useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      variant="output"
      handles={[
        {
          id: `${id}-value`,
          type: 'target',
          position: Position.Left,
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
            value={outputType}
            onChange={handleTypeChange}
            options={[{ value: 'Text', label: 'Text' }, { value: 'File', label: 'Image' }]}
            ariaLabel="Output type"
          />
        </label>
      </div>
    </BaseNode>
  );
}
