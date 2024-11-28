"use client"

import { useState, useEffect } from 'react'
import { Guide, Winner } from '../types'
import { generateGuideData } from '../utils/dataGenerator'
import AdminDashboard from '../components/AdminDashboard'
import ContestDashboard from '../components/ContestDashboard'

export default function Dashboard() {
  const [guides, setGuides] = useState<Guide[]>([])
  const [winners, setWinners] = useState<Winner[]>([])
  const [activeTab, setActiveTab] = useState<'contest' | 'admin'>('contest')

  useEffect(() => {
    const generatedGuides = generateGuideData(50, 500)
    setGuides(generatedGuides)
  }, [])

  const generateWinner = () => {
    if (winners.length >= 2) {
      alert('Contest is over. Two winners have already been selected.')
      return
    }

    const allTickets = guides.flatMap(guide => guide.tickets)
    const winningTicket = allTickets[Math.floor(Math.random() * allTickets.length)]
    const winningGuide = guides.find(guide => guide.tickets.includes(winningTicket))

    if (winningGuide) {
      const newWinner: Winner = {
        guide: winningGuide,
        ticket: winningTicket,
        prize: winners.length === 0 ? 'Pulsar Bike' : 'Activa'
      }

      setWinners([...winners, newWinner])

      const updatedGuides = guides.map(guide => 
        guide.id === winningGuide.id 
          ? {...guide, tickets: guide.tickets.filter(ticket => ticket !== winningTicket)}
          : guide
      )
      setGuides(updatedGuides)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-center space-x-4 p-4 bg-gray-100">
          <button
            className={`px-4 py-2 rounded-full transition duration-300 ${activeTab === 'contest' ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('contest')}
          >
            Contest Dashboard
          </button>
          <button
            className={`px-4 py-2 rounded-full transition duration-300 ${activeTab === 'admin' ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Dashboard
          </button>
        </div>
        {activeTab === 'contest' ? (
          <ContestDashboard winners={winners} generateWinner={generateWinner} />
        ) : (
          <AdminDashboard guides={guides} />
        )}
      </div>
    </div>
  )
}

