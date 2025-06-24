import fetchCategoryData from '@/Contants/CategoryResponse';
import useCategoryData from '@/Utils/useCategoryData';
import React from 'react'

function LeftOutCategory() {

    const { data: CategoryData, isLoading, isError, error, isFetching } = useCategoryData(
        ["getCategoryData"],
        fetchCategoryData
    );
    return (
        <div>
            {/* <div className='mb-2'><label className='text-xl font-bold tracking-wide 4k:text-4xl'> Categories </label></div> */}
            <div className='mt-8'>
                <ul>
                    {CategoryData?.slice(9).map((ele, index) =>
                        <div >
                            <a href={`/${ele?.url}`} key={index}><label className=" font-normal text-xs leading-5 cursor-pointer relative inline-block group 4k:text-2xl">{ele?.categoryName}<span class="absolute inset-x-0 bottom-0 h-[0.2px] bg-white transform scale-x-0  group-hover:scale-x-100 transition-transform duration-300"></span></label> </a>
                        </div>
                    )}
                </ul>

            </div>
        </div>
    )
}

export default LeftOutCategory