function generateGuideData(numGuides, totalTickets) {
    const guides = [];
    const allTickets = Array.from({length: totalTickets}, (_, i) => i + 1);
    let remainingTickets = [...allTickets];

    for (let i = 1; i <= numGuides; i++) {
        const numTickets = Math.floor(Math.random() * 10) + 1; // 1 to 10 tickets per guide
        const tickets = [];

        // Assign tickets in order
        for (let j = 0; j < numTickets && remainingTickets.length > 0; j++) {
            const index = Math.floor(Math.random() * remainingTickets.length);
            tickets.push(remainingTickets[index]);
            remainingTickets.splice(index, 1);
        }

        guides.push({
            id: i,
            name: `Guide ${i}`,
            tickets: tickets.sort((a, b) => a - b)
        });
    }

    return guides;
}

// Generate 50 guides with tickets from 1 to 200
const guides = generateGuideData(50, 200);

// Display guides and their tickets
function displayGuides() {
    const guidesList = document.getElementById('guidesList');
    guidesList.innerHTML = '';

    guides.forEach(guide => {
        const li = document.createElement('li');
        li.textContent = `${guide.name}: Tickets ${guide.tickets.join(', ')}`;
        guidesList.appendChild(li);
    });
}

// Generate a winner
let winners = [];
function generateWinner() {
    if (winners.length >= 2) {
        alert('Contest is over. Two winners have already been selected.');
        return;
    }

    const allTickets = guides.flatMap(guide => guide.tickets);
    const winningTicket = allTickets[Math.floor(Math.random() * allTickets.length)];
    const winningGuide = guides.find(guide => guide.tickets.includes(winningTicket));

    winners.push({
        guide: winningGuide,
        ticket: winningTicket,
        prize: winners.length === 0 ? 'Pulsar Bike' : 'Activa'
    });

    displayWinner(winners[winners.length - 1]);

    // Remove the winning ticket from the guide's tickets
    winningGuide.tickets = winningGuide.tickets.filter(ticket => ticket !== winningTicket);

    // Update the display
    displayGuides();
}

// Display the winner
function displayWinner(winner) {
    const winnerDisplay = document.getElementById('winnerDisplay');
    const winnerInfo = document.createElement('p');
    winnerInfo.textContent = `Winner ${winners.length}: ${winner.guide.name} with ticket ${winner.ticket} wins a ${winner.prize}!`;
    winnerDisplay.appendChild(winnerInfo);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const dashboard = Dashboard();
  dashboard.init();
});

export default function Dashboard() {
  return {
    init: function() {
      displayGuides();
      document.getElementById('generateWinner').addEventListener('click', generateWinner);
    }
  };
}

