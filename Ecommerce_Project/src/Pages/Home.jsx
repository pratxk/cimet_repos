import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import { Box } from '@chakra-ui/react'
import Slider from '../components/Slider'
import { CarouselData } from '../components/CarouselData'

const Home = () => {
    return (
        <>
        <Box>
            <Box as='section' id='Slider-Section' >
                <Slider i={CarouselData}/>
            </Box>
        <FeaturedProducts/>
        </Box>
        </>
    )
}

export default Home
