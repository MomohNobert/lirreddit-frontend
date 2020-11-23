import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Center, FormControl } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {

}
 
const Register: React.FC<registerProps> = () => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{username: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register(values);
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        //worked
                        router.push('/');
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormControl>
                                <InputField 
                                    name="username" 
                                    placeholder="username" 
                                    label="Username" 
                                />
                                <Box mt={4}>
                                    <InputField 
                                        name="password" 
                                        placeholder="password" 
                                        label="Password" 
                                        type="password"
                                    />
                                </Box>
                                <Box mt={6}>
                                    <Center>
                                        <Button 
                                            type="submit" 
                                            colorScheme="teal"
                                            isLoading={isSubmitting}
                                        >
                                            REGISTER
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

export default withUrqlClient(createUrqlClient)(Register);