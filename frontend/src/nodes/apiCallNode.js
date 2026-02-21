import { useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const APICallNode = ({ id }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com');

  return (
    <BaseNode
      id={id}
      title="API Call"
      description="Configure an HTTP request."
      variant="api"
      handles={[
        {
          id: `${id}-input`,
          type: 'target',
          position: Position.Left,
        },
        {
          id: `${id}-response`,
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <div className="vs-field">
        <label className="vs-label">
          <span className="vs-label__text">Method</span>
          <CustomSelect
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            options={[
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
              { value: 'PUT', label: 'PUT' },
              { value: 'DELETE', label: 'DELETE' },
            ]}
            ariaLabel="HTTP method"
          />
        </label>
      </div>
      <div className="vs-field">
        <label className="vs-label">
          <span className="vs-label__text">URL</span>
          <input
            className="vs-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
      </div>
    </BaseNode>
  );
};


