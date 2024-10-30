import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { useCallback, useContext, useEffect } from 'react'
import { productContext } from '../Context/ProductContext'
import { useLoaderData } from 'react-router-dom';
import ProductCard from './Product/ProductCard';

function FeaturedProducts() {
    const {products, setProducts} = useContext(productContext);
    const {data} = useLoaderData();


    const handleAddToCart = (product) => {
        
        console.log('Added to cart:', product);
    };
      
      useEffect(() => {
        setProducts(data);
      }, [data]);
  return (
   <>
   <Box as='section' >
    <Box as='h2' fontSize='2xl' fontWeight='bold' mb='4'>Featured Products</Box>
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
        </SimpleGrid>
   </Box>
   </>
  )
}

export default FeaturedProducts
