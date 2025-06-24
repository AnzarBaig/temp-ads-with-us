'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomText from '@/component/Text/CustomText';
import Image from 'next/image';
import ContactUsImage from '@/assets/images/contact.png';
import Ripples from 'react-ripples';
import { sendEmailToGetInTouch } from '@/Contants/APIEndpoint';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Map from '@/component/Map/Map';  
import { isGadSourcePresent } from '@/Utils/urlHelpers';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    contactNo: yup.string().required('Contact number is required').matches(/^[0-9]{10}$/, 'Invalid contact number'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string(),
    message: yup.string(),
});

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(schema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Watch the message field to detect "job"
    const messageValue = watch("message");
    const isJobMentioned = /\bjob\b/i.test(messageValue || "");

    const onSubmit = async (formData) => {
        setIsLoading(true);
        const gadSourceValue = isGadSourcePresent();

        try {
            const updatedFormData = {
                ...formData,
                adsSource: gadSourceValue ? 'Ads Lead' : 'Organic Lead'
            };
            const response = await fetch(sendEmailToGetInTouch, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Response data:", data);

            reset();
            toast.success('Mail sent successfully');
            router.push('/thank-you');
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='p-8 lg:p-10 4k:min-h-[800px]'>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
                <div className='lg:col-span-2 relative'>
                    <div className='flex flex-col text-white'>
                        <CustomText text='Our Location' className='font-bold text-2xl 4k:text-6xl' />
                        <Map />
                    </div>
                </div>
                <div className='lg:col-span-3'>
                    <CustomText text='Get in touch' className='font-bold text-2xl 4k:text-6xl text-white' />

                    <div className='bg-[#8c6ec4] p-6 rounded-lg'>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className='mb-6'>
                                <CustomText text='Send us a message' className='text-lg text-white' />
                            </div>
                            {['name', 'contactNo', 'email', 'address'].map((field) => (
                                <div key={field} className='my-3'>
                                    <label htmlFor={field} className='sr-only'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        {...register(field)}
                                        id={field}
                                        placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}${field !== 'address' ? '*' : ''}`}
                                        className='bg-transparent text-white placeholder:text-white w-full border-b mb-2 outline-none'
                                        aria-invalid={errors[field] ? 'true' : 'false'}
                                    />
                                    {errors[field] && <span className="text-red-500">{errors[field].message}</span>}
                                </div>
                            ))}
                            <div className='my-3'>
                                <label htmlFor="message" className='text-lg text-white'>Message</label>
                                <textarea
                                    {...register("message")}
                                    id="message"
                                    className='bg-transparent text-white placeholder:text-white w-full border mb-2 rounded-lg outline-none p-2'
                                    rows={2}
                                ></textarea>
                                {isJobMentioned && (
                                    <p className="text-white text-sm mt-1">Sorry, job-related queries are not allowed. <a className='decoration underline hover:cursor-pointer' href='https://www.headsupb2b.com/careers' target='_blank'>Click Here</a> for career page</p>
                                )}
                            </div>

                            <div className='text-center'>
                                <Ripples className='bg-white rounded-md hover:scale-105 transition-transform'>
                                    <button
                                        type="submit"
                                        className='text-[#5E3F99] py-2 px-8 font-medium text-xl'
                                        disabled={isLoading || isJobMentioned}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner mr-2"></span>
                                                Sending...
                                            </>
                                        ) : "Send"}
                                    </button>
                                </Ripples>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
}
