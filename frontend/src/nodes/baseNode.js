import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const BaseNode = ({
  id,
  title,
  description,
  variant = 'default',
  children,
  handles = [],
  style = {},
  showDelete = true,
}) => {
  const deleteNode = useStore((s) => s.deleteNode);

  return (
    <div className={`vs-node vs-node--${variant}`} style={style}>
      <div className="vs-node__header">
        <span className="vs-node__title">{title}</span>
        {showDelete && (
          <button
            type="button"
            className="vs-node__delete"
            onClick={() => deleteNode(id)}
            title="Delete node"
            aria-label="Delete node"
          >
            ×
          </button>
        )}
      </div>
      {description && (
        <div className="vs-node__description">
          <span>{description}</span>
        </div>
      )}
      <div className="vs-node__content">
        {children}
      </div>

      {handles.map((handle) => {
        const {
          id: handleId,
          type,
          position,
          style: handleStyle,
        } = handle;

        const rfPosition =
          typeof position === 'string'
            ? positionMap[position] ?? Position.Right
            : position;

        return (
          <Handle
            key={handleId}
            id={handleId}
            type={type}
            position={rfPosition}
            style={handleStyle}
          />
        );
      })}
    </div>
  );
};


