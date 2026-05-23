"use server";

import { print } from "graphql";
import {  fetchGraphQL } from "../fetchGraphQL";
import { GET_POSTS } from "../gqlQueries";
import {Post  } from "../types/modelTypes";
import { transformTakeSkip } from "../helper";


export const fetchPosts = async ({page, perPage}: {page?: Float, perPage?: Float}) => {
  const { skip, take } = transformTakeSkip({page, perPage});
  const query = `
    query {
      posts {
        id
        title
        slug
        thumbnail
        content
        createdAt
      }
    }
  `;

  const data = await fetchGraphQL(query,{
    skip,
    take
  });

  return {posts : data.posts as Post[], totalPosts :data.postCount as number};
};