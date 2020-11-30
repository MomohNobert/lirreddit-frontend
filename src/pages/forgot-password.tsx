import { FormControl, Box, Center, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/inputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

export const ForgotPassword: React.FC<{}> = () => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{email: ""}}
                onSubmit={async (values) => {
                    await forgotPassword(values);
                    setComplete(true);
                }}
            >
                {({ isSubmitting }) => complete ? <Box>If an account with that email exists, we've sent you an email</Box> : 
                (
                    <Form>
                        <FormControl>
                                <InputField 
                                    name="email" 
                                    placeholder="Email" 
                                    label="Email" 
                                />
                                <Box mt={6}>
                                    <Center>
                                        <Button 
                                            type="submit" 
                                            colorScheme="teal"
                                            isLoading={isSubmitting}
                                        >
                                            SEND LINK
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

export default withUrqlClient(createUrqlClient)(ForgotPassword);