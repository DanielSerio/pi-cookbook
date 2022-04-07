import { UUIDSpooler } from "./Spooler";

const spooler = new UUIDSpooler()

export function getUUID(): string {
  const value: string|false = spooler.getUUID()
  if (!value) throw new Error(`UUIDSpooler has exhausted current batch`)
  return value
}