import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Center, FormControl } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField';
import { useMutation } from 'urql';

interface registerProps {

}
 
const REGISTER_MUT = `
    mutation Register($username: String!, $password: String!) {
        register(options: {username: $username, password: $password}) {
            errors {
                field
                message
            }
            user {
                id
                username
            }
        }
    }
`;

const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useMutation(REGISTER_MUT);
    return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{username: "", password: ""}}
                onSubmit={(values) => {
                    register(values);
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
                            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default Register;