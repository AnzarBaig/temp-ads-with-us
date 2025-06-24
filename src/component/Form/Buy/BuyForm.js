import React, { useState } from 'react'
import CustomInput from '../Input/CustomInput'
import CustomRipple from '../Button/CustomRipple'
const TextClass = 'outline-none rounded-md text-black text-sm w-full px-3 py-2 border border border-[#d4c9e9] font-medium'
import { sendEmail } from '@/Contants/APIEndpoint'
import toast, { Toaster } from 'react-hot-toast';




// placeholder:text-slate-500

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
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {

                setFormData({
                    name: '',
                    contactNo: '',
                    email: '',
                    category: '',
                    product: '',
                    specification: '',
                    quantity: '',
                    deliveryAddress: '',
                    pincode: ''
                });
                setLoading(false)
                setError({});
                toast.success('Mail sent successfully');
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
            <form action={onSubmit}>
                <div className='my-2'><CustomInput showHeader={true} placeholder={'Name'} className={TextClass} value={formData.name} important={true} name="name" onChange={handleInputChange}
                /></div>
                {error.name && <span className='text-red-500 text-xs'>{error.name}</span>}
                <div className='my-2'><CustomInput showHeader={true} placeholder={'Contact Number'} className={TextClass} value={formData.contactNo} important={true} name="contactNo" onChange={handleInputChange} /></div>
                {error.contactNo && <span className='text-red-500 text-xs'>{error.contactNo}</span>}
                <div className='my-2'><CustomInput showHeader={true} placeholder={'Email Id'} className={TextClass} onChange={handleInputChange} value={formData.email} name="email" /></div>
                <div className='my-2'><CustomInput showHeader={true} placeholder={'Select Category'} className={TextClass} onChange={handleInputChange} value={formData.category} name="category" /></div>
                <div className='my-2'><CustomInput showHeader={true} placeholder={'Select Product'} className={TextClass} onChange={handleInputChange} value={formData.product} name="product" /></div>
                <div className='my-2'><CustomInput showHeader={true} placeholder={'Any Specification'} className={TextClass} onChange={handleInputChange} value={formData.specification} name="specification" /></div>
                <div className='my-2'><CustomInput showHeader={true} placeholder={'Quantity'} className={TextClass} onChange={handleInputChange} value={formData.quantity} name="quantity" /></div>
                <div className='my-2'><CustomInput showHeader={true} placeholder={'Address of delivery Location'} className={TextClass} important={true} value={formData.deliveryAddress} onChange={handleInputChange} name="deliveryAddress" /></div>
                {error.deliveryAddress && <span className='text-red-500 text-xs'>{error.deliveryAddress}</span>}
                <div className='my-2'><CustomInput showHeader={true} placeholder={'Pincode of delivery Location'} className={TextClass} important={true} value={formData.pincode} onChange={handleInputChange} name="pincode" /></div>
                {error.pincode && <span className='text-red-500 text-xs'>{error.pincode}</span>}
                <div className='ll:text-center'><CustomRipple text={loading ? 'Sending...' : 'Submit'} onClick={onSubmit} className={'bg-headupb2b text-white px-4 py-2 rounded-md text-base font-medium tracking-wide my-2'} onChange={handleInputChange} /></div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        // Define default options
                        className: 'text-xs',
                        duration: 5000,
                        style: {

                        },

                        // Default options for specific types
                        success: {
                            duration: 3000,
                            theme: {
                                primary: 'green',
                                secondary: '5E3F99',
                            },
                        },
                    }}
                />
            </form>
        </div>
    )
}

