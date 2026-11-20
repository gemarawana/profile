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
        description="Edit navigation, contact, footer social links, media, and website theme color."
      />
      <SettingsForm initial={settings} onSubmit={saveSettings} />
    </div>
  )
}
