export {}

declare global {
  interface Number {
    toBase16: () => string
  }
}
