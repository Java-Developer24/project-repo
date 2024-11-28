import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface WinnerAnimationProps {
  winnerNumber: number
}

export default function WinnerAnimation({ winnerNumber }: WinnerAnimationProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <audio ref={audioRef} src="/winner-sound.mp3" />
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke={winnerNumber === 1 ? "#FFD700" : "#C0C0C0"}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.text
          x="50"
          y="50"
          textAnchor="middle"
          dy=".3em"
          fill={winnerNumber === 1 ? "#FFD700" : "#C0C0C0"}
          fontSize="20"
          fontWeight="bold"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Winner {winnerNumber}!
        </motion.text>
      </svg>
      <motion.div
        className="absolute"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="text-9xl">
          {winnerNumber === 1 ? '🏍️' : '🛵'}
        </div>
      </motion.div>
    </div>
  )
}

