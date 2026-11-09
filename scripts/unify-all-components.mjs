import fs from 'fs';
import path from 'path';

const componentsDir = './src/components';
const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.tsx') && f !== 'InvestmentGraphBackground.tsx');

console.log(`Processing ${files.length} components for tone & theme unification...`);

files.forEach((file) => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Replace all neutral stone- with modern slate-
  content = content.replace(/stone-/g, 'slate-');

  // 2. Replace legacy earthy green/brown background hex codes
  content = content.replace(/#FCFAF7/g, '#F8FAFC');
  content = content.replace(/#18201B/g, '#0F172A');
  content = content.replace(/#FAF9FC/g, '#F8FAFC');
  content = content.replace(/#131722/g, '#0F172A');

  // 3. Section subheader step indicator: e.g. text-emerald-700 dark:text-emerald-400 -> text-purple-700 dark:text-purple-400
  content = content.replace(/font-mono text-emerald-700 dark:text-emerald-400/g, 'font-mono text-purple-700 dark:text-purple-400 font-bold');
  content = content.replace(/font-mono text-emerald-800 dark:text-emerald-300/g, 'font-mono text-purple-800 dark:text-purple-300 font-bold');

  // 4. Buttons and active tabs
  content = content.replace(/bg-emerald-800 hover:bg-emerald-900 text-white/g, 'bg-slate-950 hover:bg-black text-white font-bold shadow-sm');
  content = content.replace(/bg-emerald-800 text-white/g, 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs');
  content = content.replace(/bg-emerald-700 text-white/g, 'bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-xs');
  content = content.replace(/bg-emerald-600 text-white/g, 'bg-purple-600 text-white');
  content = content.replace(/bg-emerald-800 text-amber-300/g, 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white');

  // 5. Borders and active selection rings
  content = content.replace(/border-emerald-600 dark:border-emerald-500 shadow-2xs ring-2 ring-emerald-600\/20/g, 'border-purple-600 dark:border-purple-500 shadow-2xs ring-2 ring-purple-600/20');
  content = content.replace(/border-emerald-500/g, 'border-purple-500');
  content = content.replace(/hover:border-emerald-300/g, 'hover:border-purple-300');
  content = content.replace(/hover:border-emerald-400/g, 'hover:border-purple-400');
  content = content.replace(/hover:border-emerald-800/g, 'hover:border-purple-800');
  content = content.replace(/border-emerald-300/g, 'border-purple-300');
  content = content.replace(/border-emerald-800/g, 'border-purple-800');

  // 6. Gradient progress bars
  content = content.replace(/from-emerald-600 to-emerald-700/g, 'from-purple-600 via-fuchsia-600 to-pink-500');
  content = content.replace(/from-emerald-500 to-emerald-600/g, 'from-purple-500 via-fuchsia-500 to-pink-500');

  // 7. Light backgrounds for cards/sections
  content = content.replace(/bg-emerald-50\/90 dark:bg-emerald-950\/50/g, 'bg-purple-50/90 dark:bg-purple-950/50');
  content = content.replace(/bg-emerald-50\/90 dark:bg-emerald-950\/40/g, 'bg-purple-50/90 dark:bg-purple-950/40');
  content = content.replace(/bg-emerald-50\/40 dark:bg-emerald-950\/20/g, 'bg-purple-50/40 dark:bg-purple-950/20');
  content = content.replace(/bg-emerald-50/g, 'bg-purple-50');
  content = content.replace(/dark:bg-emerald-950/g, 'dark:bg-purple-950');

  // 8. Badges and subtle icon boxes
  content = content.replace(/bg-emerald-100\/70 dark:bg-emerald-950\/60 text-emerald-800 dark:text-emerald-300/g, 'bg-purple-100/70 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300');
  content = content.replace(/bg-amber-100\/70 dark:bg-amber-950\/60 text-amber-800 dark:text-amber-300/g, 'bg-fuchsia-100/70 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300');
  content = content.replace(/bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800/g, 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800');

  // 9. General title & header accents
  content = content.replace(/text-amber-800 dark:text-amber-400/g, 'text-fuchsia-700 dark:text-fuchsia-400 font-semibold');
  content = content.replace(/text-amber-700 dark:text-amber-400/g, 'text-fuchsia-700 dark:text-fuchsia-400 font-semibold');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  } else {
    console.log(`No changes needed: ${file}`);
  }
});

console.log('Unification script complete!');
