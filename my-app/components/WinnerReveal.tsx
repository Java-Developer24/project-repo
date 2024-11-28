import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

interface WinnerRevealProps {
  winnerNumber: number
  prizeName: string
  onComplete: () => void
}

export default function WinnerReveal({ winnerNumber, prizeName, onComplete }: WinnerRevealProps) {
  const [showEmoji, setShowEmoji] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmoji(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl shadow-lg text-white text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          Winner {winnerNumber}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-2xl mb-6"
        >
          Congratulations! You've won:
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="text-5xl font-bold mb-6"
        >
          {prizeName}
        </motion.div>
        <AnimatePresence>
          {showEmoji && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-9xl mb-8"
            >
              {winnerNumber === 1 ? '🏍️' : '🛵'}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition duration-300"
          onClick={onComplete}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  )
}

