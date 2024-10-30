import React, { useContext, useEffect, useState } from 'react';
import { blogContext } from '../../Context/BlogContext';
import { useLoaderData, useSearchParams, useLocation } from 'react-router-dom';
import { Box, SimpleGrid, Text, Button, HStack } from '@chakra-ui/react';
import BlogCard from './BlogCard';

const LIMIT = 10;

const Blogs = () => {
  const { blogs, setBlogs } = useContext(blogContext);
  const { data } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // Initialize currentPage from search params or location state
  const [currentPage, setCurrentPage] = useState(() => {
    const pageFromParams = searchParams.get('page');
    const pageFromState = location.state?.page; // Get page from location state
    return pageFromState ? Number(pageFromState) : (pageFromParams ? Number(pageFromParams) : 1);
  });

  useEffect(() => {
    setBlogs(data);
  }, [data]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  const totalPages = Math.ceil(blogs.length / LIMIT);
  const startIndex = (currentPage - 1) * LIMIT;
  const currentBlogs = blogs.slice(startIndex, startIndex + LIMIT);

  return (
    <Box>
      <Text className='text-3xl font-bold text-center mt-10'>Blogs</Text>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} p={4}>
        {currentBlogs.map((blog) => (
          <BlogCard data={blog} currentPage={currentPage} key={blog.id} />
        ))}
      </SimpleGrid>

      <HStack spacing={4} justify="center" mt={4}>
        <Button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default Blogs;
