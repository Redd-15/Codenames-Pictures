import { AGENT_CARD_NO, CardColour, MAX_CARD_NO } from "."

/** Card type */
export class Card {
  /** Unique image id, naming: card-{id}.jpg */
  id: number
  /** Card dolour */
  colour: CardColour
  /** Has this card been revealed to the players */
  isSecret: boolean

  cardPath : string
  agentCardPath ?: string

  constructor(id: number, colour: CardColour = CardColour.Grey) {
    if (id >= 0 && id <= MAX_CARD_NO){
      this.id = id
      this.colour = colour
      this.isSecret = true

      //Determine the corresponding card and agent card paths
      //Take a random given coloured agent number, if the colour is unknown, let it be null
      let no = colour == CardColour.Unknown ? null : Math.floor( Math.random() * AGENT_CARD_NO[colour] +1 )
      this.cardPath = `/cards/card-${this.id}.jpg`
      this.agentCardPath = `/agents/${this.colour}-${no}.jpg`
    }
    else throw new Error(`Card ID must be between 0 and ${MAX_CARD_NO}`)
  }

  /** Get card image path */
  public getFilePath() {
      return this.cardPath
  }

  /** Get agent image path */
  public getBackFilePath() {
    if(this.colour==CardColour.Unknown) return `/agents/grey-1.jpg`
    return this.agentCardPath
  }

  /** Reveal card colour to players */
  public revealColour() {
    this.isSecret = false
  }
}
