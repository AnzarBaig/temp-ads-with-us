import ProductDetailCard from "@/component/Product/ProductDetailCard";
import { useRouter } from "next/router";
import BreadCrumComp from "@/component/BreadCrumComp";
import Blog from "../../../blog";
import WhatAreYouLookingFor from "@/component/CTA/WhatAreYouLookingFor";
import request from "graphql-request";
import { SearchPostsOfPublicationDocument } from "@/generated/graphql";
import { NextSeo } from "next-seo";
import Head from "next/head";
import FAQs from "@/component/FAQ/FAQs";
import { ProductDescriptionTable } from "@/component/ProductDescriptionTable/ProductDescriptionTable";

const endpoint = "https://gql.hashnode.com";

function ProductDetailPage({ productData, dataOfFilterPost, canonicalUrl }) {
  const router = useRouter();

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productData.name,
    image: productData.images?.[0] || "",
    description: productData.description,
    brand: {
      "@type": "Brand",
      name:
        productData.specifications
          ?.find((spec) => spec.key === "Brands")
          ?.value?.join(", ") || "",
    },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: productData?.faqs?.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: `<p>${faq.answer}</p>`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {productData?.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      )}
      {/* 
      <NextSeo
        title={`${productData?.name}`}
        description={`${productData?.description?.slice(0, 160)}`}
        canonical={canonicalUrl}
/>
{/* Uncomment the NextSeo component if needed */}
      {console.log("productData?.metaName", productData?.metaName)}
      {console.log("productData?.metaDescription", productData?.metaDescription)}
      {console.log("productData--->", productData)}
      {console.log("productData.subcategoryslug--->", productData.subCategory.slug)}
      {console.log("productData.categoryslug--->", productData.category.slug)}

      <div className="px-4 md:px-32 pt-2">
        <div className="ms:mt-8 l:mt-4">
          <BreadCrumComp crums={router.query} />
        </div>

        <ProductDetailCard product={productData} />

        {/* <div className="pt-8">
          <h3
            className={`bg-black text-transparent bg-clip-text font-bold text-3xl 4k:text-6xl pb-4`}
          >
            Description
          </h3>
          <div
            className="ll:text-lg ms:text-md font-normal  rich-text-content"
            dangerouslySetInnerHTML={{ __html: productData?.description }}
          />
        </div> */}

        <div className="pt-8">
          <h3 className="bg-black  text-transparent bg-clip-text font-bold text-3xl 4k:text-6xl pb-4">
            Description
          </h3>
          <div
            className="prose w-full max-w-none ll:text-lg ms:text-md text-black font-normal rich-text-content"
            dangerouslySetInnerHTML={{ __html: productData?.description }}
          />
        </div>

        <div className="pt-8">
          <h3
            className={`bg-black text-transparent bg-clip-text font-bold text-3xl 4k:text-6xl pb-4`}
          >
            Product Information
          </h3>
          {/* <p className="ll:text-lg ms:text-md font-normal md:px-16">{productData?.description}</p> */}
          {/* <div
            className="ll:text-lg ms:text-md font-normal md:px-16 rich-text-content"
            dangerouslySetInnerHTML={{ __html: productData?.specifications }}
          /> */}

          <ProductDescriptionTable productData={productData} />
        </div>

        <div className="pt-20 4k:pt-40">
          <WhatAreYouLookingFor />
        </div>

        {/*  FAQs Section */}
        <div className="ms:py-10 t:py-14">
          {/* {console.log("productData?.faqs", productData?.faqs)} */}
          {productData?.faqs.length > 0 && <FAQs FAQData={productData?.faqs} />}
          {/* {console.log("todaytest", productData?.faq)} */}
        </div>

        {/*  Related Blog Posts */}
        <div className="ms:mt-10 t:mt-10">
          <Blog from="page" blogData={dataOfFilterPost} />
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;

export async function getStaticProps({ params }) {
  const { category, subcategory, product } = params;

  let dataOfFilterPost = null;
  try {
    const data = await request(endpoint, SearchPostsOfPublicationDocument, {
      first: 5,
      filter: { query: category, publicationId: "6641bd538c27052a2f463366" },
    });
    dataOfFilterPost = data.searchPostsOfPublication;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const productData = await fetch(
    `https://api.headsupb2b.com/api/getProductBySlug/${product}`
  ).then((res) => res.json());

  if (
    !productData ||
    productData?.category?.slug !== category ||
    productData?.subCategory?.slug !== subcategory
  ) {
    return { notFound: true };
  }

  return {
    props: {
      dataOfFilterPost,
      productData,
      canonicalUrl: `https://www.headsupb2b.com/${category}/${subcategory}/${product}`,
    },
    revalidate: 3600, //86400, // Rebuild page every day
  };
}

export async function getStaticPaths() {
  try {
    // Fetch all products
    const res = await fetch("https://api.headsupb2b.com/api/getAllProducts");
    const products = await res.json();

    console.log("Fetched products:", products); // Debugging API response

    // Filter out products with missing data
    const validProducts = products.filter(
      (prod) => prod.categorySlug && prod.subcategorySlug && prod.slug
    );

    const paths = validProducts.map((prod) => ({
      params: {
        category: String(prod.categorySlug), // Ensure it's a string
        subcategory: String(prod.subcategorySlug), // Ensure it's a string
        product: String(prod.slug), // Ensure it's a string
      },
    }));

    return {
      paths,
      fallback: "blocking", // Generates pages on demand if not pre-built
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { paths: [], fallback: "blocking" }; // Return empty paths if API fails
  }
}
