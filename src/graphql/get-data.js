import { gql } from "@apollo/client";

export const ALL_DATA = gql`
  query {
    Link {
      id
      name
      url
    }
  }
`;

export const ADD_LINK = gql`
  mutation myMutation($name: String!, $url: String!) {
    insert_Link_one(object: { name: $name, url: $url }) {
      name
      url
    }
  }
`;
