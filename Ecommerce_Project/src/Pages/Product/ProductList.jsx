import { Box, SimpleGrid } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { productContext } from '../../Context/ProductContext';
import ProductCard from './ProductCard';
import { useLoaderData } from 'react-router-dom';

const ProductList = () => {
    const { products, setProducts } = useContext(productContext);
    const {data}  = useLoaderData();

    const handleAddToCart = (product) => {
        console.log('Added to cart:', product);
    };

    useEffect(() => {
        setProducts(data);
    }, [data]);
    return (
        <>
            <Box className='px-10'>
                <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}

export default ProductList
