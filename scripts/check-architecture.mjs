import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/demo');
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.js')) files.push(full);
  }
}
walk(root);

const edges = new Map(files.map(file => [file, []]));
const violations = [];
for (const file of files) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/(?:import|export)\s+(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g)) {
    if (!match[1].startsWith('.')) continue;
    const specifierPath = match[1].split('?')[0];
    const resolved = path.resolve(path.dirname(file), specifierPath);
    const target = fs.existsSync(resolved) ? resolved : `${resolved}.js`;
    if (!fs.existsSync(target)) {
      violations.push(`${relative}: unresolved ${match[1]}`);
      continue;
    }
    if (target.endsWith('.js')) edges.get(file).push(target);
    const targetRelative = path.relative(root, target).replaceAll('\\', '/');
    const sourceFeature = relative.match(/^modules\/([^/]+)/)?.[1];
    const targetFeature = targetRelative.match(/^modules\/([^/]+)/)?.[1];
    if (sourceFeature && targetFeature && sourceFeature !== targetFeature) {
      violations.push(`${relative}: feature-to-feature import ${targetRelative}`);
    }
    if (/^(core|data|shared)\//.test(relative) && targetFeature) {
      violations.push(`${relative}: infrastructure imports feature ${targetRelative}`);
    }
    if (relative.startsWith('domain/') && targetFeature) {
      violations.push(`${relative}: domain imports UI ${targetRelative}`);
    }
  }
  if (/https?:\/\/(?:unpkg|cdn\.jsdelivr|cdnjs)/i.test(source)) {
    violations.push(`${relative}: runtime code CDN reference`);
  }
}

const visiting = new Set();
const visited = new Set();
function visit(file, chain = []) {
  if (visiting.has(file)) {
    violations.push(`circular import: ${[...chain, file].map(item => path.relative(root, item)).join(' -> ')}`);
    return;
  }
  if (visited.has(file)) return;
  visiting.add(file);
  for (const target of edges.get(file) || []) visit(target, [...chain, file]);
  visiting.delete(file);
  visited.add(file);
}
files.forEach(file => visit(file));

const required = [
  'app/navigation.js', 'app/module-registry.js', 'core/state.js', 'data/index.js',
  'i18n/index.js', 'shared/icons-variables.js',
  'modules/geneograph/library.js', 'modules/geneograph/editor.js',
  'modules/geneograph/renderer.js', 'modules/geneograph/geometry.js',
  'modules/geneograph/interactions.js', 'modules/geneograph/inspector.js',
  'modules/geneograph/collections.js', 'modules/geneograph/export-png.js',
];
for (const requiredFile of required) {
  if (!fs.existsSync(path.join(root, requiredFile))) violations.push(`missing required file: ${requiredFile}`);
}
if (violations.length) {
  console.error(violations.join('\n'));
  process.exit(1);
}
console.log(`Architecture check passed for ${files.length} JavaScript modules.`);
