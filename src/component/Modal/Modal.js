import React from 'react';

export default function Modal({ show, setShow, data, title, categoryName, maxHeight, min, FilterSwitch }) {
    const handleCloseFun = () => {
        setShow('');
    };


    return (
        <div id="modal6" className="fixed inset-0 z-[100] flex items-center justify-center p-8 backdrop-filter backdrop-blur-md bg-opacity-12 show" role="dialog">
            <div className="absolute inset-0 bg-slate-900/60"></div>
            <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white dark:bg-navy-700">
                <div className="overflow-auto bg-purple">
                    <div className='flex items-center justify-between p-3 pb-0'>
                        <h3 className='l:text-xl text-md font-medium  text-headupb2b dark:text-navy-100 w-full'>{categoryName ? `Raise a Request for ${categoryName}` : title}</h3>
                        <button
                            className="text-headupb2b rounded-full p-0 hover:bg-headupb2b/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                            onClick={handleCloseFun}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className='p-4' style={{ maxHeight: maxHeight || 'auto', overflowY: 'auto' }}>{data}</div>
                </div>
            </div>
        </div>
    );
}
