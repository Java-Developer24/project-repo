import { useState } from 'react'
import { Winner } from '../types'
import { motion, AnimatePresence } from 'framer-motion'
import WinnerReveal from './WinnerReveal'

interface ContestDashboardProps {
  winners: Winner[]
  generateWinner: () => void
}

export default function ContestDashboard({ winners, generateWinner }: ContestDashboardProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showWinnerReveal, setShowWinnerReveal] = useState(false)

  const handleGenerateWinner = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate delay
    generateWinner()
    setIsGenerating(false)
    setShowWinnerReveal(true)
  }

  return (
    <div className="p-8 text-center relative overflow-hidden">
      <h1 className="text-4xl font-bold mb-8 text-purple-600">Thrilling Contest Dashboard</h1>
      <motion.button 
        onClick={handleGenerateWinner}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 disabled:opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isGenerating || winners.length >= 2}
      >
        {isGenerating ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Selecting Winner...
          </span>
        ) : (
          'Reveal Lucky Winner!'
        )}
      </motion.button>

      <div className="mt-12 space-y-6">
        <AnimatePresence>
          {winners.map((winner, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Winner {index + 1}</h2>
              <p className="text-white text-lg">
                <span className="font-semibold">{winner.guide.name}</span> with ticket <span className="font-semibold">{winner.ticket}</span> wins a <span className="font-semibold">{winner.prize}</span>!
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showWinnerReveal && (
          <WinnerReveal
            winnerNumber={winners.length}
            prizeName={winners[winners.length - 1].prize}
            onComplete={() => setShowWinnerReveal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

