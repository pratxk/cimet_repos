import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';

function SingleBlog() {
    const { data } = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the current page from the location state
    const currentPage = location.state?.page || 1; // Default to 1 if not present

    if (!data) {
        return <Text>Loading...</Text>;
    }

    return (
        <div className="flex flex-col items-center p-4">
            <Box
                maxW="7xl"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                shadow="md"
                h='3xl'
                bg="white"
                className="w-full"
            >
                <Stack p={6}>
                    <Heading size="lg" className="text-gray-800">
                        {data.title}
                    </Heading>
                    <Text fontSize="lg" color="gray.600" className="mt-4">
                        {data.body}
                    </Text>
                </Stack>
                <Box p={4} display="flex" justifyContent="flex-end">
                    <Button 
                        colorScheme="blue" 
                        onClick={() => navigate(`/blogs?page=${currentPage}`)}
                    >
                        Back to Blogs
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default SingleBlog;
