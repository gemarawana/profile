const fs = require('fs');
const path = require('path');
const modules = [
  { name: 'hero-slides', schema: 'heroSlideSchema', createFunc: 'createHeroSlide', updateFunc: 'updateHeroSlide', table: 'hero_slides' },
  { name: 'members', schema: 'memberSchema', createFunc: 'createItem', updateFunc: 'updateItem', table: 'organization_members' },
  { name: 'activities', schema: 'activitySchema', createFunc: 'createItem', updateFunc: 'updateItem', table: 'activities' },
  { name: 'journey', schema: 'journeyStepSchema', createFunc: 'createItem', updateFunc: 'updateItem', table: 'journey_steps' },
  { name: 'gallery', schema: 'galleryItemSchema', createFunc: 'createItem', updateFunc: 'updateItem', table: 'gallery_items' },
  { name: 'member-stories', schema: 'memberStorySchema', createFunc: 'createItem', updateFunc: 'updateItem', table: 'member_stories' },
  { name: 'articles', schema: 'articleSchema', createFunc: 'createItem', updateFunc: 'updateItem', table: 'articles' },
];

for (const mod of modules) {
  const file = path.join('src/app/admin/(dashboard)/content', mod.name, 'actions.ts');
  if (!fs.existsSync(file)) continue;
  let code = fs.readFileSync(file, 'utf8');
  
  // Replace the entire export async function createItem block
  const createRegex = new RegExp(`export async function ${mod.createFunc}\\(formData: FormData\\): Promise<ActionResult> \\{[^]*?\\n\\}`, 'm');
  
  code = code.replace(createRegex, `export async function ${mod.createFunc}(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  try {
    const payload = await payloadFromForm(formData);
    const parsed = parseForm(${mod.schema}, payload)
    if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
    await adminCreate('${mod.table}', parsed.data)
    revalidatePath('/admin/content/${mod.name}')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Create failed')
  }
}`);

  const updateRegex = new RegExp(`export async function ${mod.updateFunc}\\(id: string, formData: FormData\\): Promise<ActionResult> \\{[^]*?\\n\\}`, 'm');
  
  code = code.replace(updateRegex, `export async function ${mod.updateFunc}(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  try {
    const payload = await payloadFromForm(formData);
    const parsed = parseForm(${mod.schema}, payload)
    if (!parsed.data) return fail(parsed.error!, parsed.fieldErrors)
    await adminUpdate('${mod.table}', id, parsed.data)
    revalidatePath('/admin/content/${mod.name}')
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Update failed')
  }
}`);
  
  fs.writeFileSync(file, code);
}
