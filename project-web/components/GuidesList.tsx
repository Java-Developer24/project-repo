import { Guide } from '../types'

interface GuidesListProps {
  guides: Guide[]
}

export default function GuidesListComponent({ guides }: GuidesListProps) {
  return (
    <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Guides and Tickets</h2>
      <ul className="space-y-2">
        {guides.map(guide => (
          <li key={guide.id} className="bg-gray-100 p-3 rounded">
            {guide.name}: Tickets {guide.tickets.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )
}

