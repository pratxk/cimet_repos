import React from 'react';
import { Box, Image, Text, Button, HStack, VStack } from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { productContext } from '../../Context/ProductContext';

function SingleProduct() {
  const { data: product } = useLoaderData();
  const { cart, addToCart, incrementQuantity, decrementQuantity, removeFromCart } = useContext(productContext);

  const cartItem = cart.find(item => item.id === product.id);

  return (
    <div className="flex justify-center p-4">
      <Box 
        maxW="xl" 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        shadow="md" 
        bg="white"
      >
        <Image 
          src={product.image} 
          alt={product.title} 
          boxSize="400px" 
          objectFit="cover" 
          className="rounded-md"
        />
        <VStack p={4} align="start">
          <Text 
            fontWeight="bold" 
            fontSize="2xl" 
            className="text-gray-800"
          >
            {product.title}
          </Text>
          <Text 
            color="gray.600" 
            fontSize="xl"
          >
            ${product.price}
          </Text>
          <Text color="gray.700">
            {product.description}
          </Text>

          {cartItem ? (
            <HStack spacing={2}>
              <Button onClick={() => decrementQuantity(product.id)} isDisabled={cartItem.quantity === 1} colorScheme="teal">-</Button>
              <Text>{cartItem.quantity}</Text>
              <Button onClick={() => incrementQuantity(product.id)} colorScheme="teal">+</Button>
              <Button onClick={() => removeFromCart(product.id)} colorScheme="red">Remove</Button>
            </HStack>
          ) : (
            <Button 
              onClick={() => addToCart(product)} 
              colorScheme="teal" 
              width="full"
            >
              Add to Cart
            </Button>
          )}
        </VStack>
      </Box>
    </div>
  );
}

export default SingleProduct;
