import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import Client from './Client';
import Partner from './Partner';

export default function ClientPartnerSwitch() {
    const [selected, setSelected] = useState(true)


    const handleSelect = (value) => {
        setSelected(value)
    }

    return (
        <div>
            <div className='flex rounded-full text-center ll:mx-40 bg-purple cursor-pointer '>
                {/* <div className={`switch p-0.5 rounded-full ${selected ? 'bg-gradient-to-r from-[#5E3F99] to-[#F2AB1E]' : null} w-full`} onClick={() => handleSelect(true)}>
                    <span className={`block text-black px-4 py-2  rounded-full bg-white text-xs ll:text-xl ${selected ? 'bg-purple font-semibold' : 'text-slate-500 font-normal'}`}>Our Trusted Partners</span>
                </div>
                <div className={`switch p-0.5 rounded-full ${!selected ? 'bg-gradient-to-r from-[#5E3F99] to-[#F2AB1E]' : null} w-full`} onClick={() => handleSelect(false)}>
                    <span className={`block text-black px-4 py-2  rounded-full bg-white text-xs ll:text-xl ${!selected ? 'bg-purple font-semibold' : 'text-slate-500 font-normal' }`}>Our Happy Clients</span>
                </div> */}
                <div className={`switch ${selected ? '' : null} w-full`} onClick={() => handleSelect(true)}>
                    <span className={`block text-black px-4 py-4  text-xs ll:text-xl ${selected ? 'bg-headupb2b text-white font-semibold rounded-full ' : 'bg-purple text-[#8a7ea8] font-normal rounded-l-full'}`}>Our Trusted Partners</span>
                </div>
                <div className={`switch  ${!selected ? '' : null} w-full`} onClick={() => handleSelect(false)}>
                    <span className={`block text-black px-4 py-4  text-xs ll:text-xl ${!selected ? 'bg-headupb2b text-white font-semibold rounded-full' : 'bg-purple text-[#8a7ea8]  font-normal rounded-r-full'}`}>Our Happy Clients</span>
                </div>

            </div>
            <div className='my-5'>{selected ? <Partner /> : <Client />}</div>
        </div>
    )
}
