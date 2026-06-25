"use server";

import { print } from "graphql";
import { authFetchQl, fetchGraphQL } from "../fetchGraphQL";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { CommentEntity, Post } from "../types/modelTypes";
import { transformTakeSkip } from "../helper";
import { gql } from "graphql-tag";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/CommentFormSchema";

export const fetchComments = async ({
  page,
  perPage,
  postId,
}: {
  page?: any;
  perPage?: any;
  postId: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, perPage });
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    skip,
    take,
  });
  return data;
};

export const createComments = async (
  state: CreateCommentFormState | undefined,
  formData: FormData,
): Promise<CreateCommentFormState> => {

  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const data = await authFetchQl(print(CREATE_COMMENT_MUTATION), {
    input: { ...validatedFields.data },
  });

  if (data?.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: data.errors,
    };
  }
  return {
    ok: true,
    message: "Comment created successfully",
  };
};
