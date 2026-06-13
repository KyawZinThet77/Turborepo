"use server";

import { print } from "graphql";
import {  fetchGraphQL } from "../fetchGraphQL";
import { GET_POST_COMMENTS } from "../gqlQueries";
import {CommentEntity, Post  } from "../types/modelTypes";
import { transformTakeSkip } from "../helper";
import { gql } from "graphql-tag";


export const fetchComments = async ({page, perPage,postId}: {page?: any, perPage?: any, postId:number}) => {
  const { skip, take } = transformTakeSkip({page, perPage});


  const data = await fetchGraphQL(print(GET_POST_COMMENTS),{
    postId,
    skip,
    take
  });
  return {posts : data.getPostComments as CommentEntity[], count :data.postCommentCount as number};
};

