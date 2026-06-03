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