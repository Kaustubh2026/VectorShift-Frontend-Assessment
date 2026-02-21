import React from 'react';

export default {
  title: 'Components/Button',
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => (
  <button className={`vs-button ${args.primary ? 'vs-button--primary' : ''}`} onClick={args.onClick}>
    {args.label}
  </button>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Validate pipeline →',
};

export const Ghost = Template.bind({});
Ghost.args = {
  primary: false,
  label: 'Secondary',
};
