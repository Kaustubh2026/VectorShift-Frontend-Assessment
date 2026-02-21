import { useEffect, useMemo, useRef, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textAreaRef = useRef(null);
  const [height, setHeight] = useState(80);

  const variables = useMemo(() => {
    const found = new Set();
    let match;
    while ((match = variableRegex.exec(currText)) !== null) {
      found.add(match[1]);
    }
    return Array.from(found);
  }, [currText]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      const newHeight = Math.min(textAreaRef.current.scrollHeight + 16, 260);
      textAreaRef.current.style.height = `${newHeight}px`;
      setHeight(Math.max(120, newHeight + 60));
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const variableHandles = variables.map((variableName, index) => ({
    id: `${id}-var-${variableName}`,
    type: 'target',
    position: Position.Left,
    style: {
      top: 40 + index * 24,
    },
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      variant="text"
      handles={[
        ...variableHandles,
        {
          id: `${id}-output`,
          type: 'source',
          position: Position.Right,
        },
      ]}
      style={{ minWidth: 220, minHeight: height }}
    >
      <div className="vs-field">
        <label className="vs-label">
          <span className="vs-label__text">Text</span>
          <textarea
            ref={textAreaRef}
            className="vs-textarea"
            value={currText}
            onChange={handleTextChange}
            rows={3}
          />
        </label>
      </div>
      {variables.length > 0 && (
        <div className="vs-node__hint">
          <span>Variables: {variables.join(', ')}</span>
        </div>
      )}
    </BaseNode>
  );
}
