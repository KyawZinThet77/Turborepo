"use server";

import { print } from "graphql";
import {  authFetchQl, fetchGraphQL } from "../fetchGraphQL";
import { CREATE_POST_MUTATION, GET_POSTS, GET_POSTS_BY_USER, GET_POSTS_ByID } from "../gqlQueries";
import {Post  } from "../types/modelTypes";
import { transformTakeSkip } from "../helper";
import { gql } from "graphql-tag";
import { PostCreateFormState } from "../types/formState";
import { PostCreateSchema } from "../zodSchemas/PostCreateFormSchema";
import { uploadThumbnail } from "../upload";


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

export const fetchPostsByUser = async ({page, perPage}: {page?: any, perPage?: any}) => {
  const { skip, take } = transformTakeSkip({page, perPage});


  const data = await authFetchQl(print(GET_POSTS_BY_USER),{
    skip,
    take,
  });
  return {posts : data.getPostsByUser as Post[], totalPosts :data.userPostCount as number};
};

export const PostCreateAction = async (
  state: PostCreateFormState | undefined,
  formData: FormData,
): Promise<PostCreateFormState> => {
  const validatedFields = PostCreateSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let thumbnailUrl = '';
  if(validatedFields.data.thumbnail) {
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);
  }

  const data = await authFetchQl(print(CREATE_POST_MUTATION), {
    input: { ...validatedFields.data, thumbnail: thumbnailUrl },
  });

  if (data?.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: data.errors,
    };
  }

  return {message: "Post created successfully", ok: true};

};
