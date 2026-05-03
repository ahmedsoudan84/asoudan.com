import { BarChart3, Package, ShoppingCart } from 'lucide-react'

const stats = [
  { label: 'Orders', value: '142' },
  { label: 'Revenue', value: '£12,450' },
  { label: 'Products', value: '16' }
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}