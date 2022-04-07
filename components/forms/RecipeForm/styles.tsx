import { CSSObject, MantineTheme } from "@mantine/core"

export function createFormStyles(t: MantineTheme): Record<string, CSSObject> {
  return ({
    full: {
      ['@media screen and (min-width: 600px)']: {
        gridColumn: ' 1 / 3' 
      }
    }
  })
}
