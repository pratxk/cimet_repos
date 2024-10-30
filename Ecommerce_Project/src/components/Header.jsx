import React, { useContext } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { productContext } from '../Context/ProductContext';

function Header() {
    const { cart } = useContext(productContext);
    return (
        <Box as="nav" className="bg-gray-800 text-white p-4">
            <Flex justify="space-between" align="center" className="max-w-7xl mx-auto">
                <Heading size="lg" className="tracking-tight">
                    <Link to="/" className="text-white hover:text-gray-300">
                    Ecommerce</Link>
                </Heading>
                <Flex className="space-x-8">
                    <Link to='/products' className='hover:underline'>
                        <Text>Products</Text>
                    </Link>
                    <Link to='/cart' className='hover:underline'>
                        <Text>Cart({cart.length})</Text>
                    </Link>
                    <Link to='/contact' className='hover:underline'>
                        <Text>Contact</Text>
                    </Link>
                    <Link to='/blogs' className='hover:underline'>
                        <Text>Blogs</Text>
                    </Link>
                    <Link to='/about' className='hover:underline'>
                        <Text>About</Text>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Header;