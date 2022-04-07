import { getUUID } from "."

describe('UUID', () => {
  test('should generate many unique ids', () => {
    const ids: string[] = []
    for (let i = 0; i < 10_000; i += 1) {
      ids.push(getUUID())
    }

    expect(Array.from(new Set(ids)).length).toBe(10_000)
  })
})
