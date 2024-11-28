import { Guide } from '../types'

interface AdminDashboardProps {
  guides: Guide[]
}

export default function AdminDashboard({ guides }: AdminDashboardProps) {
  const totalTickets = guides.reduce((sum, guide) => sum + guide.tickets.length, 0)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800">Total Guides</h2>
          <p className="text-3xl font-bold text-blue-600">{guides.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800">Total Tickets</h2>
          <p className="text-3xl font-bold text-green-600">{totalTickets}</p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guide Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Tickets</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Numbers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guides.map((guide) => (
              <tr key={guide.id}>
                <td className="py-4 px-4 text-sm font-medium text-gray-900">{guide.name}</td>
                <td className="py-4 px-4 text-sm text-gray-500">{guide.tickets.length}</td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {guide.tickets.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

