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
  alpha: "ff",
}

export const hexSlice = createAppSlice({
  name: "hex",
  initialState,
  reducers: create => ({
    incrementAlpha: create.reducer(state => {
      state.alpha = parseHexAndOperate(state.alpha, 5, true)
    }),
    decrementAlpha: create.reducer(state => {
      state.alpha = parseHexAndOperate(state.alpha, 5, false)
    }),
    randomiseHex: create.reducer(state => {
      const [segOne, segTwo, segThree, segFour, segFive, segSix] =
        produceRandomHex()
      const hex = `${segOne}${segTwo}${segThree}${segFour}${segFive}${segSix}`
      state.hex = hex
    }),
    incrementHex: create.reducer(state => {
      state.hex = parseHexAndOperate(state.hex, 8, true)
    }),
    decrementHex: create.reducer(state => {
      state.hex = parseHexAndOperate(state.hex, 8, false)
    }),
  }),
  selectors: {
    selectHexWithAlpha: hex => hexWithAlpha(hex.hex, hex.alpha),
  },
})

// Abstraction to combine hex colour code with alpha value
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

/**
 * Hexadecimal randomiser to be used in conjunction with
 * tuple to produce named segments in destructure pattern
 *
 * @example
 * const [one, two, three, ...] = produceRandomHex()
 * //Operation results in each of the produced tuple to equate to
 * //a randomised hex character, which are then concatenated
 * @returns single randomised base 16 compliant character
 *
 */
function produceRandomHex(): string {
  const hexes = []
  const randomiser = new Prando()
  for (let i = 0; i < 6; i++) {
    const randomHex = randomiser.nextInt(0, 16)
    hexes.push(toHex(randomHex))
  }
  return hexes.join("")
}

// Small-form abstraction of add operation
function add(numA: number, numB: number): number {
  return numA + numB
}

// Small-form abstraction of subtract operation
function subtract(numA: number, numB: number): number {
  return numA - numB
}

/**
 *
 * @param {string} hex - the string representation of a hex color code - representing only the colour
 * @param {number} step - numeric (currently hardcoded) measure for incrementation and decrementation
 * @param {boolean} addition - whether operation is addition or not
 *
 * @example
 * const foo =
 * parseHexAndOperate("000", 2, true)
 * //One increment of this operation would result in
 * //"000" -> "002" then >> "004" ...
 * @returns parsed and operated array
 */
function parseHexAndOperate(
  hex: string,
  step: number,
  addition: boolean,
): string {
  //check hex last item when added is modded?
  let valid = false
  const array = hex.split("")
  let i = array.length - 1
  while (!valid) {
    const numChar = parseInt(array[i], 16)
    if (isNaN(numChar) && numChar !== 0) {
      console.log("NAN")
      return addition ? initialState.hex : "ffffff"
    }
    console.log("NUMCHAR", numChar)
    const stepped = addition ? add(numChar, step) : subtract(numChar, step)
    if (addition ? stepped > 15 : stepped < 0) {
      const rolled = remainderFromModulo(numChar, HEXMOD, step, addition)
      array.splice(i, 1, toHex(rolled))
      i--
      continue
    } else {
      console.log("CHECK - not rolled")
      const value = remainderFromModulo(
        numChar,
        HEXMOD,
        addition ? step : -step,
        addition,
      )
      array.splice(i, 1, toHex(value))
      valid = true
    }
    i--
  }
  return array.join("")
}

/**
 *
 * @param {number} value - value to be evaluated
 * @param {number} dividend - (16) modulus of base 16
 * @param {number} step - number to augment value by
 * @param {boolean} addition - condition to decide subtraction modulus outcome
 * @returns
 */
function remainderFromModulo(
  value: number,
  dividend: number,
  step: number,
  addition: boolean,
): number {
  const stepAdjustedValue = value + step
  if (!addition) {
    const result = stepAdjustedValue % dividend
    return result < 0 ? result * -1 : result
  }
  return stepAdjustedValue % dividend
}

function toHex(value: number): string {
  return value.toString(16)
}
