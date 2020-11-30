import { FormControl, Box, Center, Button, Link, Flex } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useState } from 'react';
import { InputField } from '../../components/inputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';

const ChangePassword: NextPage<{token: string}> = ({ token }) => {
    const [, changePassword] = useChangePasswordMutation();
    const router = useRouter();
    const [tokenError, setTokenError] = useState('')
    
    return (
        <Wrapper variant='small'>
        <Formik 
            initialValues={{ newPassword: '' }}
            onSubmit={async (values, { setErrors }) => {
                const response = await changePassword({ 
                    newPassword: values.newPassword, 
                    token
                });
                if (response.data?.changePassword.errors) {
                    const errorMap = toErrorMap(response.data.changePassword.errors);
                    if ('token' in errorMap) {
                        setTokenError(errorMap.token);
                    }
                    setErrors(errorMap);
                } else if (response.data?.changePassword.user) {
                    //worked
                    router.push('/');
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <FormControl>
                            <InputField 
                                name="newPassword" 
                                placeholder="new password" 
                                label="New Password" 
                                type="password"
                            />
                            {tokenError ? (
                                <Flex>
                                    <Box style={{ color: "red"}} mr={4}>{tokenError}</Box>
                                    <NextLink href="/forgot-password">
                                        <Link>forgot it again?</Link>
                                    </NextLink>
                                </Flex>
                            ) : null}
                            <Box mt={6}>
                                <Center>
                                    <Button 
                                        type="submit" 
                                        colorScheme="teal"
                                        isLoading={isSubmitting}
                                    >
                                        CHANGE PASSWORD
                                    </Button>
                                </Center>
                            </Box>
                    </FormControl>
                </Form>
            )}
        </Formik>
    </Wrapper>
    )
}

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string 
    }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);