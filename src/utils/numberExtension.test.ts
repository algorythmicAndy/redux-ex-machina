import "./numberExtension"
describe("number extension", () => {
  test("can translate a number", () => {
    const result = (2).toBase16()
    expect(result).toEqual("2")
  })
  const hexCodes = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ]
  for (let i = 0; i < 16; i++) {
    test(`number ${i.toString()} corresponds to ${hexCodes[i]}`, () => {
      const result = i.toBase16()
      expect(result).toEqual(hexCodes[i])
    })
  }

  test("numbers larger than 16 succesfully translate to base 16", () => {
    const result = (50).toBase16()
    expect(result).toEqual("32")
  })

  test("negative numbers lesser than 16 succesfully translate to base 16", () => {
    const result = (-50).toBase16()
    expect(result).toEqual("-32")
  })

  test("decimal numbers transform to base 16 and default to '0'", () => {
    const result = (1.1).toBase16()
    expect(result).toEqual("0")
  })
})
