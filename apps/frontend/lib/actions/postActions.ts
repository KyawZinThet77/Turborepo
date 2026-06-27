"use server";

import { print } from "graphql";
import {  authFetchQl, fetchGraphQL } from "../fetchGraphQL";
import { GET_POSTS, GET_POSTS_BY_USER, GET_POSTS_ByID } from "../gqlQueries";
import {Post  } from "../types/modelTypes";
import { transformTakeSkip } from "../helper";
import { gql } from "graphql-tag";


export const fetchPosts = async ({page, perPage}: {page?: any, perPage?: any}) => {
  const { skip, take } = transformTakeSkip({page, perPage});


  const data = await fetchGraphQL(print(GET_POSTS),{
    skip,
    take
  });
  return {posts : data.posts as Post[], totalPosts :data.postCount as number};
};

export const fetchPostById= async (id: number) => {
  const data = await fetchGraphQL(print(GET_POSTS_ByID),{id});
  return data.findOne as Post;
}

export const fetchPostsByUser = async ({page, perPage, userId}: {page?: any, perPage?: any, userId: number}) => {
  const { skip, take } = transformTakeSkip({page, perPage});


  const data = await authFetchQl(print(GET_POSTS_BY_USER),{
    skip,
    take,
  });
  return {posts : data.getPostsByUser as Post[], totalPosts :data.userPostCount as number};
};