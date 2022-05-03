import { gql } from "@apollo/client";

export const GET_ALL_DATA = gql`
  query ($page: Int, $search: String) {
    Page(page: $page, perPage: 10) {
      pageInfo {
        total
        perPage
      }
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        type
        genres
        bannerImage
        coverImage {
          extraLarge
          large
          medium
          color
        }
        tags {
          id
          name
        }
        episodes
        description
        averageScore
      }
    }
  }
`;

export const GET_DATA_BY_ID = gql`
  query ($id: Int!) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
      }
      type
      genres
      bannerImage
      coverImage {
        extraLarge
        large
        medium
        color
      }
      tags {
        id
        name
      }
      episodes
      description
      averageScore
    }
  }
`;
