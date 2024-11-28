export interface Guide {
  id: number
  name: string
  tickets: number[]
}

export interface Winner {
  guide: Guide
  ticket: number
  prize: string
}

