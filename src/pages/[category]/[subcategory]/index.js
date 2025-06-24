import { useRouter } from 'next/router'
import SubCategory from '@/component/Category/SubCategory/SubCategory';
import WhatAreYouLookingFor from '@/component/CTA/WhatAreYouLookingFor';
import ProductCard from '@/component/Product/ProductCard';
import { GradientText } from '@/Contants/constant';
import BreadCrumComp from '@/component/BreadCrumComp';
import SEOSubCategory from '@/Contants/SEO/SEOSubcategory'
import { NextSeo } from 'next-seo';
import Head from 'next/head';

function SubCategoryPage({ subCategoryData, seoContent, canonicalUrl }) {
    const router = useRouter()
    const { subcategory } = router.query
    const imageURL = subCategoryData?.subCategoryImage;
    console.log("this is canonicalUrl ", canonicalUrl)

    console.log("subCategoryData", subCategoryData);


    return (
        <div className='ms:mt-12 t:mt-0'>
            {/* {console.log("subCategoryData?.metaName--->", subCategoryData?.name)}
            {console.log("subCategoryData?.metaName--->", subCategoryData)}
            {console.log("subCategoryData?.categoryname--->", subCategoryData.category.slug)} */}
            <NextSeo
                title={subCategoryData?.metaName ? subCategoryData.metaName : subCategoryData?.name}
                description={
                    subCategoryData?.metaDescription
                        ? subCategoryData.metaDescription
                        : subCategoryData?.description?.slice(0, 160)
                }
                canonical={canonicalUrl}

            />

            {console.log("subCategoryData--->", subCategoryData.products.length)}
            <div className='ml:h-[400px] ll:h-[400px] overylay-image flex items-center' style={{ backgroundImage: `url('${imageURL}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'multiply', opacity: 0.95 }}>
                <div className='text-center ms:p-4 ml:p-1 ms:px-2 t:px-8 l:px-48'>
                    <h1 className='text-white text-4xl ms:font-bold ms:text-4xl l:font-bold py-4'>{subCategoryData?.name}</h1>
                    <label className='text-white ll:text-xl ms:text-md font-normal'>{subCategoryData?.description}</label>
                </div>
            </div>
            <div className='ms:mx-6 t:mx-20 l:mx-20 ll:mx-28 imac:px-44 4k:px-56'>
                <div className='ms:mt-10 t:mt-20'>
                    {subCategoryData?.products?.length ? (
                        <div className='text-center'>
                            <h3 className={`${GradientText} inline-block text-transparent bg-clip-text font-bold text-3xl`}>Products</h3>
                        </div>
                    ) : null}
                    <div className='my-8 grid gap-3 t:gap-5 grid-cols-1 ms:grid-cols-1 ml:grid-cols-1 t:grid-cols-2 l:grid-cols-3 ll:grid-cols-4'>
                        {subCategoryData?.products?.map((ele, index) => (
                            <div key={index} className=''>
                                <ProductCard data={ele} subCategoryData={subCategoryData} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='ms:mt-10 t:mt-20'><WhatAreYouLookingFor /></div>
            </div>
        </div>
    )
}

export default SubCategoryPage

export async function getStaticProps({ params }) {
    const { subcategory, category } = params;

    // Find SEO content for the subcategory

    const seoContent = SEOSubCategory?.doc?.find(obj => obj?.url === subcategory) || null;

    // Fetch subcategory data
    const subCategoryData = await fetch(
        `https://api.headsupb2b.com/api/getSubCategoryBySlug/${subcategory}`
    ).then(res => res.json());

    // If no subcategory data found, return 404
    if (!subCategoryData || subCategoryData?.category?.slug !== category) {
        return { notFound: true };
    }

    console.log("subCategoryData--->", subCategoryData);


    const canonicalUrl = `https://www.headsupb2b.com/${category}/${subcategory}`;

    return {
        props: {
            subCategoryData,
            seoContent,
            canonicalUrl
        },
        revalidate: 3600//86400, // Regenerates the page every day 
    };
}
export async function getStaticPaths() {
    try {
        // Fetch all subcategories
        const res = await fetch("https://api.headsupb2b.com/api/getAllSubCategories");
        const subCategories = await res.json();

        console.log("Fetched subcategories:", subCategories); // Debugging

        // Ensure each subcategory has a valid categorySlug
        const validSubCategories = subCategories.filter(sub => sub.categorySlug && sub.slug);

        const paths = validSubCategories.map(sub => ({
            params: {
                category: String(sub.categorySlug), // Ensure it's a string
                subcategory: String(sub.slug), // Ensure it's a string
            },
        }));

        return {
            paths,
            fallback: "blocking", // Generates pages on demand if not pre-built
        };
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        return { paths: [], fallback: "blocking" }; // Return empty paths if error occurs
    }
}

