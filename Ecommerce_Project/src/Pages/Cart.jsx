import React, { useContext, useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, VStack, Select } from '@chakra-ui/react';
import { productContext } from '../Context/ProductContext';
import ProductCard from './Product/ProductCard';
import axios from 'axios';

const Cart = () => {
    const { cart } = useContext(productContext);
    const [currency, setCurrency] = useState('USD'); 
    const [convertedTotalPrice, setConvertedTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [conversionError, setConversionError] = useState(false); 
    const totalPriceUSD = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const fetchConversionRate = async (from, to, amount) => {
        setLoading(true);
        setConversionError(false); // Reset error state before fetching
        const url = `https://anyapi.io/api/v1/exchange/convert?apiKey=1oqvbljoi3o8morkiotg788kkoc7arr2gbaee5d09nlob1r5p3s6dv8&base=${from}&to=${to}&amount=${amount}`;

        try {
            const response = await axios.get(url);
            setConvertedTotalPrice(response.data.converted); 
        } catch (error) {
            console.error('Error fetching conversion rate:', error);
            setConvertedTotalPrice(0); 
            setConversionError(true); // Set error state on failure
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConversionRate('USD', currency, totalPriceUSD);
    }, [currency, totalPriceUSD]); 

    return (
        <Box p={6}>
            <Heading mb={6}>Shopping Cart</Heading>

            <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                mb={6}
                isDisabled={loading || conversionError} 
            >
                <option value="AUD">AUD</option>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
            </Select>
            {cart.length > 0 && (
                <VStack 
                    align="start" 
                    mt={6} 
                    borderWidth="1px" 
                    borderRadius="lg" 
                    p={4} 
                    shadow="md"
                    bg="white"
                >
                    <Heading size="md">Cart Total</Heading>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <Text fontSize="xl" fontWeight="bold">
                            Total: {currency} {convertedTotalPrice.toFixed(2)}
                        </Text>
                    )}
                </VStack>
            )}

            <SimpleGrid columns={{ base: 1, md: 2 }} mt={4} spacing={4}>
                {cart.length > 0 ? (
                    cart.map(item => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : (
                    <Text>Your cart is empty.</Text>
                )}
            </SimpleGrid>
        </Box>
    );
};

export default Cart;
