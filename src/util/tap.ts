
export default function tapPrint (v: any, message?: string): any {
  console.log(message ?? '', v)
  return v
}