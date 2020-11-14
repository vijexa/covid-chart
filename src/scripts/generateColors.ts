import hslToHex from 'hsl-to-hex'

export default function generateHexColors (n: number): string[] {
  console.log(hslToHex(0, 100, 50))
  return Array.from(
    new Array(n), 
    (_, i) =>
      hslToHex((360 / n) * i, 100, 50)
  )
}