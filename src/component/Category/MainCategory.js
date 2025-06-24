import React, { use, useEffect, useState } from "react";
import HeaderTitle from "../Header/HeaderTitle";
import { getLanguage } from "@/storage/storage";
import { Language } from "@/locales/Language";
import ProductCard from "../Card/ProductCard";
import Data from "./response.json";
import CustomText from "../Text/CustomText";
import { GradientText } from "@/Contants/constant";
// import CategoryData from '@/Contants/CategoryResponse';
import fetchCategoryData from "@/Contants/CategoryResponse";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import useCategoryData from "@/Utils/useCategoryData";

export default function MainCategory({ initialDataa }) {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [width, setWidth] = useState(null);
  // const [CategoryData, setCategoryData] = useState([]);
  const isMobile = width < 768;

  // const { data: CategoryData, isLoading, isError, error, isFetching } = useQuery(
  //   ["getCategoryData"],
  //   fetchCategoryData,
  //   {
  //     // enabled: fetchData, // Query will not execute automatically
  //     staleTime: 1 * 60 * 1000,
  //     cacheTime: 3 * 60 * 1000
  //   }
  // );

  const {
    data: CategoryData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useCategoryData(["getCategoryData"], fetchCategoryData);

  useEffect(() => {
    if (width === null) {
      setWidth(window.innerWidth);
    }
  }, [width]);

  console.log("initialData---->", initialDataa);
  const renderCategories = () => {
    if (showAllCategories) {
      // return initialDataa?.map((ele, index) => (
      //   <div key={index} className=''>
      //     <ProductCard ele={ele} />
      //   </div>
      // ));
      return initialDataa
        ?.filter((ele) => ele.categoryName !== "IT Products" && ele.categoryName!=="Tools and Accessories" && ele.categoryName!=="Fitness Equipment")
        .map((ele, index) => (
          <div key={index} className="">
            <ProductCard ele={ele} />
          </div>
        ));
    } else if (!isMobile) {
      // return initialDataa?.map((ele, index) => (
      //   <div key={index} className="">
      //     <ProductCard ele={ele} />
      //   </div>
      // ));

      return initialDataa
        ?.filter((ele) => ele.categoryName !== "IT Products" && ele.categoryName!=="Tools and Accessories" && ele.categoryName!=="Fitness Equipment")
        .map((ele, index) => (
          <div key={index} className="">
            <ProductCard ele={ele} />
          </div>
        ));
    } else {
      // return initialDataa?.slice(0, 4).map((ele, index) => (
      //   <div key={index} className="">
      //     <ProductCard ele={ele} />
      //   </div>
      // ));

      return initialDataa
        ?.filter((ele) => ele.categoryName !== "IT Products" && ele.categoryName!=="Tools and Accessories" && ele.categoryName!=="Fitness Equipment")
        .map((ele, index) => (
          <div key={index} className="">
            <ProductCard ele={ele} />
          </div>
        ));
    }
  };

  const IconComponent = ({ title, className }) => {
    return (
      <div className="flex flex-col items-center">
        <span className={`my-1 ${className} text-4xl`}></span>
        <label className="text-md tracking-wider ">{title}</label>
      </div>
    );
  };

  const handleShowAllCategories = () => {
    setShowAllCategories(true);
  };

  return (
    <>
      {/* <Link href={}> */}
      <div className="text-center">
        <h3
          className={`${GradientText} inline-block text-transparent bg-clip-text text-center font-bold text-3xl 4k:text-6xl position-relative`}
        >
          Our Categories
        </h3>
      </div>
      <div className="text-center mb-14">
        <CustomText
          text={
            "We have developed a multi-faceted expertise in various categories."
          }
          className={"text-black/60 4k:text-3xl"}
        />
      </div>
      <div>
        <div className="my-4 4k:my-10">
          <div className="grid gap-3 t:gap-8 grid-cols-1 mm:grid-cols-1 ml:grid-cols-1 t:grid-cols-2 l:grid-cols-3 ll:grid-cols-4  4k:grid-cols-4">
            {renderCategories()}
          </div>
          {isMobile && !showAllCategories && (
            <div className="text-center">
              <button className="" onClick={handleShowAllCategories}>
                <label className="group cursor-pointer text-headupb2b font-medium py-2 px-4 text-md 4k:text-3xl flex items-center hover:scale-x-105  transaction-delay">
                  View All&nbsp;
                  <div>
                    <IconComponent
                      className={
                        "icon-left-arrow rotate-180 text-[18px] 4k:text-3xl"
                      }
                    />
                  </div>{" "}
                </label>
              </button>
            </div>
          )}
        </div>
        {/* </Link> */}
      </div>
    </>
  );
}
