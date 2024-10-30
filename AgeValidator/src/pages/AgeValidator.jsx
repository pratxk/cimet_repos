import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, StackDivider, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

function AgeValidator() {
    const [popOver, setPopover] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [ageValid, setAgeValid] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setDateOfBirth(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dateOfBirthArray = dateOfBirth.split('-');
        const birthYear = parseInt(dateOfBirthArray[0], 10);
        const birthMonth = parseInt(dateOfBirthArray[1], 10);
        const birthDay = parseInt(dateOfBirthArray[2], 10);

        const today = new Date();
        let ageInYears = today.getFullYear() - birthYear;

        if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
            ageInYears--;
        }

        if (ageInYears >= 18) {
            setAgeValid(true);
            setFormSubmitted(true)
        } else {
            setAgeValid(false);
            setFormSubmitted(true)
        }
    }

    if(formSubmitted) {
        return (
            <>
                <Card mt={5} shadow='xl' borderColor='gray.600' borderTop='4px solid orange' textAlign='left'>
                    <CardHeader>
                        <Heading size='lg'>{ageValid ? 'You are 18 or older, which means you are eligible to use our service' : "You're under 18, which means you're not eligible"}</Heading>
                    </CardHeader>
                    <CardFooter>
                        <Text onClick={()=>{
                            setFormSubmitted(false);
                            setDateOfBirth('')
                        }} _hover={{
                            color: 'orange',
                            textDecor:'underline'
                        }}>Go back</Text>
                    </CardFooter>
                </Card>
            </>
        )
    }

    return (
        <>
            <Card mt={5} shadow='xl' borderColor='gray.600' borderTop='4px solid orange' textAlign='left'>
                <CardHeader>
                    <Heading size='lg'>Find out, if You're eligible to use our service! </Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='md'>
                                What is your date of birth?
                            </Heading>
                            <form onSubmit={handleSubmit}>
                                <Input mt={2} type='date' value={dateOfBirth} onChange={handleChange} required/>
                                <Button type='submit' mt={2} colorScheme='teal'>Check</Button>
                            </form>
                        </Box>
                        <Box>
                            <Heading _hover={{
                                textDecor: 'underline',
                                color: 'orange',
                                cursor: 'pointer'
                            }} size='sm' onClick={() => setPopover((prev) => !prev)}> Why do we need to know this?</Heading>
                            <Box display={popOver ? 'block' : 'none'} mt={4} p={5} border='1px solid orange' >
                                <Text>Your date of birth determines, if you can use our platform. You must be 18 years old to use our service</Text>
                            </Box>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}

export default AgeValidator