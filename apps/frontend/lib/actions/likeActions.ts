"use server";

import { print } from "graphql";
import { authFetchQl, fetchGraphQL } from "../fetchGraphQL";
import {
  
  LIKE_POST_MUTATION,
  GET_POST_LIKES,
  UNLIKE_POST_MUTATION,
} from "../gqlQueries";
import { CommentEntity, Post } from "../types/modelTypes";
import { transformTakeSkip } from "../helper";
import { gql } from "graphql-tag";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/CommentFormSchema";

export const GetPostLikeData = async (postId: number) => {
  const data = await authFetchQl(print(GET_POST_LIKES), {
    postId,
  });

  console.log("data like file ",data);

return {
  likecount: data?.likeCountperPost as number,  
  isLiked: data?.isUserLiked as boolean,
};
};

export const likePost = async (postId: number) => {
  const data = await authFetchQl(print(LIKE_POST_MUTATION), {
    postId,
  });
  return data;
};
export const unlikePost = async (postId: number) => {
  const data = await authFetchQl(print(UNLIKE_POST_MUTATION), {
    postId,
  });
  return data;
};
