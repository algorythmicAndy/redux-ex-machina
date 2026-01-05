import type { JSX } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { randomiseHex, selectHexWithAlpha } from "./hexadecimalSlice"
import styles from "./Hexadecimal.module.css"

export const Hexidecimal = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const hex = useAppSelector(selectHexWithAlpha)
  console.log("DEBUG: hex:", hex)
  return (
    <div className="flex flex-col">
      <div
        className={styles.basicRectangle}
        //@ts-expect-error -> custom css variable
        style={{ "--bg-color": hex }}
      ></div>
      <div className="flex flex-row justify-center gap-3">
        <button
          className="text-center mt-2 bg-amber-600 py-1 px-2 hover:bg-amber-900 hover:cursor-pointer"
          onClick={() => dispatch(randomiseHex())}
        >
          Random
        </button>
      </div>
    </div>
  )
}
