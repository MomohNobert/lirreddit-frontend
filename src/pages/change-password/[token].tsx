import { FormControl, Box, Center, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { InputField } from '../../components/inputField';
import { Wrapper } from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';

export const ChangePassword: NextPage<{token: string}> = ({ token }) => {
    const router = useRouter();
    
    return (
        <Wrapper variant='small'>
        <Formik 
            initialValues={{ newPassword: '' }}
            onSubmit={async (values, {setErrors}) => {
                // const response = await login(values);
                // if (response.data?.login.errors) {
                //     setErrors(toErrorMap(response.data.login.errors))
                // } else if (response.data?.login.user) {
                //     //worked
                //     router.push('/');
                // }
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

export default ChangePassword;