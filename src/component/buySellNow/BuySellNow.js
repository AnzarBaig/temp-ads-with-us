"use client";

import { sendEmailToBuy, sendEmailToSell } from "@/Contants/APIEndpoint";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomText from "@/component/Text/CustomText";
import { sendEmailToGetInTouch } from "@/Contants/APIEndpoint";
import toast, { Toaster } from "react-hot-toast";
import CommonFormForHome from "@/component/Form/CommonFormForHome";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  contactNo: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Invalid contact number"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string(),
  message: yup.string(),
});

function BuySellNow() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState("show");
  const [type, setType] = useState("buy"); // Set "buy" as default
  const [showAnimationBuy, setShowAnimationBuy] = useState(true); // Default animation for "Buy"
  const [showAnimationSell, setShowAnimationSell] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState(sendEmailToBuy); // Default endpoint
  const router = useRouter();

  // Update endpoint whenever type changes
  useEffect(() => {
    if (type === "buy") {
      setCurrentEndpoint(sendEmailToBuy);
      setShowAnimationBuy(true);
      setShowAnimationSell(false);
    } else if (type === "sell") {
      setCurrentEndpoint(sendEmailToSell);
      setShowAnimationBuy(false);
      setShowAnimationSell(true);
    }
  }, [type]);

  const handleButtonClick = (buttonType) => {
    setShow("show");
    setType(buttonType);
    reset(); // Reset form when switching between buy/sell

    // Reset both animation states
    setShowAnimationBuy(false);
    setShowAnimationSell(false);

    // Set the appropriate animation state based on button type
    if (buttonType === "buy") {
      setShowAnimationBuy(true);
      setCurrentEndpoint(sendEmailToBuy);
    } else if (buttonType === "sell") {
      setShowAnimationSell(true);
      setCurrentEndpoint(sendEmailToSell);
    }
  };

  const onSubmit = async (formData) => {
    if (!currentEndpoint) {
      toast.error("Please select buy or sell first");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(currentEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data);

      reset();
      toast.success("Mail sent successfully");

      // Reset states after successful submission
      setShowAnimationBuy(false);
      setShowAnimationSell(false);
      setShow("");
      setType("buy"); // Reset to default state
      setCurrentEndpoint(sendEmailToBuy);
      setShowAnimationBuy(true);

      router.push("/thank-you");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-headupb2b rounded-2xl p-4 shadow-xl lg:w-[55vh] max-w-lg h-[87vh] scroll-m-8">
        <h2 className="text-xl font-bold text-white flex items-center justify-center">
          Tell Us Your Requirement
        </h2>
        <div className="flex gap-3 mb-2">
          <button
            type="button"
            onClick={() => handleButtonClick("buy")}
            className={`flex-1 py-1 px-4 rounded-full font-medium ${
              type === "buy"
                ? "bg-[#8e6fc7] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick("sell")}
            className={`flex-1 py-1 px-4 rounded-full font-medium ${
              type === "sell"
                ? "bg-[#8e6fc7] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Sell
          </button>          
        </div>    
        {/* <div className=""> */}
          <CommonFormForHome
            setShow={setShow}
            endPoint={currentEndpoint}
            setShowAnimationBuy={setShowAnimationBuy}
            setShowAnimationSell={setShowAnimationSell}
            showAnimationBuy={showAnimationBuy}
            showAnimationSell={showAnimationSell}
            onSubmit={onSubmit}
            isLoading={isLoading}
            type={type}
          />
        </div>    
      {/* </div> */}
    </>
  );
}

export default BuySellNow;
