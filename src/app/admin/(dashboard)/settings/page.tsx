import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { getTypedSiteSettings } from '@/lib/site-settings'
import { saveSettings } from './actions'
import { SettingsForm } from './settings-form'

export default async function SettingsPage() {
  const settings = await getTypedSiteSettings()

  return (
    <div>
      <Breadcrumb items={[{ label: 'Settings' }, { label: 'Site Settings' }]} />
      <PageHeader
        title="Site Settings"
        description="Edit website theme color, public section copywriting, contact info, footer links, media, and recruitment URL."
      />
      <SettingsForm initial={settings} onSubmit={saveSettings} />
    </div>
  )
}
