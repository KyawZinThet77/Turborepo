"use server";

import { print } from "graphql";
import {  fetchGraphQL } from "../fetchGraphQL";
import { GET_POSTS } from "../gqlQueries";
import {Post  } from "../types/modelTypes";
import { transformTakeSkip } from "../helper";
import { gql } from "graphql-tag";


export const fetchPosts = async ({page, perPage}: {page?: any, perPage?: any}) => {
  const { skip, take } = transformTakeSkip({page, perPage});


  const data = await fetchGraphQL(print(GET_POSTS),{
    skip,
    take
  });
console.log("Fetched data:", data);
  return {posts : data.posts as Post[], totalPosts :data.postCount as number};
};