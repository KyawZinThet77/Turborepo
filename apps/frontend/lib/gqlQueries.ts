import { gql } from "graphql-tag";

export const GET_POSTS = gql`
  query posts($skip: Float, $take: Float) {
    posts(skip: $skip, take: $take) {
      id
      title
      thumbnail
      content
      createdAt
      slug
    }
    postCount
  }
`;

export const GET_POSTS_ByID = gql`
  query getPostById($id: Int!) {
    findOne(id: $id) {
      id
      title
      thumbnail
      content
      createdAt

      author {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    CreateUser(createUserInput: $input) {
      id
    }
  }
`;

export const GET_USER_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getPostComments($postId: Int!, $take: Int, $skip: Int) {
    getPostComments(postId: $postId, take: $take, skip: $skip) {
      id
      content
      createdAt
      author {
        name
        avatar
      }
    }
    getPostCommentCount(postId: $postId)
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(createCommentInput: $input) {
      id
      content
      createdAt
      author {
        name
        avatar
      }
    }
  }
`;

export const GET_POST_LIKES = gql`
  query PostLikeData($postId: Int!) {
    isUserLiked(postId: $postId)
    likeCountperPost(postId: $postId)
  }
`;
