const fs = require('fs');

// src/app/about/page.tsx
let about = fs.readFileSync('src/app/about/page.tsx', 'utf8');
about = about.replace(/import \{.*getImageUrls.*\} from '@\/lib\/dal'/, "import { getHistoryMilestones, getSiteSettings } from '@/lib/dal'");
about = about.replace(/getImageUrls,?/, 'getSiteSettings,'); // Fallback
about = about.replace(/const imageUrls = await getImageUrls\(\)/, 'const introImage = await getSiteSettings(\'intro_image\')');
about = about.replace(/imageUrls\.intro/g, "(introImage as string) || ''");
fs.writeFileSync('src/app/about/page.tsx', about);

// src/app/recruitment/page.tsx
let recruit = fs.readFileSync('src/app/recruitment/page.tsx', 'utf8');
recruit = recruit.replace(/import \{.*getImageUrls.*\} from '@\/lib\/dal'/, "import { getSiteSettings } from '@/lib/dal'");
recruit = recruit.replace(/getImageUrls,?/, 'getSiteSettings,'); // Fallback
recruit = recruit.replace(/const imageUrls = await getImageUrls\(\)/, 'const ctaImage = await getSiteSettings(\'cta_image\')');
recruit = recruit.replace(/imageUrls\.ctaBg/g, "(ctaImage as string) || ''");
fs.writeFileSync('src/app/recruitment/page.tsx', recruit);
