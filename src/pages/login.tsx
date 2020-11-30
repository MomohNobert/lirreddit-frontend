import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Center, FormControl, Link } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
 
const Login: React.FC<{}> = () => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{usernameOrEmail: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login(values);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        //worked
                        router.push('/');
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormControl>
                                <InputField 
                                    name="usernameOrEmail" 
                                    placeholder="Username or Email" 
                                    label="Username or Email" 
                                />
                                <Box mt={4}>
                                    <InputField 
                                        name="password" 
                                        placeholder="password" 
                                        label="Password" 
                                        type="password"
                                    />
                                </Box>
                                <Box mt={2}>
                                    <Center>
                                        <NextLink href="/forgot-password">
                                            <Link>forgot password?</Link>
                                        </NextLink>
                                    </Center>
                                </Box>
                                <Box mt={6}>
                                    <Center>
                                        <Button 
                                            type="submit" 
                                            colorScheme="teal"
                                            isLoading={isSubmitting}
                                        >
                                            LOGIN
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

export default withUrqlClient(createUrqlClient)(Login);