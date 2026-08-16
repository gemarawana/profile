const fs = require('fs');
const path = require('path');

const modules = [
  { name: 'hero-slides', folder: 'hero', formName: 'hero-form.tsx', fieldName: 'image_url' },
  { name: 'members', folder: 'organization', formName: 'member-form.tsx', fieldName: 'image_url' },
  { name: 'activities', folder: 'whatwedo', formName: 'activity-form.tsx', fieldName: 'image_url' },
  { name: 'journey', folder: 'journey', formName: 'journey-form.tsx', fieldName: 'image_url' },
  { name: 'gallery', folder: 'gallery', formName: 'gallery-form.tsx', fieldName: 'image_url' },
  { name: 'member-stories', folder: 'memberstory', formName: 'member-story-form.tsx', fieldName: 'image_url' },
  { name: 'articles', folder: 'article', formName: 'article-form.tsx', fieldName: 'image_url' },
];

for (const mod of modules) {
  const dir = path.join('src/app/admin/(dashboard)/content', mod.name);
  if (!fs.existsSync(dir)) continue;

  // 1. Update Form
  const formPath = path.join(dir, mod.formName);
  let formContent = fs.readFileSync(formPath, 'utf8');
  formContent = formContent.replace('import { ImagePickerField, type ImageOption } from \'@/components/admin/ImagePicker\'', 'import { ImageUploadField } from \'@/components/admin/ImagePicker\'');
  formContent = formContent.replace('import { ImageUploadField, type ImageOption } from \'@/components/admin/ImagePicker\'', 'import { ImageUploadField } from \'@/components/admin/ImagePicker\'');
  formContent = formContent.replace('images: ImageOption[]', '');
  formContent = formContent.replace('images,', '');
  formContent = formContent.replace('onUpload: (formData: FormData) => Promise<{ url?: string; error?: string }>', '');
  formContent = formContent.replace('onUpload,', '');
  formContent = formContent.replace(/<ImagePickerField[^>]*images=\{images\}[^>]*onUpload=\{onUpload\}[^>]*\/>/gs, (match) => {
    let newMatch = match.replace('ImagePickerField', 'ImageUploadField');
    newMatch = newMatch.replace(/images=\{images\}/g, '');
    newMatch = newMatch.replace(/onUpload=\{onUpload\}/g, '');
    return newMatch;
  });
  formContent = formContent.replace(/ImagePickerField/g, 'ImageUploadField');
  formContent = formContent.replace(/images=\{images\}/g, '');
  formContent = formContent.replace(/onUpload=\{onUpload\}/g, '');
  
  fs.writeFileSync(formPath, formContent);

  // 2. Update Actions
  const actionsPath = path.join(dir, 'actions.ts');
  let actionsContent = fs.readFileSync(actionsPath, 'utf8');
  
  if (!actionsContent.includes('uploadFileToStorage')) {
    actionsContent = actionsContent.replace('import { revalidatePath }', 'import { revalidatePath }\nimport { uploadFileToStorage } from \'@/lib/dal/admin/images\'');
    
    actionsContent = actionsContent.replace(/function payloadFromForm\(formData: FormData\) \{/g, `async function payloadFromForm(formData: FormData) {
  let imageUrl = String(formData.get('existing_${mod.fieldName}') || '')
  const file = formData.get('${mod.fieldName}')
  if (file instanceof File && file.size > 0) {
    const res = await uploadFileToStorage(file, '${mod.folder}')
    if (res.error) throw new Error(res.error)
    imageUrl = res.url || ''
  }
`);
    actionsContent = actionsContent.replace(`image_url: String(formData.get('image_url') || ''),`, `image_url: imageUrl,`);
    actionsContent = actionsContent.replace(`image_url: String(formData.get('image_url') || '')`, `image_url: imageUrl`);

    actionsContent = actionsContent.replace(/const parsed = parseForm\(([^,]+), payloadFromForm\(formData\)\)/g, 'try {\n    const payload = await payloadFromForm(formData);\n    const parsed = parseForm($1, payload)');
    
    // Clean up the `try {` block nesting since we pushed `try {` up
    actionsContent = actionsContent.replace(/try \{\n    const payload = await payloadFromForm\(formData\);\n    const parsed = parseForm\(([^,]+), payload\)\n  if \(!parsed\.data\) return fail\(parsed\.error!, parsed\.fieldErrors\)\n  try \{/g, 'try {\n    const payload = await payloadFromForm(formData);\n    const parsed = parseForm($1, payload)\n    if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)');
    
    fs.writeFileSync(actionsPath, actionsContent);
  }

  // 3. Update new/page.tsx and [id]/page.tsx
  for (const page of ['new/page.tsx', '[id]/page.tsx']) {
    const pagePath = path.join(dir, page);
    if (!fs.existsSync(pagePath)) continue;
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    pageContent = pageContent.replace(/images=\{[^}]+\}/g, '');
    pageContent = pageContent.replace(/onUpload=\{[^}]+\}/g, '');
    pageContent = pageContent.replace(/import \{ listPublishedImages.*\} from '.*images'/g, '');
    pageContent = pageContent.replace(/const images = await listPublishedImages\(\)/g, '');
    fs.writeFileSync(pagePath, pageContent);
  }
}
