// utils/numberExtensions.ts
export {}
Number.prototype.toBase16 = function (): string {
  return this.valueOf().toString(16)
}
