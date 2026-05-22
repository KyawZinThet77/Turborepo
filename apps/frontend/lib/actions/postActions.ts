"use server";

import { print } from "graphql";
import {  fetchGraphQL } from "../fetchGraphQL";
import { GET_POSTS } from "../gqlQueries";
import {Post  } from "../types/modelTypes";


export const fetchPosts = async () => {
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

  const data = await fetchGraphQL(query);

  return data.posts;
};