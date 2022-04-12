import { Box, Text, Title } from "@mantine/core";
import { useRef, useState } from "react";
import { useRenderTornPage } from "../hooks";

export default function Custom404() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useRenderTornPage(canvasRef)

  return (
    <Box sx={{height: '100vh'}}>
      <Box sx={{ 
        zIndex: 10, 
        position: 'relative', 
        height: '100%',
        display: 'grid',
        placeItems: 'center'
        }}>
        <Title order={1}>
          <Text m={'xl'} sx={{fontSize: 24 }} size={'xl'}>404: Looks like this one didn&apos;t survive...</Text>
        </Title>
      </Box>
      <canvas style={{position: 'absolute', top: 0, left: 0}} ref={canvasRef}/>
    </Box>
  )
}