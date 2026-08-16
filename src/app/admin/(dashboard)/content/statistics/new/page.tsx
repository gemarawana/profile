import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { createItem } from '../actions'
import { StatisticForm } from '../statistic-form'

export default function NewPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Content' },
          { label: 'Impact Statistics', href: '/admin/content/statistics' },
          { label: 'New' },
        ]}
      />
      <PageHeader title="Add Statistic" />
      <StatisticForm onSubmit={createItem} />
    </div>
  )
}
