import { Guide } from '../types'

export function generateGuideData(numGuides: number, totalTickets: number): Guide[] {
  const guides: Guide[] = []
  const allTickets = Array.from({length: totalTickets}, (_, i) => i + 1)
  let remainingTickets = [...allTickets]

  // Ensure each guide gets at least one ticket
  for (let i = 1; i <= numGuides; i++) {
    const ticketIndex = Math.floor(Math.random() * remainingTickets.length)
    const initialTicket = remainingTickets[ticketIndex]
    remainingTickets.splice(ticketIndex, 1)

    guides.push({
      id: i,
      name: `Guide ${i}`,
      tickets: [initialTicket]
    })
  }

  // Distribute remaining tickets
  while (remainingTickets.length > 0) {
    const guideIndex = Math.floor(Math.random() * numGuides)
    const ticketIndex = Math.floor(Math.random() * remainingTickets.length)
    
    guides[guideIndex].tickets.push(remainingTickets[ticketIndex])
    remainingTickets.splice(ticketIndex, 1)
  }

  // Sort tickets for each guide
  guides.forEach(guide => {
    guide.tickets.sort((a, b) => a - b)
  })

  return guides
}

