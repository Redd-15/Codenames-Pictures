import { AGENT_CARD_NO, CardColour, MAX_CARD_NO } from "."

/** Card type */
export class Card {
  id: number
  colour: CardColour
  isSecret: boolean
  cardPath : string
  agentCardPath ?: string

  constructor(id: number, colour: CardColour = CardColour.Grey) {
    if (id >= 0 && id <= MAX_CARD_NO){
      this.id = id
      this.colour = colour
      let no = colour == CardColour.Unknown ? null : Math.floor( Math.random() * AGENT_CARD_NO[colour] +1 )
      this.cardPath = `/cards/card-${this.id}.jpg`
      this.agentCardPath = `/agents/${this.colour}-${no}.jpg`
      this.isSecret = true
    }
    else throw new Error(`Card ID must be between 0 and ${MAX_CARD_NO}`)
  }

  public getFilePath() {
      return this.cardPath
  }

  public getBackFilePath() {
    if(this.colour==CardColour.Unknown) return `/agents/grey-1.jpg`
    return this.agentCardPath
}

  public revealCard() {
    this.isSecret = false
  }
}
