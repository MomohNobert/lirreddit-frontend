import { FormControl, Box, Center, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
// import router from 'next/dist/next-server/lib/router/router';
import React from 'react'
import { InputField } from '../components/inputField';
import { Wrapper } from '../components/Wrapper'
// import { toErrorMap } from '../utils/toErrorMap';
// import login from './login';


const CreatePost: React.FC<{}> = () => {
    return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{title: "", text: ""}}
                onSubmit={async (values) => {
                    console.log(values)
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

export default CreatePost