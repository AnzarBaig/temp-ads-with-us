// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router'

// function SearchResults({ searchResultProp }) {
//     const router = useRouter();
//     const results = searchResultProp;
//     console.log("results---->>>>", results);

//     const handleNavigate = (url) => {
//         window.location.href = `/${url}`;
//     }

//     const convertSlugToNormalString = (slug) => {
//         return slug;
//     };


//     return (
//         <div className="absolute top-full z-20 mt-3 w-full rounded-xl bg-slate-100 py-5 shadow-sm scroll-x h-96" style={{ overflowY: 'scroll' }}>
//             {/* Render category badges only if categories exist */}
//             {results.some(result => result.type === 'category') && (
//                 <div className="flex items-end ">
//                     <div className="flex flex-wrap mx-2">
//                         {results.filter(result => result.type === 'category').map((result, index) => (
//                             <span key={index} className="xs:text-xs l:text-md px-2 py-1 mb-2 mr-2 rounded bg-purple text-black border border-bg-indigo-50 ring-1 ring-headupb2b/80 cursor-pointer" onClick={() => { handleNavigate(result.slug) }}>
//                                 <Link href={result?.slug}>
//                                     {result?.category?.categoryName}
//                                 </Link>
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             )}
//             <hr className="h-px my-1 bg-gray-300 border-0" />

//             {/* Render subcategories and products */}
//             {results.filter(result => result.type === 'subCategory' || result.type === 'product').map((result, index) => (
//                 <div key={index} className="cursor-pointer">
//                     {result?.items?.map((itemObject, itemIndex) => (
//                         <div key={itemIndex} className={`p-5 flex items-start py-2 my-4 space-y-4 rounded-md hover:ring-1 hover:ring-headupb2b/80 hover:bg-headupb2b/20`}>
//                             {console.log("itemObject.slug", itemObject.slug)}

//                             <Link href={`/${itemObject.slug}`}>
//                                 <div className="flex flex-row items-center space-x-5 w-full" onClick={() => { handleNavigate(itemObject.slug) }}>
//                                     <Image
//                                         src={itemObject.type === 'product' ? itemObject.item.imageUrl[0] || itemObject.item.imageUrl : itemObject.item.imageUrl}
//                                         alt={`${itemObject.type === 'product' ? 'Product' : 'Subcategory'} Image`}
//                                         width={50}
//                                         height={50}
//                                         className="object-cover rounded-md h-11 w-30"
//                                         unoptimized={true}
//                                     />
//                                     <div className="flex flex-col w-full ms:text-md l:text-lg">
//                                         <span className='text-md font-medium text-start'>
//                                             {itemObject.type === 'product' ? itemObject.item.name : itemObject.item.categoryName}
//                                         </span>
//                                         <span className='text-xs font-normal text-headupb2b text-start'>
//                                             in {convertSlugToNormalString(itemObject.slug)}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default SearchResults;


import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function SearchResults({ searchResultProp, onResultClick }) {
    const results = searchResultProp;

    const convertSlugToNormalString = (slug) => {
        return slug;
    };

    return (
        <div className="absolute top-full z-20 mt-3 w-full rounded-xl bg-slate-100 py-5 shadow-sm scroll-x h-96" style={{ overflowY: 'scroll' }}>
            {/* Render category badges only if categories exist */}
            {results.some(result => result.type === 'category') && (
                <div className="flex items-end ">
                    <div className="flex flex-wrap mx-2">
                        {results.filter(result => result.type === 'category').map((result, index) => (
                            <Link key={index} href={`/${result.slug}`} passHref>
                                <span
                                    className="xs:text-xs l:text-md px-2 py-1 mb-2 mr-2 rounded bg-purple text-black border border-bg-indigo-50 ring-1 ring-headupb2b/80 cursor-pointer"
                                    onClick={onResultClick}
                                >
                                    {result?.category?.categoryName}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <hr className="h-px my-1 bg-gray-300 border-0" />

            {/* Render subcategories and products */}
            {results.filter(result => result.type === 'subCategory' || result.type === 'product').map((result, index) => (
                <div key={index} className="cursor-pointer">
                    {result?.items?.map((itemObject, itemIndex) => (
                        <div key={itemIndex} className={`p-5 flex items-start py-2 my-4 space-y-4 rounded-md hover:ring-1 hover:ring-headupb2b/80 hover:bg-headupb2b/20`}>
                            <Link href={`/${itemObject.slug}`} passHref onClick={onResultClick} prefetch={true}>
                                <div className="flex flex-row items-center space-x-5 w-full">
                                    <Image
                                        src={itemObject.type === 'product' ? itemObject.item.imageUrl[0] || itemObject.item.imageUrl : itemObject.item.imageUrl}
                                        alt={`${itemObject.type === 'product' ? 'Product' : 'Subcategory'} Image`}
                                        width={50}
                                        height={50}
                                        className="object-cover rounded-md h-11 w-30"
                                        unoptimized={true}
                                    />
                                    <div className="flex flex-col w-full ms:text-md l:text-lg">
                                        <span className='text-md font-medium text-start'>
                                            {itemObject.type === 'product' ? itemObject.item.name : itemObject.item.categoryName}
                                        </span>
                                        <span className='text-xs font-normal text-headupb2b text-start'>
                                            in {convertSlugToNormalString(itemObject.slug)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default SearchResults;