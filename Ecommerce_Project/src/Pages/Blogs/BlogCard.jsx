import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function BlogCard({ data }) {

    return (
        <Box
            className="m-4"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
            bg="white"
        >
            <Link to={`/blogs/${data.id}`}>
                <Stack p={4}>
                    <Heading size="md" className="text-gray-800">
                        {data.title}
                    </Heading>
                    <Text color="gray.600">
                        {data.body.substring(0, 100)}...
                    </Text>
                </Stack>
            </Link>
        </Box>
    );
}

export default BlogCard;
