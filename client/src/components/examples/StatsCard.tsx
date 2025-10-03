import StatsCard from '../StatsCard'
import { FileText } from 'lucide-react'

export default function StatsCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <StatsCard
        title="Total Blogs"
        value="24"
        icon={FileText}
        description="+12% from last month"
      />
    </div>
  )
}
