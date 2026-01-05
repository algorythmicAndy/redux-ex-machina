import type { JSX } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  randomiseHex,
  selectHexWithAlpha,
  incrementHex,
  decrementHex,
} from "./hexadecimalSlice"
import styles from "./Hexadecimal.module.css"

export const Hexidecimal = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const hex = useAppSelector(selectHexWithAlpha)
  return (
    <div className={styles.basicRectangleContainer}>
      <div className="flex flex-col">
        <div
          className={styles.basicRectangle}
          //@ts-expect-error -> custom css variable
          style={{ "--bg-color": hex }}
        ></div>
        <div className="flex flex-row justify-center gap-3 select-none">
          <button
            className="text-center mt-2 bg-amber-600 py-1 px-2 hover:bg-amber-900 hover:cursor-pointer"
            onClick={() => dispatch(randomiseHex())}
          >
            Random
          </button>
          <button
            className="text-center mt-2 bg-amber-600 py-1 px-2 hover:bg-amber-900 hover:cursor-pointer"
            onClick={() => dispatch(incrementHex())}
          >
            incrementHex
          </button>
          <button
            className="text-center mt-2 bg-amber-600 py-1 px-2 hover:bg-amber-900 hover:cursor-pointer"
            onClick={() => dispatch(decrementHex())}
          >
            decrementHex
          </button>
        </div>
      </div>
    </div>
  )
}
