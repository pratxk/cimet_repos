import { Box, Button,  HStack, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import Circle from './Circle';

const App = () => {

  const randomColor = ['red', 'blue', 'green', 'yellow', 'pink', 'black'];
  const [circles, setCircles] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  const handleClick = (e) => {
    // Check if the click is on the button container or buttons
    if (e.target.closest('#button-container')) return;

    const randomColorIndex = Math.floor(Math.random() * randomColor.length);
    let topVal = e.clientY;
    let leftVal = e.clientX;
    const circle = {
      color: randomColor[randomColorIndex],
      topVal,
      leftVal,
    };
    setCircles([...circles, circle]);
    setHistory([...history, circle]); 
    setRedoHistory([]); // Clear redo history on new circle
  };


  const handleUndo = () => {
    if (history.length > 0) {
      const lastCircle = history[history.length - 1];
      setCircles(circles.filter(circle => circle !== lastCircle));
      setHistory(history.slice(0, -1));
      setRedoHistory([...redoHistory, lastCircle]);
    }
  };

  const handleRedo = () => {
    if (redoHistory.length > 0) {
      const lastCircle = redoHistory[redoHistory.length - 1];
      setCircles([...circles, lastCircle]);
      setHistory([...history, lastCircle]);
      setRedoHistory(redoHistory.slice(0, -1));
    }
  };  

  const handleReset = () => {
    setCircles([]);
    setHistory([]);
    setRedoHistory([]);
  };

  return (
    <>
    <Box position="relative" h="100vh" w="100vw" onClick={handleClick}>
      <Box position="absolute" top={0} left={0} right={0} zIndex={2} id="button-container">
        <HStack mt={4} ml={4} spacing={4}>
          <Button onClick={handleReset} isDisabled={history.length === 0}>Reset</Button>
          <Button onClick={handleUndo} isDisabled={history.length === 0}>Undo</Button>
          <Button onClick={handleRedo} isDisabled={redoHistory.length === 0}>Redo</Button>
        </HStack>
      </Box>
      {circles.map((circle, index) => (
        <Circle key={index} top={circle.topVal} left={circle.leftVal} color={circle.color} />
      ))}
    </Box>
    </>
  )
}

export default App
