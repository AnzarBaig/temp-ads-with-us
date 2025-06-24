import { Gradient } from "@/Contants/constant";
import ContactForm from "@/component/Form/Contact/Form";
import Icon from "@/component/Icon/Icon";
import CustomText from "@/component/Text/CustomText";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Ripples from "react-ripples";
import Buy from "@/assets/images/svg/buy.svg";
import Sell from "@/assets/images/svg/sell.svg";
import dynamic from "next/dynamic";
import Modal from "@/component/Modal/Modal";
import SellForm from "@/component/Form/Sell/SellForm";
import BuyForm from "@/component/Form/Buy/BuyForm";
import { sendEmailToBuy, sendEmailToSell } from "@/Contants/APIEndpoint";
import CommonForm from "@/component/Form/CommonForm";
import EmailAnimation from "@/Contants/Lottie/EmailAnimation.json";
import { motion, useScroll } from "framer-motion";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import AnimatedCharacters from "@/component/Animation/AnimatedText";
import { NextSeo } from "next-seo";
// import CategoryResponse from '@/Contants/CategoryResponse'
import fetchCategoryData from "@/Contants/CategoryResponse";

import { useQuery } from "@tanstack/react-query";
import useCategoryData from "@/Utils/useCategoryData";
import CommonFormForHome from "@/component/Form/CommonFormForHome";

export default function index() {
  const [show, setShow] = useState("");
  const [type, setType] = useState(null);
  const [showAnimationBuy, setShowAnimationBuy] = useState(false);
  const [showAnimationSell, setShowAnimationSell] = useState(false);
  const [replay, setReplay] = useState(true);

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

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  const handleLottieComplete = () => {
    setShowAnimationBuy(false);
    setShowAnimationSell(false);
  };

  const urles = CategoryData?.map((item) => {
    let data = [];
    data.push(item.url);
    return data;
  });

  const dynamicCanonicalUrl = `https://www.headsupb2b.com/contact`;

  return (
    <div className="ms:px-6 ms:py-20 t:pt-16 t:mx-14 imac:mx-56 t:pb-8 l:pb-10 ">
      <NextSeo
        title="Careers: Join Our Team and Grow with Us"
        description="Discover exciting opportunities to advance your career and make a difference with us."
        canonical={dynamicCanonicalUrl}
      />
      <div className="bg-headupb2b rounded-lg">
        <ContactForm />
      </div>
      <div className="t:py-12">
        <div className="grid ms:grid-cols-1 t:grid-cols-2 l:grid-cols-6 ms:gap-4 t:gap-10">
          <div className="t:hidden l:block l:col-span-1"></div>
          <div className="ms:p-0 l:p-2 l:col-span-2 bg-purple text-center rounded-lg shadow-xl">
            <div className="my-3 flex justify-center">
              <span className="bg-white py-6 px-7 rounded-full">
                <Image src={Buy} className="" width={70} />
              </span>
            </div>
            <div className="my-3">
              <CustomText
                text={"Want to Sell?"}
                className={"text-headupb2b ms:text-[24px] text-5xl font-bold"}
              />
            </div>
            <div className="my-3">
              <Ripples
                className={`${Gradient} rounded-md hover:scale-105 delay`}
              >
                {" "}
                <label
                  className="text-white py-2 px-4 text-xl"
                  onClick={() => {
                    setShow("show");
                    setType("sell");
                  }}
                >
                  {" "}
                  Click here{" "}
                </label>{" "}
              </Ripples>
            </div>
          </div>
          <div className="p-2 l:col-span-2 bg-purple text-center rounded-lg shadow-xl">
            <div className="my-3 flex justify-center">
              <span className="bg-white py-8 px-7 rounded-full">
                <Image src={Sell} className="" width={70}  />
              </span>
            </div>
            <div className="my-3">
              <CustomText
                text={"Want to Buy?"}
                className={"text-headupb2b ms:text-[24px] text-5xl font-bold"}
              />
            </div>
            <div className="my-3">
              <Ripples
                className={`${Gradient} rounded-md hover:scale-105 delay`}
              >
                {" "}
                <label
                  className="text-white py-2 px-4 text-xl"
                  onClick={() => {
                    setShow("show");
                    setType("nuy");
                  }}
                >
                  {" "}
                  Click here{" "}
                </label>{" "}
              </Ripples>
            </div>
          </div>
          <div className="t:hidden l:block l:col-span-1"></div>
        </div>
      </div>
      {show !== "" ? (
        <Modal
          show={show}
          setShow={setShow}
          maxHeight={650}
          title={type === "sell" ? "Want to sell" : "Want to buy"}
          data={
            type === "sell" ? (
              <CommonFormForHome
                setShow={setShow}
                endPoint={sendEmailToBuy}
                setShowAnimationBuy={setShowAnimationBuy}
              />
            ) : (
              <CommonFormForHome
                setShow={setShow}
                endPoint={sendEmailToSell}
                setShowAnimationSell={setShowAnimationSell}
              />
            )
          }
        />
      ) : null}
    </div>
  );
}
