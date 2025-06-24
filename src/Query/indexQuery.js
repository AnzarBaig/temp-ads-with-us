import { gql } from "@apollo/client";

export default gql`
  query PostsByPublication($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      ...Publication
      posts(first: $first, after: $after) {
        totalDocuments
        edges {
          node {
            ...Post
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }

  fragment Publication on Publication {
    id
    title
    displayTitle
    url
    metaTags
    favicon
    isTeam
    followersCount
    descriptionSEO
    author {
      name
      username
      profilePicture
      followersCount
    }
    ogMetaData {
      image
    }
    preferences {
      logo
      darkMode {
        logo
      }
      navbarItems {
        id
        type
        label
        url
      }
    }
    links {
      twitter
      github
      linkedin
      hashnode
    }
    integrations {
      umamiWebsiteUUID
      gaTrackingID
      fbPixelID
      hotjarSiteID
      matomoURL
      matomoSiteID
      fathomSiteID
      fathomCustomDomain
      fathomCustomDomainEnabled
      plausibleAnalyticsEnabled
    }
  }

  fragment Post on Post {
    id
    title
    url
    author {
      name
      profilePicture
    }
    coverImage {
      url
    }
    publishedAt
    slug
    brief
  }

  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
  }
`;

