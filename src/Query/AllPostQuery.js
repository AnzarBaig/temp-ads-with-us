export const AllPost = ` query GET_PAGINATED_POSTS {
    posts(
      after: ""
      before: ""
      first: 10
      where: { categoryNotIn: ["dGVybToxNTY3", "dGVybToyODYz"] }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        __typename
        id
        title
        categories {
            edges {
              node {
                id
                  name
              }
            }
          }
          author {
            node {
              id
              name
            }
          }
        content
        date
        slug
        uri
        status
        featuredImageId
        featuredImageDatabaseId
        featuredImage {
          node {
            id
            sourceUrl
            altText
          }
        }
      }
    }
  }`