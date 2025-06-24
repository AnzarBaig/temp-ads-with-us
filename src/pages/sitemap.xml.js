import request from 'graphql-request';
import {
  SitemapDocument,
} from '../generated/graphql';

const GQL_ENDPOINT = "https://gql.hashnode.com";
const MAX_POSTS = 1000;
const Sitemap = () => null;

export async function getStaticPropsData() {
  const BlogData = await request(
    GQL_ENDPOINT,
    SitemapDocument,
    {
      host: "headsupb2b.hashnode.dev",
      postsCount: MAX_POSTS,
      staticPagesCount: 50,
    },
  );

  return {
    props: {
      BlogData,
    },
    revalidate: 60,
  };
}
const getCategorySubCatProSlug = async () => {
  const allSlugs = [];

  const categoryEndpoint = 'https://api.headsupb2b.com/api/getAllByCategory';
  const subCategoryEndpoint = 'https://api.headsupb2b.com/api/getAllSubCategories';
  const productEndpoint = 'https://api.headsupb2b.com/api/getAllProducts';

  try {
    const [categoryRes, subCategoryRes, productRes] = await Promise.all([
      fetch(categoryEndpoint),
      fetch(subCategoryEndpoint),
      fetch(productEndpoint)
    ]);

    const categoryData = await categoryRes.json();
    const subCategoryData = await subCategoryRes.json();
    const productData = await productRes.json();

    // Only add categories with valid slugs
    categoryData.forEach((category) => {
      if (category.slug) {
        allSlugs.push(category.slug);
      }
    });

    // Only add subcategories with valid slugs and valid parent category slugs
    subCategoryData.forEach((subCategory) => {
      if (subCategory.slug && subCategory.category && subCategory.category.slug) {
        const completeSlug = `${subCategory.category.slug}/${subCategory.slug}`;
        allSlugs.push(completeSlug);
      }
    });

    // Only add products with valid slugs and valid parent category/subcategory slugs
    productData.forEach((product) => {
      if (
        product.slug &&
        product.category &&
        product.category.slug &&
        product.subCategory &&
        product.subCategory.slug
      ) {
        const completeSlug = `${product.category.slug}/${product.subCategory.slug}/${product.slug}`;
        allSlugs.push(completeSlug);
      }
    });

    return allSlugs;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export const getServerSideProps = async ({ res }) => {
  Sitemap();
  const BlogData = await getStaticPropsData();
  const allCategories = await getCategorySubCatProSlug();
  const blogUrls = BlogData?.props?.BlogData?.publication?.posts?.edges
    .map((edge) => {
      const url = edge.node.url;
      const addWWW = (url) => {
        return url.replace('https://headsupb2b.com', 'https://www.headsupb2b.com');
      };
      const newUrl = addWWW(url);
      return `
        <url>
          <loc>${newUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.80</priority>
        </url>
      `;
    })
    .join("");

  const categories = allCategories?.map((category) => {
    // const url = category.slug;
    return `
      <url>
        <loc>https://www.headsupb2b.com/${category}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
    `;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.headsupb2b.com/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://www.headsupb2b.com/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://www.headsupb2b.com/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://www.headsupb2b.com/contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://www.headsupb2b.com/careers</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
    }
      ${categories}
      ${blogUrls}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
