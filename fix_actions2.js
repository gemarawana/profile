const fs = require('fs');
const path = require('path');

const modules = [
  'hero-slides',
  'members',
  'activities',
  'journey',
  'gallery',
  'member-stories',
  'articles',
];

for (const mod of modules) {
  const file = path.join('src/app/admin/(dashboard)/content', mod, 'actions.ts');
  if (!fs.existsSync(file)) continue;

  let code = fs.readFileSync(file, 'utf8');

  // Move `await requireAdmin()` that sits alone before `try {` into the try block
  // Pattern: requireAdmin()\n  try {\n
  code = code.replace(
    /(\s*await requireAdmin\(\))\r?\n(\s*try \{)/g,
    '\n  try {\n    await requireAdmin()'
  );

  // Also fix the catch block to re-throw Next.js internal errors (redirect, notFound)
  code = code.replace(
    /} catch \(e\) \{\r?\n(\s*)return fail\(e instanceof Error \? e\.message : '([^']+)'\)\r?\n(\s*)}/g,
    (match, indent, msg, closingIndent) =>
      `} catch (e) {\n${indent}if (e && typeof e === 'object' && 'digest' in e) throw e\n${indent}return fail(e instanceof Error ? e.message : '${msg}')\n${closingIndent}}`
  );

  fs.writeFileSync(file, code);
  console.log('Fixed:', mod);
}
