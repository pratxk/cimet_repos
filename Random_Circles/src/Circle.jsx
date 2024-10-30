import { Box } from '@chakra-ui/react'
import React from 'react'

const Circle = ({top, left, color}) => {
  return (
    <>
    <Box h='20px' w='20px' bg={color} borderRadius='50%' position='absolute' top={`${top}px`} left={`${left}px`}>
    </Box>
    </>      
  )
}

export default Circle
