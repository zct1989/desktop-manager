import { gql } from 'graphql-request';

const userFragment = gql`
  fragment user on User {
    id
    username
    nickname
  }
`;

export const getUserList = gql`
  query Users {
    users {
      ...user
    }
  }
  ${userFragment}
`;

export const getRootUser = gql`
  query Root {
    root {
      ...user
    }
  }
  ${userFragment}
`;

export const createRootUser = gql`
  mutation creater($password: String!) {
    createRootUser(password: $password) {
      ...user
    }
  }

  ${userFragment}
`;
