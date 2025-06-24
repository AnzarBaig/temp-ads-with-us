import React, { useState } from 'react'

export default function FAQItem({ ele, selected, setSelected, onClick }) {



    return (
        <div class="">
            <details class="group shadow-lg rounded-b-lg ">
                <summary class={`flex justify-between items-center font-medium cursor-pointer list-none leading-5 bg-white min-h-14  ${selected === ele?._id ? 'rounded-t-lg border-b border-b-slate-200' : 'rounded-lg'}`} onClick={onClick}>
                    <div className={`${selected === ele?._id?'shadow-xl':''} flex w-full justify-between items-center  mm:px-6 mm:py-3`}>
                        <span className='mm:max-w-[85%] l:max-w-[90%] '> {ele?.question} </span>
                        <span class="transition group-open:rotate-180 ">
                            {
                                selected === ele?._id? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                              </svg>
                               : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            }
                        </span>
                    </div>
                </summary>
                {
                    selected === ele?._id ? <p class="bg-slate-100 p-2 rounded-b-lg  text-neutral-600 group-open:animate-fadeIn  l:text-[13px] l:px-6">
                        {ele?.answer}
                    </p> : null
                }
            </details>
        </div>
    )
}
