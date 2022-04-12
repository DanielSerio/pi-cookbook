import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";

export function useRenderTornPage(ref: RefObject<HTMLCanvasElement>) {
  const heightUnit: number = 4
  let hasRendered: MutableRefObject<boolean> = useRef<boolean>(false)

  useEffect(() => {
    const { ceil, floor, random } = Math

    function* EdgeGenerator() {
      const min: number = 2
      const max: number = 64
      let value: number = 33

      const incs: number[] = [2, 4, 8, 12]
      const getInc = () => incs[floor(random())]
      const getChance = () => random() >= 0.5
  
      while (true) {
        const inc = getInc()
        const dir = getChance() ? -1 : 1
        const distance: number = dir * inc
  
        if (value + distance >= min || value + distance <= max) {
          value = value + distance
        }
  
        yield value
      }
    }

    function getEdge(canvas: HTMLCanvasElement) {
      const generator = EdgeGenerator()
      let current = generator.next()
      const values: number[] = []
      const count: number = ceil((canvas.parentElement?.clientHeight || 300) / heightUnit)
      for (let i = 0; i < count; i += 1) {
        if (!current.done) values.push(current.value)
        current = generator.next()
      }

      return values
    }

    if (ref && ref.current && hasRendered.current === false) {
      console.table({hasRendered})
      hasRendered.current = true
      const canvas: HTMLCanvasElement = ref.current
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
      canvas.height = canvas.parentElement?.clientHeight || 600
      const edge = getEdge(canvas)
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(0, 0)
      edge.forEach((x: number, y: number) => {
        console.log(x, y)
        ctx.lineTo(x, y * heightUnit)
      })
      ctx.lineTo(33, canvas.height + 1)
      ctx.lineTo(0, canvas.height + 1)
      ctx.lineTo(0, 0)
      ctx.fillStyle = 'white'
      ctx.filter = `drop-shadow(1px 1px 4px #afafaf)`
      ctx.strokeStyle = '#dfdfdf'
      ctx.stroke()
      ctx.fill()
      ctx.closePath()
      ctx.restore()

    }
  }, [ref, hasRendered])
}