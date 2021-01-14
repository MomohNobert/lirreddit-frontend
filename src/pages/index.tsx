import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink  from 'next/link'
import React from "react";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10
    }
  });

  return (
  <Layout>
    <NextLink href="/create-post">
      <Link>
        create post
      </Link>
    </NextLink>
    {!data ? 
      <div>loading...</div> 
      : 
      (
        <Stack spacing={8}>
          {
            data.posts.map(
              post => (
                <Box p={5} shadow="md" borderWidth="1px" key={post.id}>
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.text.slice(0, 50)}...</Text>
                </Box>
              )
            )
          }
        </Stack>
      )
    }
  </Layout>
)}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
