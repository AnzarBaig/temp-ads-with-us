import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import getProductOptions, { getCategoryOptions } from '@/Contants/Functions/getProductOptions';
import { yupResolver } from '@hookform/resolvers/yup';
import toast, { Toaster } from 'react-hot-toast';
import Ripples from 'react-ripples';
import * as Yup from 'yup';
import makeAnimated from 'react-select/animated';
import { useRouter } from 'next/router';
import fetchCategoryData from '@/Contants/CategoryResponse';
import { useQuery } from '@tanstack/react-query';
import useCategoryData from '@/Utils/useCategoryData';
import { isGadSourcePresent } from '@/Utils/urlHelpers';
import { addWebsiteLead } from "@/Contants/APIEndpoint";

export default function CommonFormForHome({ setShow, endPoint, setShowAnimationBuy, setShowAnimationSell, categoryName, productName, categorySlug, productSlug, type ,show=true}) {
    const Router = useRouter();
    const { data: CategoryData, isLoading, isError, error, isFetching } = useCategoryData(
        ["getCategoryData"],
        fetchCategoryData
    );

    const selectedCategoryName = categoryName !== undefined ? categoryName : "";
    const selectedProduct = productName?.categoryName !== undefined ? productName?.categoryName : "";
    const categoryOptions = getCategoryOptions(CategoryData);

    const animatedComponents = makeAnimated();

    const schema = Yup.object().shape({
        name: Yup.string(),
        contactNo: Yup.string().required('Contact number is required').matches(/^[0-9]{10}$/, 'Invalid contact number'),
        email: Yup.string().email('Invalid email'),
        category: Yup.object(),
        product: Yup.array(),
        gstNumber: Yup.string().when('hasGst', {
            is: true,
            then: Yup.string().matches(/^\d{15}$/, 'Invalid GST number'),
        }),
        pincode: Yup.string().required('Pincode is required').matches(/^[1-9][0-9]{5}$/, 'Invalid pincode'),
    });

    const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productOptions, setProductOptions] = useState(categorySlug ? getProductOptions(categorySlug, CategoryData) : []);
    const [messageSent, setMessageSent] = useState(false);
    const selectRef = useRef(null);
    const [hasGst, setHasGst] = useState(null);

    useEffect(() => {
        if (selectedCategoryName && selectedCategory === null) {
            const defaultCategory = categoryOptions?.find(option => option.value === categorySlug)

            if (defaultCategory) {
                setSelectedCategory(defaultCategory);
                setValue("category", defaultCategory);
            }
        }
    }, [selectedCategory, setValue, categoryOptions]);

    useEffect(() => {
        if (selectedCategory) {
            const options = getProductOptions(selectedCategory.value, CategoryData);
            setProductOptions(options);
            setValue("product", null);
        }
    }, [selectedCategory, setValue, CategoryData]);

    useEffect(() => {
        if (productOptions.length > 0 && selectedProduct) {
            const defaultProduct = productOptions.find(option => option.label.toLowerCase() === selectedProduct.toLowerCase());
            if (defaultProduct) {
                setSelectedProducts([defaultProduct]);
                setValue("product", [defaultProduct]);
            }
        }
    }, [productOptions, selectedProduct, setValue]);

    // const onSubmit = (data) => {
    //     const gadSourceValue = isGadSourcePresent();
    //     if (data.category) {
    //         data.category = data.category.value;
    //     }
    //     if (data.product) {
    //         data.product = data.product.map(product => product.value).join(', ');
    //     }

    //     data.adsSource = gadSourceValue ? 'Ads Lead' : 'Organic Lead';
    //     setLoading(true);

    //     console.log("CommonForm Data:", data);

    //     fetch(endPoint, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             reset();
    //             setLoading(false);
    //             toast.success('Mail sent successfully');
    //             setShow ? setShow("") : null;
    //             selectRef.current.clearValue();

    //             // Update this section to handle animations based on type
    //             if (type === "buy") {
    //                 setShowAnimationBuy && setShowAnimationBuy(true);
    //                 setShowAnimationSell && setShowAnimationSell(false);
    //             } else if (type === "sell") {
    //                 setShowAnimationSell && setShowAnimationSell(true);
    //                 setShowAnimationBuy && setShowAnimationBuy(false);
    //             }

    //             setMessageSent(true);
    //             Router.push('/thank-you');
    //         })
    //         .catch((error) => {
    //             toast.error('Something went wrong', error.message);
    //             setLoading(false);
    //         });
    // };


    const onSubmit = (data) => {
        const gadSourceValue = isGadSourcePresent();
        if (data.category) {
            data.category = data.category.value;
        }
        if (data.product) {
            data.product = data.product.map(product => product.value).join(', ');
        }

        data.adsSource = gadSourceValue ? 'Ads Lead' : 'Organic Lead';
        setLoading(true);

        console.log("CommonForm Data:", data);

        // First API call to CRM
        fetch(addWebsiteLead, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
                    body: JSON.stringify(data),
                });
            })
            .then(emailResponse => emailResponse.json())
            .then(emailData => {
                console.log("Email API Response:", emailData);

                // Success - proceed with form reset and navigation
                reset();
                setLoading(false);
                toast.success('Lead saved and mail sent successfully');
                setShow ? setShow("") : null;
                selectRef.current.clearValue();

                // Handle animations based on type
                if (type === "buy") {
                    setShowAnimationBuy && setShowAnimationBuy(true);
                    setShowAnimationSell && setShowAnimationSell(false);
                } else if (type === "sell") {
                    setShowAnimationSell && setShowAnimationSell(true);
                    setShowAnimationBuy && setShowAnimationBuy(false);
                }

                setMessageSent(true);
                Router.push('/thank-you');
            })
            .catch((error) => {
                console.error('API Error:', error);
                toast.error(`Something went wrong: ${error.message}`);
                setLoading(false);
            });
    };


    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };

    return (
        <div className='px-6 py-2 bg-purple rounded-xl h-[69vh] 4k:h-[32vh] overflow-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='my-1 4k:my-2'>
                    <span className='text-xs font-semibold'>Name</span>
                    <input {...register('name')} type="text" placeholder="Name" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border-[#d4c9e9] font-medium' />
                    {errors.name && <span className='text-red-500 text-xs'>{errors.name.message}</span>}
                </div>
                <div className='my-1'>
                    <span className='text-xs font-semibold'>Contact Number <span className='text-red-500'>*</span></span>
                    <input {...register('contactNo')} type="text" placeholder="Contact Number" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border-[#d4c9e9] font-medium' />
                    {errors.contactNo && <span className='text-red-500 text-xs'>{errors.contactNo.message}</span>}
                </div>
                <div className="flex flex-col w-full justify-between">
                    <div className='my-1 w-full'>
                        <span className='text-xs font-semibold'>Select Category</span>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    ref={selectRef}
                                    options={categoryOptions}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                        handleCategoryChange(selectedOption);
                                    }}
                                    defaultValue={categoryOptions?.find(option => option.value === categorySlug)}
                                    placeholder={<div className=" " style={{ color: "#9BA3AF", fontSize: "15px", fontWeight: '450' }}>Select category</div>}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: "#d4c9e9",
                                            height: "38px",
                                            borderRadius: "5px ",
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: 'black',
                                            fontWeight: "500",
                                            fontSize: "0.830rem",
                                        }),
                                        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                                            const blue = '#5E3F99';
                                            return {
                                                ...styles,
                                                backgroundColor: isFocused ? blue : "white",
                                                color: isFocused ? "white" : "black",
                                            }
                                        },
                                    }}
                                />
                            )}
                        />
                        {errors.category && <span className='text-red-500 text-xs'>{errors.category.message}</span>}
                    </div>
                    <div className='my-1 w-full'>
                        <span className='text-xs font-semibold'>Select Product <span className='text-xs font-medium text-[#9BA3AF]'>(select as many as you like)</span></span>
                        <Controller
                            name="product"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    ref={selectRef}
                                    options={productOptions}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                        setSelectedProducts(selectedOption);
                                    }}
                                    defaultValue={productOptions.find(option => option.value === productSlug)}
                                    placeholder={<div className=" " style={{ color: "#9BA3AF", fontSize: "15px", fontWeight: '450' }}>Select Products</div>}
                                    isMulti
                                    components={animatedComponents}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: "#d4c9e9",
                                            height: "10%",
                                            borderRadius: "5px",
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: 'black',
                                            fontWeight: "500",
                                            fontSize: "0.830rem",
                                            backgroundColor: "white",
                                        }),
                                        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                                            const blue = '#5E3F99';
                                            return {
                                                ...styles,
                                                backgroundColor: isFocused ? blue : "white",
                                                color: isFocused ? "white" : "black",
                                            }
                                        },
                                    }}
                                />
                            )}
                        />
                        {errors.product && <span className='text-red-500 text-xs'>{errors.product.message}</span>}
                    </div>
                </div>
                {/* GST Question */}
                {show&&<div className="my-4">
                    <label className="text-xs font-semibold">Do you have a GST number?</label>
                    <div className="flex gap-4 mt-2">
                        <button
                            type="button"
                            className={`px-4 py-2 text-white rounded ${hasGst === true ? 'bg-[#5E3F99]' : 'bg-gray-300'
                                }`}
                            onClick={() => setHasGst(true)}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-white rounded ${hasGst === false ? 'bg-[#5E3F99]' : 'bg-gray-300'
                                }`}
                            onClick={() => setHasGst(false)}
                        >
                            No
                        </button>
                    </div>
                </div>}

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
                        {errors.gstNumber && <span className="text-red-500 text-xs">{errors.gstNumber.message}</span>}
                    </div>
                )}

                {hasGst === false && (
                    <div className="my-4">
                        <label className="text-xs font-semibold">GST Status</label>
                        <p className="text-gray-700">You have indicated that you don't have a GST number.</p>
                    </div>
                )}
                <div className='my-1'>
                    <span className='text-xs font-semibold'>Pincode of delivery Location <span className='text-red-500'>*</span></span>
                    <input {...register('pincode')} type="text" placeholder="Pincode of delivery Location" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border-[#d4c9e9] font-medium' />
                    {errors.pincode && <span className='text-red-500 text-xs'>{errors.pincode.message}</span>}
                </div>
                <div className='text-center mt-3'>
                    <Ripples>
                        {/* //from-[#402A6F] to-[#5E3F99] */}
                        <button
                            type='submit'
                            className='bg-headupb2b my-2 text-white px-4 py-2 font-semibold tracking-wider rounded-md mm:text-ms group-hover:from-white group-hover:to-white group-hover:text-headupb2b'
                        >
                            {loading ? 'Sending...' : 'Submit'}
                        </button>
                        {/* //bg-gradient-to-b from-[#402A6F] to-[#5E3F99]  */}
                    </Ripples>
                    {messageSent && <div id='messageSent'></div>}
                </div>
            </form>
            <Toaster
                position='top-center'
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: 'text-xs',
                    duration: 7000,
                    style: {},
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: '5E3F99',
                        },
                    },
                }}
            />
        </div>
    );
}