import { Box, Button, Center, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = () => {
    const [{ data, fetching }] = useMeQuery();
    let body = null;

    // data is loading
    if (fetching) {

    // user not logged in
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link color='white' mr={4}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color='white'>register</Link>
                </NextLink>
            </>
        )
    // user is logged in
    } else {
        body = (
            <Flex>
                <Center>
                    <Box mr={4}>{data.me.username}</Box>
                    <Button variant="link" color='white'>logout</Button>
                </Center>
            </Flex>
        )
    }

    return (
        <Flex bg='tan' p={4}>
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    );
}