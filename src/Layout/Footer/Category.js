import fetchCategoryData from "@/Contants/CategoryResponse";
import useCategoryData from "@/Utils/useCategoryData";
import { useQuery } from "@tanstack/react-query";

export default function Category() {
  // const { data: CategoryData, isLoading, isError, error, isFetching } = useQuery(
  //     ["getCategoryData"],
  //     fetchCategoryData,
  //     {
  //         // enabled: fetchData, // Query will not execute automatically
  //         staleTime: 1 * 60 * 1000,
  //         cacheTime: 3 * 60 * 1000
  //     }
  // );

  const {
    data: CategoryData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useCategoryData(["getCategoryData"], fetchCategoryData);

  return (
<div className="overflow-hidden relative py-4">
      <div className="mb-2">
        <label className="text-xl font-bold tracking-wide 4k:text-4xl">
          Categories
        </label>
      </div>

      <div className="category-container whitespace-nowrap hover:animate-marquee-paused">
        <div className="flex gap-3 animate-marquee">
          {CategoryData?.map((ele, index) => (
            <div key={index} className="inline-block">
              <a href={`/${ele?.url}`}>
                <label className="font-normal text-[15px] leading-5 cursor-pointer relative inline-block group 4k:text-2xl">
                  {ele?.categoryName}
                  {index !== CategoryData.length - 1 }
                  <span className="absolute inset-x-0 bottom-0 h-[0.2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  <span className="ml-3">
                    |
                  </span>
                </label>
              </a>
            </div>
          ))}
          {/* Duplicate elements for smooth infinite scrolling */}
          {CategoryData?.map((ele, index) => (
            <div key={`duplicate-${index}`} className="inline-block">
              <a href={`/${ele?.url}`}>
                <label className="font-normal text-[15px] leading-5 cursor-pointer relative inline-block group 4k:text-2xl">
                  {ele?.categoryName}
                  {index !== CategoryData.length - 1 }
                  <span className="absolute inset-x-0 bottom-0 h-[0.2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  <span>
                    |
                  </span>
                </label>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
          min-width: 200%;
        }

        .hover\\:animate-marquee-paused:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
