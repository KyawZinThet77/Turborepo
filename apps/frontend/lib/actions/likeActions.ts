"use server";

import { print } from "graphql";
import { authFetchQl, fetchGraphQL } from "../fetchGraphQL";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { CommentEntity, Post } from "../types/modelTypes";
import { transformTakeSkip } from "../helper";
import { gql } from "graphql-tag";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/CommentFormSchema";





export const GetPostLikeData = async (
) => {

  const data = await authFetchQl(print(GET_POST_LIKES), {
    input: {  },
  });

  if (data?.errors) {
    return {
   
    };
  }
  return {
    ok: true,
    message: "Comment created successfully",
  };
};
