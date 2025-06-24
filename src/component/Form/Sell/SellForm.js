import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import getProductOptions from '@/Contants/Functions/getProductOptions';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendEmail } from '@/Contants/APIEndpoint';
import toast, { Toaster } from 'react-hot-toast';
import Ripples from 'react-ripples';
import * as Yup from 'yup';
const categoryOptions = [
    { value: "steel", label: "Steel" },
    { value: "road-safety-equipments", label: "Road Safety Equipment" },
    { value: "construction-materials", label: "Construction Materials" },
    { value: "plumbing-and-fitting", label: "Plumbing and Fitting" },
    { value: "electricals", label: "Electrical" },
    { value: "safety-products", label: "Safety Products" },
    { value: "welding-machines-and-electrodes", label: "Welding Machine & Electrodes" },
    { value: "tools-and-accessories", label: "Tools and Accessories" },
    { value: "tool-room-machines", label: "Tool Room Machines" },
    { value: "material-handling-equipment", label: "Material Handling Equipment" },
    { value: "non-ferrous-products", label: "Non Ferrous Products" },
    { value: "renewable-energy", label: "Renewable Energy" }
];

export default function SellForm({ setShow }) {

    const [formData, setFormData] = useState({})
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const ImportantFilds = ['name', 'contactNo', 'deliveryAddress', 'pincode']


    const onSubmit = (e) => {

        
        // e.preventDefault();

        for (let i = 0; i < ImportantFilds.length; i++) {

            if (!formData[ImportantFilds[i]]) {
                setError({ ...error, [ImportantFilds[i]]: 'This field is required' });
                return;
            }
            else if (ImportantFilds[i] === 'contactNo') {
                if (formData["contactNo"]?.length !== 10 || isNaN(formData["contactNo"])) {
                    setError({ ...error, "contactNo": 'Contact number should be of 10 digit Number' });
                    return;
                }

            }

            else if (ImportantFilds[i] === 'pincode') {
                if (formData["pincode"]?.length !== 6 || isNaN(formData["pincode"])) {
                    setError({ ...error, "pincode": 'Pincode should be of 6 digit Number' });
                    return;
                }
            }



        };
        setLoading(true)
        fetch(sendEmail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {

                setFormData({
                    name: '',
                    contactNo: '',
                    email: '',
                    category: '',
                    product: '',
                    gstNumber: '',
                    specification: '',
                    quantity: '',
                    deliveryAddress: '',
                    pincode: ''
                });
                setLoading(false)
                setError({});
                toast.success('Mail sent successfully');
                setShow("");
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // setShow('');



    }
  
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

        if (error[e.target.name] || error[e.target.contactNo] || error[e.target.deliveryAddress] || error[e.target.pincode]) {
            setError({ ...error, [e.target.name]: null });
        }
    }
    return (
        <div className='px-10 py-4 bg-purple rounded-lg'>
            <form onSubmit={onSubmit}>
                <div className='my-2'>
                    <span className='text-xs font-semibold'>Name <span className='text-red-500'>*</span></span>
                    <input {...register('name', { required: true })} type="text" placeholder="Name" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border border-[#d4c9e9] font-medium' />
                    {errors.name && <span className='text-red-500 text-xs'>Name is required</span>}
                </div>
                <div className='my-2'>
                    <span className='text-xs font-semibold'>Contact Number <span className='text-red-500'>*</span></span>
                    <input {...register('contactNo', { required: true })} type="text" placeholder="Contact Number" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border border-[#d4c9e9] font-medium' />
                    {errors.contactNo && <span className='text-red-500 text-xs'>Contact number is required</span>}
                </div>
                <div className='my-2'>
                    <span className='text-xs font-semibold'>Email Id</span>
                    <input {...register('email')} type="email" placeholder="Email Id" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border border-[#d4c9e9] font-medium' />
                    {errors.email && <span className='text-red-500 text-xs'>Invalid email</span>}
                </div>
                <div className='my-2'>
                    <span className='text-xs font-semibold'>Select Category <span className='text-red-500'>*</span></span>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categoryOptions}
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption);
                                    handleCategoryChange(selectedOption);
                                }}
                                placeholder="Select Category"
                            />
                        )}
                        rules={{ required: true }}
                    />
                    {errors.category && <span className='text-red-500 text-xs'>Category is required</span>}
                </div>
                <div className='my-2'>
                    <span className='text-xs font-semibold'>Select Product <span className='text-red-500'>*</span></span>
                    <Controller
                        name="product"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={productOptions}
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption);
                                    setSelectedProducts(selectedOption);
                                }}
                                placeholder="Select Product"
                                isMulti
                            />
                        )}
                        rules={{ required: true }}
                    />
                    {errors.product && <span className='text-red-500 text-xs'>Product is required</span>}
                </div>
                <div className='my-2'>
                    <span className='text-xs font-semibold'>Any Specification</span>
                    <input {...register('specification')} type="text" placeholder="Any Specification" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border border-[#d4c9e9] font-medium' />
                </div>
                <div className='my-2'>
                    <span className='text-xs font-semibold'>Quantity</span>
                    <input {...register('quantity')} type="text" placeholder="Quantity" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border border-[#d4c9e9] font-medium' />
                    {errors.quantity && <span className='text-red-500 text-xs'>Invalid quantity</span>}
                </div>
                <div className='my-2'>
                    <span className='text-xs font-semibold'>Address of delivery Location <span className='text-red-500'>*</span></span>
                    <input {...register('deliveryAddress', { required: true })} type="text" placeholder="Address of delivery Location" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border border-[#d4c9e9] font-medium' />
                    {errors.deliveryAddress && <span className='text-red-500 text-xs'>Delivery address is required</span>}
                </div>
                <div className='my-2'>
                    <span className='text-xs font-semibold'>Pincode of delivery Location <span className='text-red-500'>*</span></span>
                    <input {...register('pincode', { required: true })} type="text" placeholder="Pincode of delivery Location" className='outline-none rounded-md text-black text-sm w-full px-3 py-2 border border border-[#d4c9e9] font-medium' />
                    {errors.pincode && <span className='text-red-500 text-xs'>Pincode is required</span>}
                </div>
                <Ripples>
                    <button
                        type='submit'
                        className='bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white px-4 py-2 font-semibold tracking-wider rounded-md mm:text-xs group-hover:from-white group-hover:to-white group-hover:text-headupb2b'
                    >
                        {loading ? 'Sending...' : 'Submit'}
                    </button>
                </Ripples>
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
