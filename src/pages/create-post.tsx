import { FormControl, Box, Center, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react'
import { InputField } from '../components/inputField';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useIsAuth } from '../utils/useIsAuth';


const CreatePost: React.FC<{}> = () => {
    const router = useRouter();
    useIsAuth();
    const [, createPost] = useCreatePostMutation();
    return (
        <Layout variant="small">
                <Formik 
                    initialValues={{title: "", text: ""}}
                    onSubmit={async (values) => {
                        const { error } = await createPost({input: values});
                        if (!error) {
                            router.push('/');
                        }
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
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient)(CreatePost)