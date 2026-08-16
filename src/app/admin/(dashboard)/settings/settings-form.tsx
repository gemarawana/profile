'use client'

import { FormShell, TextAreaField } from '@/components/admin/FormFields'
import { ImageUploadField } from '@/components/admin/ImagePicker'
import type { TypedSiteSettings } from '@/lib/site-settings'
import type { ActionResult } from '@/lib/validations/cms'

export function SettingsForm({
  initial,
  onSubmit,
}: {
  initial: TypedSiteSettings
  onSubmit: (formData: FormData) => Promise<ActionResult>
}) {
  return (
    <FormShell cancelHref="/admin/settings" onSubmit={onSubmit} submitLabel="Save settings">
      <TextAreaField
        label="Nav Links (JSON array of {label, href})"
        name="nav_links"
        defaultValue={JSON.stringify(initial.nav_links, null, 2)}
        rows={8}
        required
      />
      <TextAreaField
        label="Footer Nav Links (JSON array of {label, href})"
        name="footer_nav_links"
        defaultValue={JSON.stringify(initial.footer_nav_links, null, 2)}
        rows={8}
        required
      />
      <TextAreaField
        label="Footer Socials (JSON array of {label, href})"
        name="footer_socials"
        defaultValue={JSON.stringify(initial.footer_socials, null, 2)}
        rows={8}
        required
      />
      <div className="pt-4 border-t border-[#E8E5E0]">
        <h4 className="font-bold text-[#1A0A0A] mb-4">Site Images</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploadField
            name="intro_image"
            label="Introduction Image (Optional)"
            value={initial.intro_image}
          />
          <ImageUploadField
            name="cta_image"
            label="CTA Background (Optional)"
            value={initial.cta_image}
          />
        </div>
      </div>
    </FormShell>
  )
}
