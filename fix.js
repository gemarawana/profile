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
  const dir = path.join('src/app/admin/(dashboard)/content', mod);
  if (!fs.existsSync(dir)) continue;

  const actionsPath = path.join(dir, 'actions.ts');
  let actionsContent = fs.readFileSync(actionsPath, 'utf8');

  // Fix import
  actionsContent = actionsContent.replace(
    /import \{ revalidatePath \}\s*\nimport \{ uploadFileToStorage \} from '@\/lib\/dal\/admin\/images' from 'next\/cache'/,
    "import { revalidatePath } from 'next/cache'\nimport { uploadFileToStorage } from '@/lib/dal/admin/images'"
  );

  // Fix try { try {
  actionsContent = actionsContent.replace(
    /try \{\n\s*const payload = await payloadFromForm\(formData\);\n\s*const parsed = parseForm\(([^,]+), payload\)\n\s*if \(!parsed\.data\) return fail\(parsed\.error!, parsed\.fieldErrors\)\n\s*try \{/g,
    'try {\n    const payload = await payloadFromForm(formData);\n    const parsed = parseForm($1, payload)\n    if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)'
  );
  
  fs.writeFileSync(actionsPath, actionsContent);
}
