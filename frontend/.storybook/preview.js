import '../src/index.css';
import '../src/tokens.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#070812' },
      { name: 'card', value: 'rgba(12,14,24,0.9)' }
    ],
  },
}
