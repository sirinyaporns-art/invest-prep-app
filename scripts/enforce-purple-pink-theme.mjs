import fs from 'fs';
import path from 'path';

const componentsDir = './src/components';
const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.tsx') && f !== 'InvestmentGraphBackground.tsx');

console.log(`Starting deep Purple & Pink theme enforcement on ${files.length} components...`);

files.forEach((file) => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Replace emerald colors with purple / fuchsia
  content = content.replace(/emerald-500/g, 'purple-500');
  content = content.replace(/emerald-600/g, 'purple-600');
  content = content.replace(/emerald-700/g, 'purple-700');
  content = content.replace(/emerald-800/g, 'purple-800');
  content = content.replace(/emerald-900/g, 'purple-900');
  content = content.replace(/emerald-950/g, 'purple-950');
  content = content.replace(/emerald-400/g, 'purple-400');
  content = content.replace(/emerald-300/g, 'purple-300');
  content = content.replace(/emerald-200/g, 'purple-200');
  content = content.replace(/emerald-100/g, 'purple-100');
  content = content.replace(/emerald-50/g, 'purple-50');

  // 2. Replace amber / yellow colors with fuchsia / pink
  content = content.replace(/amber-500/g, 'pink-500');
  content = content.replace(/amber-600/g, 'fuchsia-600');
  content = content.replace(/amber-700/g, 'fuchsia-700');
  content = content.replace(/amber-800/g, 'fuchsia-800');
  content = content.replace(/amber-900/g, 'fuchsia-900');
  content = content.replace(/amber-950/g, 'fuchsia-950');
  content = content.replace(/amber-400/g, 'pink-400');
  content = content.replace(/amber-300/g, 'pink-300');
  content = content.replace(/amber-200/g, 'pink-200');
  content = content.replace(/amber-100/g, 'fuchsia-100');
  content = content.replace(/amber-50/g, 'fuchsia-50');

  // 3. Replace teal colors with fuchsia / purple
  content = content.replace(/teal-500/g, 'fuchsia-500');
  content = content.replace(/teal-600/g, 'fuchsia-600');
  content = content.replace(/teal-700/g, 'fuchsia-700');
  content = content.replace(/teal-800/g, 'fuchsia-800');
  content = content.replace(/teal-900/g, 'fuchsia-900');
  content = content.replace(/teal-950/g, 'fuchsia-950');
  content = content.replace(/teal-400/g, 'fuchsia-400');
  content = content.replace(/teal-300/g, 'fuchsia-300');
  content = content.replace(/teal-200/g, 'fuchsia-200');
  content = content.replace(/teal-100/g, 'fuchsia-100');
  content = content.replace(/teal-50/g, 'fuchsia-50');

  // 4. Replace blue / indigo / cyan with purple / pink / fuchsia
  content = content.replace(/blue-600/g, 'purple-600');
  content = content.replace(/blue-700/g, 'purple-700');
  content = content.replace(/blue-500/g, 'purple-500');
  content = content.replace(/blue-800/g, 'purple-800');
  content = content.replace(/blue-900/g, 'purple-900');
  content = content.replace(/blue-950/g, 'purple-950');
  content = content.replace(/blue-400/g, 'purple-400');
  content = content.replace(/blue-300/g, 'purple-300');
  content = content.replace(/blue-200/g, 'purple-200');
  content = content.replace(/blue-100/g, 'purple-100');
  content = content.replace(/blue-50/g, 'purple-50');

  content = content.replace(/indigo-600/g, 'purple-600');
  content = content.replace(/indigo-700/g, 'purple-700');
  content = content.replace(/indigo-500/g, 'purple-500');
  content = content.replace(/indigo-800/g, 'purple-800');
  content = content.replace(/indigo-900/g, 'purple-900');
  content = content.replace(/indigo-950/g, 'purple-950');
  content = content.replace(/indigo-400/g, 'purple-400');
  content = content.replace(/indigo-300/g, 'purple-300');
  content = content.replace(/indigo-200/g, 'purple-200');
  content = content.replace(/indigo-100/g, 'purple-100');
  content = content.replace(/indigo-50/g, 'purple-50');

  content = content.replace(/cyan-600/g, 'pink-600');
  content = content.replace(/cyan-700/g, 'pink-700');
  content = content.replace(/cyan-500/g, 'pink-500');
  content = content.replace(/cyan-400/g, 'pink-400');
  content = content.replace(/cyan-300/g, 'pink-300');
  content = content.replace(/cyan-200/g, 'pink-200');
  content = content.replace(/cyan-100/g, 'pink-100');
  content = content.replace(/cyan-50/g, 'pink-50');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Enforced Purple-Pink: ${file}`);
  } else {
    console.log(`Already aligned: ${file}`);
  }
});

console.log('Purple & Pink theme enforcement complete!');
