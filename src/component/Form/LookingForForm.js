import React, { useState } from 'react';
import CustomInput from './Input/CustomInput';
import CustomRipple from './Button/CustomRipple';
import { sendEmail } from '@/Contants/APIEndpoint';
import toast, { Toaster } from 'react-hot-toast';
const TextClass = 'outline-none rounded-md text-black text-sm w-full px-3 py-2 border border border-[#d4c9e9] font-medium 4k:text-2xl';

export default function LookingForForm() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const ImportantFields = ['name', 'contactNo', 'deliveryAddress', 'pincode'];

    const onSubmit = (e) => {

        // Validate form fields
        for (let i = 0; i < ImportantFields.length; i++) {
            if (!formData[ImportantFields[i]]) {
                setError({ ...error, [ImportantFields[i]]: 'This field is required' });
                return;
            } else if (ImportantFields[i] === 'contactNo') {
                if (formData["contactNo"]?.length !== 10 || isNaN(formData["contactNo"])) {
                    setError({ ...error, "contactNo": 'Contact number should be of 10 digit Number' });
                    return;
                }
            } else if (ImportantFields[i] === 'pincode') {
                if (formData["pincode"]?.length !== 6 || isNaN(formData["pincode"])) {
                    setError({ ...error, "pincode": 'Pincode should be a 6-digit number' });
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
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                setFormData({
                    name: '',
                    contactNo: '',
                    email: '',
                    productName: '',
                    quantity: '',
                    deliveryAddress: '',
                    pincode: ''
                });
                setLoading(false)
                toast.success('Mail sent successfully');
                setError({});

            })
            .catch((error) => {
                console.error('Error:', error);
            });


    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error[name]) {
            setError({ ...error, [name]: null });
        }
    };

    return (
        <div className='px-10 '>
            <div className='py-1.5 4k:py-2'><CustomInput showHeader={true} placeholder={'Name'} className={TextClass} important={true} /></div>
            <div className='py-1.5 4k:py-2'><CustomInput showHeader={true} placeholder={'Contact Number'} className={TextClass} important={true} /></div>
            <div className='py-1.5 4k:py-2'><CustomInput showHeader={true} placeholder={'Email Id'} className={TextClass} /></div>
            <div className='py-1.5 4k:py-2'><CustomInput showHeader={true} placeholder={'Enter Product Name'} className={TextClass} /></div>
            {/* <div className='py-1.5 4k:py-2'><CustomInput showHeader={true} placeholder={'Quantity'} className={TextClass} /></div>
            <div className='py-1.5 4k:py-2'><CustomInput showHeader={true} placeholder={'Address of delivery Location'} className={TextClass} important={true} /></div> */}
            <div className='py-1.5 4k:py-2'><CustomInput showHeader={true} placeholder={'Pincode of delivery Location'} className={TextClass} important={true} /></div>
            <div className='mm:text-center ll:text-center mb-4'> <CustomRipple text={'Submit'} className={'mm:mt-3 mm:text-[17px] mm:px-6 mm:py-2.5 l:px-10 l:py-3'}/> </div>
        </div>
    );
}
