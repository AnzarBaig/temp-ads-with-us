import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import getProductOptions, {
  getCategoryOptions,
} from "@/Contants/Functions/getProductOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import Ripples from "react-ripples";
import * as Yup from "yup";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/router";
import fetchCategoryData from "@/Contants/CategoryResponse";
import { useQuery } from "@tanstack/react-query";
import useCategoryData from "@/Utils/useCategoryData";
import { isGadSourcePresent } from '@/Utils/urlHelpers';


export default function CommonForm({
  setShow,
  endPoint,
  setShowAnimationBuy,
  setShowAnimationSell,
  categoryName,
  productName,
  categorySlug,
  productSlug,
}) {
  const Router = useRouter();
  const {
    data: CategoryData,
    isLoading,
    isError,
  } = useCategoryData(["getCategoryData"], fetchCategoryData);

  const animatedComponents = makeAnimated();

  const categoryOptions = getCategoryOptions(CategoryData);
  const initialCategory =
    categoryOptions?.find((option) => option.value === categorySlug) || null;

  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const [productOptions, setProductOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const selectRef = useRef(null);
  const [hasGst, setHasGst] = useState(null);

  // Update product options when category changes
  useEffect(() => {
    if (currentCategory) {
      const options = getProductOptions(currentCategory.value, CategoryData);
      setProductOptions(options);
    } else {
      setProductOptions([]);
    }
  }, [currentCategory, CategoryData]);

  const initialProducts = currentCategory
    ? productOptions?.filter((option) => productSlug?.includes(option.value))
    : [];

  const schema = Yup.object().shape({
    name: Yup.string(),
    contactNo: Yup.string()
      .required("Contact number is required")
      .matches(/^[0-9]{10}$/, "Invalid contact number"),
    email: Yup.string().email("Invalid email"),
    category: Yup.object().nullable(),
    product: Yup.array().of(Yup.object()),
    gstNumber: Yup.string().when("hasGst", {
      is: true,
      then: Yup.string().matches(/^\d{15}$/, "Invalid GST number"),
    }),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^[1-9][0-9]{5}$/, "Invalid pincode"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: initialCategory,
      product: initialProducts,
    },
  });

  // Update category and products on initial load or when category slug changes
  useEffect(() => {
    if (categorySlug && !initialCategory) {
      const defaultCategory = categoryOptions?.find(
        (option) => option.value === categorySlug
      );
      if (defaultCategory) {
        setValue("category", defaultCategory);
        setCurrentCategory(defaultCategory);
      }
    }
  }, [categorySlug, initialCategory, categoryOptions, setValue]);

  // Update products when initial category or product slug changes
  useEffect(() => {
    if (productOptions?.length > 0 && productSlug) {
      const defaultProducts = productOptions.filter((option) =>
        productSlug.includes(option.value)
      );
      if (defaultProducts.length) {
        setValue("product", defaultProducts);
      }
    }
  }, [productOptions, productSlug, setValue]);

  // const onSubmit = (data) => {
  //   const gadSourceValue = isGadSourcePresent();
  //   const formattedData = {
  //     ...data,
  //     category: data.category?.value || "",
  //     adsSource: gadSourceValue ? 'Ads Lead' : 'Organic Lead',
  //     product: data.product?.some((p) => p.value === "other")
  //       ? "Other" : data.product?.map((product) => product.value).join(", ") || "",
  //   };

  //   setLoading(true);

  //   console.log("formattedData", formattedData);

  //   fetch(endPoint, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formattedData),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       reset();
  //       setLoading(false);
  //       toast.success("Mail sent successfully");
  //       setShow && setShow("");
  //       selectRef.current?.clearValue();
  //       setShowAnimationBuy && setShowAnimationBuy(true);
  //       setShowAnimationSell && setShowAnimationSell(true);
  //       setMessageSent(true);
  //       Router.push("/thank-you");
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong");
  //       setLoading(false);
  //     });
  // };

  const onSubmit = (data) => {
    const gadSourceValue = isGadSourcePresent();
    const formattedData = {
      ...data,
      category: data.category?.value || "",
      adsSource: gadSourceValue ? 'Ads Lead' : 'Organic Lead',
      product: data.product?.some((p) => p.value === "other")
        ? "Other" : data.product?.map((product) => product.value).join(", ") || "",
    };

    setLoading(true);

    console.log("formattedData", formattedData);

    // First API call to CRM
    fetch('https://api-crm.headsupb2b.com/api/addWebsiteLead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`CRM API failed with status: ${response.status}`);
        }
      })
      .then(crmResponse => {
        console.log("CRM API Response:", crmResponse);

        // Second API call to send email (original endpoint)
        return fetch(endPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        });
      })
      .then(emailResponse => emailResponse.json())
      .then(emailData => {
        console.log("Email API Response:", emailData);

        // Success - proceed with form reset and navigation
        reset();
        setLoading(false);
        toast.success('Lead saved and mail sent successfully');
        setShow && setShow("");
        selectRef.current?.clearValue();
        setShowAnimationBuy && setShowAnimationBuy(true);
        setShowAnimationSell && setShowAnimationSell(true);
        setMessageSent(true);
        Router.push("/thank-you");
      })
      .catch((error) => {
        console.error('API Error:', error);
        toast.error(`Something went wrong: ${error.message}`);
        setLoading(false);
      });
  };
  return (
    <div className="px-6 py-2 bg-purple rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-1">
          <label className="text-xs font-semibold">Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="outline-none rounded-md text-black text-sm w-full px-3 py-2 border border-[#d4c9e9] font-medium"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>

        <div className="my-1">
          <label className="text-xs font-semibold">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("contactNo")}
            type="text"
            placeholder="Contact Number"
            className="outline-none rounded-md text-black text-sm w-full px-3 py-2 border border-[#d4c9e9] font-medium"
          />
          {errors.contactNo && (
            <span className="text-red-500 text-xs">
              {errors.contactNo.message}
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:space-x-2">
          <div className="my-1 w-full">
            <label className="text-xs font-semibold">Select Category</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  ref={selectRef}
                  options={[
                    ...(categoryOptions || []),
                    { value: "other", label: "Other" },
                  ]}
                  defaultValue={initialCategory}
                  onChange={(selected) => {
                    // Update form value
                    field.onChange(selected);

                    // Update local state for dynamic product options
                    setCurrentCategory(selected);

                    // Reset product selection
                    setValue(
                      "product",
                      selected?.value === "other"
                        ? [{ value: "other", label: "Other" }]
                        : []
                    );
                  }}
                  placeholder="Select category"
                  styles={{
                    control: (base) => ({ ...base, borderColor: "#d4c9e9" }),
                  }}
                />
              )}
            />
            {errors.category && (
              <span className="text-red-500 text-xs">
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="my-1 w-full">
            <label className="text-xs font-semibold">Select Product</label>
            <Controller
              name="product"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    field.value?.[0]?.value === "other"
                      ? [{ value: "other", label: "Other" }]
                      : productOptions
                  }
                  value={field.value}
                  isMulti={field.value?.[0]?.value !== "other"}
                  components={animatedComponents}
                  onChange={(selected) => {
                    field.onChange(selected);
                  }}
                  placeholder="Select Products"
                  isDisabled={!currentCategory && !productOptions.length}
                  styles={{
                    control: (base) => ({ ...base, borderColor: "#d4c9e9" }),
                  }}
                />
              )}
            />
            {errors.product && (
              <span className="text-red-500 text-xs">
                {errors.product.message}
              </span>
            )}
          </div>
        </div>

        {/* GST Question */}
        <div className="my-4">
          <label className="text-xs font-semibold">
            Do you have a GST number?
          </label>
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              className={`px-4 py-2 text-white rounded ${hasGst === true ? "bg-[#5E3F99]" : "bg-gray-300"
                }`}
              onClick={() => setHasGst(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-white rounded ${hasGst === false ? "bg-[#5E3F99]" : "bg-gray-300"
                }`}
              onClick={() => setHasGst(false)}
            >
              No
            </button>
          </div>
        </div>

        {/* Conditional GST Input */}
        {hasGst === true && (
          <div className="my-4">
            <label className="text-xs font-semibold">GST Number</label>
            <Controller
              name="gstNumber"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter GST Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              )}
            />
            {errors.gstNumber && (
              <span className="text-red-500 text-xs">
                {errors.gstNumber.message}
              </span>
            )}
          </div>
        )}

        {hasGst === false && (
          <div className="my-4">
            <label className="text-xs font-semibold">GST Status</label>
            <p className="text-gray-700">
              You have indicated that you don't have a GST number.
            </p>
          </div>
        )}

        <div className="my-1">
          <label className="text-xs font-semibold">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            {...register("pincode")}
            type="text"
            placeholder="Pincode"
            className="outline-none rounded-md text-black text-sm w-full px-3 py-2 border border-[#d4c9e9] font-medium"
          />
          {errors.pincode && (
            <span className="text-red-500 text-xs">
              {errors.pincode.message}
            </span>
          )}
        </div>

        <div className="text-center">
          <Ripples>
            <button
              type="submit"
              className="bg-gradient-to-b my-2 from-[#402A6F] to-[#5E3F99] text-white px-4 py-2 font-semibold tracking-wider rounded-md"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </Ripples>
        </div>
      </form>
      <Toaster />
    </div>
  );
}