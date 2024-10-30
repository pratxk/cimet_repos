import { Box, Image, Text, Button, HStack } from '@chakra-ui/react';
import React, { useContext } from 'react'; // Adjust the import path as necessary
import { productContext } from '../../Context/ProductContext';
import { Link } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';

const ProductCard = ({ product }) => {
    const { cart, addToCart, incrementQuantity, decrementQuantity, removeFromCart } = useContext(productContext);

    // Check if the product is in the cart
    const cartItem = cart.find(item => item.id === product.id);

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            padding="4"
            shadow="md"
            bg="white"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
            className="relative group"
            mb={4}
        >
            <Link to={`/products/${product.id}`}>
                <Image
                    src={product.image}
                    alt={product.title}
                    boxSize="200px"
                    objectFit="cover"
                    className="rounded-md mb-4"
                />
            </Link>
            <Text
                fontWeight="bold"
                mt="2"
                className="text-lg text-gray-800"
            >
                {product.title}
            </Text>
            <Text
                color="gray.600"
                mb="2"
                className="text-xl"
            >
                ${product.price}
            </Text>

            {cartItem ? (
                <HStack spacing={2}>
                    <Button onClick={() => decrementQuantity(product.id)} isDisabled={cartItem.quantity === 1} colorScheme="teal">-</Button>
                    <Text>{cartItem.quantity}</Text>
                    <Button onClick={() => incrementQuantity(product.id)} colorScheme="teal">+</Button>
                    <Button onClick={() => removeFromCart(product.id)} colorScheme="red"><DeleteIcon /></Button>
                </HStack>
            ) : (
                <Button
                    onClick={() => addToCart(product)}
                    colorScheme="teal"
                >
                    Add to Cart
                </Button>
            )}
        </Box>
    );
};

export default ProductCard;
