import { Winner } from '../types'

interface ContestProps {
  winners: Winner[]
  generateWinner: () => void
}

export default function ContestComponent({ winners, generateWinner }: ContestProps) {
  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Contest</h2>
      <button 
        onClick={generateWinner}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Generate Winner
      </button>
      <div className="mt-4 space-y-2">
        {winners.map((winner, index) => (
          <p key={index} className="bg-gray-100 p-3 rounded">
            Winner {index + 1}: {winner.guide.name} with ticket {winner.ticket} wins a {winner.prize}!
          </p>
        ))}
      </div>
    </div>
  )
}

