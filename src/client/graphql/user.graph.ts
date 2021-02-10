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
