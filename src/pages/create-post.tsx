import { FormControl, Box, Center, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
// import router from 'next/dist/next-server/lib/router/router';
import React from 'react'
import { InputField } from '../components/inputField';
import { Wrapper } from '../components/Wrapper'
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
// import { toErrorMap } from '../utils/toErrorMap';
// import login from './login';


const CreatePost: React.FC<{}> = () => {
    const [, createPost] = useCreatePostMutation();
    return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{title: "", text: ""}}
                onSubmit={async (values) => {
                    console.log(values)
                    createPost({input: values})
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormControl>
                                <InputField 
                                    name="title" 
                                    placeholder="title" 
                                    label="Title" 
                                />
                                <Box mt={4}>
                                    <InputField 
                                        name="text"
                                        textarea 
                                        placeholder="text..." 
                                        label="Body" 
                                    />
                                </Box>
                                <Box mt={6}>
                                    <Center>
                                        <Button 
                                            type="submit" 
                                            colorScheme="teal"
                                            isLoading={isSubmitting}
                                        >
                                            CREATE POST
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

export default withUrqlClient(createUrqlClient)(CreatePost)