export class UUIDSpooler {
  private _cache: string[] = []

  public getUUID = (): string|false => {
    const batch = this.getBatch()

    const inCache = (value: string): boolean => this._cache.includes(value) 

    const pushAndReturn = (value: string): string => {
      this._cache.push(value)
      return value
    }

    if (!inCache(batch[0])) return pushAndReturn(batch[0])
    else if (!inCache(batch[1])) return pushAndReturn(batch[1])
    else if (!inCache(batch[2])) return pushAndReturn(batch[2])
    return false
  }

  private getBatch(): [string, string, string] {
    const { random } = Math
    const batch: string[] = []

    const generateStringChunk = (): string => {
      return random()
        .toString(36)
        .replace(/^0\./, '')
        .slice(0, 4)
    }

    const generateUUID = (): string => {
      const chunks: string[] = []
      for (let i = 0; i < 4; i += 1) {
        chunks.push(generateStringChunk())
      }
      return chunks.join('-')
    }

    for (let i = 0; i < 3; i += 1) batch.push(generateUUID())
    
    return batch as [string, string, string]
  }
}