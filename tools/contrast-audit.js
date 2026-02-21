const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '../frontend/src/index.css');
if (!fs.existsSync(cssPath)) {
  console.error('CSS file not found:', cssPath);
  process.exit(2);
}

const css = fs.readFileSync(cssPath, 'utf8');

// Extract CSS variables from :root
const varRegex = /--([a-z0-9-]+)\s*:\s*([^;\n]+)\s*;/gi;
const vars = {};
let m;
while ((m = varRegex.exec(css)) !== null) {
  vars[m[1]] = m[2].trim();
}

function parseColorToken(token) {
  if (!token) return null;
  token = token.trim();
  // rgba or rgb
  const rgba = token.match(/rgba?\(([^)]+)\)/i);
  if (rgba) {
    const parts = rgba[1].split(',').map(p => p.trim());
    const r = parseFloat(parts[0]);
    const g = parseFloat(parts[1]);
    const b = parseFloat(parts[2]);
    const a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
    return {r,g,b,a};
  }
  // hex #rrggbb or #rgb
  const hex = token.match(/#([0-9a-f]{3,6})/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) {
      h = h.split('').map(c => c + c).join('');
    }
    const r = parseInt(h.substr(0,2),16);
    const g = parseInt(h.substr(2,2),16);
    const b = parseInt(h.substr(4,2),16);
    return {r,g,b,a:1};
  }
  // try to find first color inside gradients
  const inner = token.match(/(rgba?\([^)]+\)|#[0-9a-f]{3,6})/i);
  if (inner) return parseColorToken(inner[1]);
  return null;
}

function relativeLuminance({r,g,b}){
  const srgb = [r,g,b].map(v=>{
    v = v/255;
    return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4);
  });
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}

function contrastRatio(c1,c2){
  const L1 = relativeLuminance(c1);
  const L2 = relativeLuminance(c2);
  const top = Math.max(L1,L2)+0.05;
  const bot = Math.min(L1,L2)+0.05;
  return +(top/bot).toFixed(2);
}

function reportPair(fgVar, bgVar) {
  const fgToken = vars[fgVar];
  const bgToken = vars[bgVar];
  const fg = parseColorToken(fgToken);
  const bg = parseColorToken(bgToken);
  if (!fg) {
    console.log(`- ${fgVar}: unable to parse token: ${fgToken}`);
    return;
  }
  if (!bg) {
    console.log(`- ${bgVar}: unable to parse token: ${bgToken}`);
    return;
  }
  const ratio = contrastRatio(fg,bg);
  const passAA = ratio >= 4.5;
  const passAA_Large = ratio >= 3.0;
  console.log(`${fgVar} on ${bgVar}: ${ratio}:1  ${passAA ? 'PASS AA' : (passAA_Large ? 'PASS AA-Large' : 'FAIL')}`);
}

console.log('Found CSS variables:', Object.keys(vars).length);

const checks = [
  ['text-primary','bg-deep'],
  ['text-primary','bg-void'],
  ['text-primary','bg-card'],
  ['text-secondary','bg-card'],
  ['text-tertiary','bg-card'],
  ['accent','bg-card'],
  ['accent-bright','bg-card']
];

console.log('\nContrast audit results:');
checks.forEach(([fg,bg])=>{
  if (!vars[fg]) console.log(`- missing variable: --${fg}`);
  if (!vars[bg]) console.log(`- missing variable: --${bg}`);
  if (vars[fg] && vars[bg]) reportPair(fg,bg);
});

console.log('\nFull variable dump (sample):');
['bg-deep','bg-card','text-primary','text-secondary','text-tertiary','accent','accent-bright'].forEach(k=>{
  console.log(`--${k}: ${vars[k] || 'N/A'}`);
});

// Exit with code 0
process.exit(0);
