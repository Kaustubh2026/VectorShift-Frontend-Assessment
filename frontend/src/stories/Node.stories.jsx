import React from 'react';

export default {
  title: 'Components/Node',
};

export const DefaultNode = () => (
  <div style={{ width: 260 }}>
    <div className="vs-node vs-node--llm">
      <div className="vs-node__header">
        <div className="vs-node__title">LLM</div>
        <div className="vs-node__delete">×</div>
      </div>
      <div className="vs-node__description">Large Language Model</div>
      <div className="vs-node__content">
        <div className="vs-field">
          <label className="vs-label__text">Prompt</label>
          <input className="vs-input" defaultValue="Write a friendly reply" />
        </div>
      </div>
    </div>
  </div>
);
