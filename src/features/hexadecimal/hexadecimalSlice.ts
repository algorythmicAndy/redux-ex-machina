import { createAppSlice } from "../../app/createAppSlice"
import Prando from "prando"

// Hardcoded Modulo to infer 1 over 16 (hexcode int equivalent hard cap), is treated at 0, next being 1, etc.
const HEXMOD = 16

type HexStateSlice = {
  hex: string
  alpha: string
}

const initialState: HexStateSlice = {
  hex: "000000",
  alpha: "FF",
}

export const hexSlice = createAppSlice({
  name: "hex",
  initialState,
  reducers: create => ({
    incrementAlpha: create.reducer(state => {
      state.alpha = parseHexAndIncrement(state.alpha, 5)
    }),
    decrementAlpha: create.reducer(state => {
      state.alpha = parseHexAndIncrement(state.alpha, 5)
    }),
    randomiseHex: create.reducer(state => {
      const [segOne, segTwo, segThree, segFour, segFive, segSix] =
        produceRandomHex()
      const hex = `${segOne}${segTwo}${segThree}${segFour}${segFive}${segSix}`
      state.hex = hex
    }),
    incrementHex: create.reducer(state => {
      state.hex = parseHexAndIncrement(state.hex, 1)
    }),
    decrementHex: create.reducer(state => {
      state.hex = parseHexAndDecrement(state.hex, 1)
    }),
  }),
  selectors: {
    selectHexWithAlpha: hex => hexWithAlpha(hex.hex, hex.alpha),
  },
})

export const hexWithAlpha = (hex: string, alpha: string) => {
  const stringAlpha = alpha
  const formattedHex = `#${hex}${stringAlpha}`
  return formattedHex
}

export const {
  incrementAlpha,
  decrementAlpha,
  randomiseHex,
  incrementHex,
  decrementHex,
} = hexSlice.actions

export const { selectHexWithAlpha } = hexSlice.selectors

function produceRandomHex(): string {
  const hexes = []
  const randomiser = new Prando()
  for (let i = 0; i < 6; i++) {
    const randomHex = randomiser.nextInt(0, 16)
    hexes.push(toHex(randomHex))
  }
  return hexes.join("")
}

function extractStringNumericFromHex(hex: string): {
  strng: string
  changeable: number
} {
  const hexes = []
  for (const char of hex) {
    const intHexBit = parseInt(char, 16).toString()
    hexes.push(intHexBit)
  }
  const returnCandidate = hexes.join("")
  return {
    strng: returnCandidate.substring(0, -2),
    changeable: parseInt(returnCandidate.substring(-1), 16),
  }
}

function parseHexAndIncrement(hex: string, step: number): string {
  const { strng, changeable } = extractStringNumericFromHex(hex)
  const modulated = remainderFromModulo(changeable, HEXMOD, step)
  return `${strng}${toHex(modulated)}`
}

function parseHexAndDecrement(hex: string, step: number): string {
  const { strng, changeable } = extractStringNumericFromHex(hex)
  const modulated = remainderFromModulo(changeable, HEXMOD, -step)
  return `${strng}${toHex(modulated)}`

  // this needs to increment the last hex char by one then transform back, and so on, till first exceeds, then needs to revert to first
}

function remainderFromModulo(
  value: number,
  dividend: number,
  step: number,
): number {
  const stepAdjustedValue = value + step
  return stepAdjustedValue % dividend
}

function toHex(value: number): string {
  return value.toString(16)
}
