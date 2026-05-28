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
    post(id: $id) {
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