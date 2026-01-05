// utils/numberExtensions.ts
export {}
Number.prototype.toBase16 = function (): string {
  if (this.valueOf().toString().includes(".")) {
    return "0"
  }
  return this.valueOf().toString(16)
}
