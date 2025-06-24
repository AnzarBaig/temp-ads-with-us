import React, { useState } from 'react';
import CustomRipple from '../Form/Button/CustomRipple';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import CommonForm from '../Form/CommonForm';
import { sendEmailToBuy } from '@/Contants/APIEndpoint';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Mail, ArrowRightIcon } from 'lucide-react';
import ShinyButton from '@/components/magicui/shiny-button';

function ProductCard({ data, subCategoryData }) {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState('');

    const handleNavigate = () => {
        setShow(true);
    };
    const handleClick = () => {
        setSelected(data?.displayName || data?.categoryName || data?.name);
    };

    const router = useRouter();
    const { category, subcategory } = router.query;
    const url = `/${category}/${subcategory}/${data?.slug}`;

    return (
        <div>
            
            <div
                className={`group cursor-pointer card product-card ml:rounded-2xl ms:rounded-2xl ms:text-center l:min-h-[230px] hover:bg-headupb2b hover:text-white`}
            >
                <Link href={url}>
                    <div
                        className='flex item-center justify-center'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={(data?.images[0] || data?.productImage) ? (data?.images[0] || data?.productImage) : '/defaultImage.jpeg'}
                            width={100}
                            height={100}
                            priority={true}
                            className='cursor-pointer ms:rounded-3xl ms:p-3 ms:min-h-[250px] ms:max-h-[250px] t:min-h-[160px] t:max-h-[160px] 4k:min-h-[260px] 4k:max-h-[260px]'
                            style={{ width: '100%', objectFit: 'cover' }}
                            unoptimized={true}
                        />
                    </div>
                </Link>
                <div className='ms:px-3 ms:pb-3 4k:pb-6'>
                    <Link href={url}>
                        <div className={`l:mt-[-10px]`} onClick={(e) => e.stopPropagation()}>
                            <label className={`cursor-pointer font-bold ms:text-xl l:text-[15px] 4k:text-3xl`}>
                                {data?.displayName || data?.categoryName || data?.name}
                            </label>
                        </div>
                    </Link>
                    <div className="w-full flex flex-row justify-around">
                        <Link href="tel:+917210199772">
                            <Button variant="default" className=" px-4 py-2 font-normal tracking-wider rounded-md mm:text-xs cursor-pointer ms:mt-3 ms:text-[16px] ms:px-6 ms:py-2.5 l:px-4 l:py-2 4k:text-2xl bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white group-hover:font-medium group-hover:text-headupb2b group-hover:from-white group-hover:to-white">
                                Call Us
                            </Button>
                        </Link>
                        <Button variant="default" className="ripple px-4 py-2 font-normal tracking-wider rounded-md mm:text-xs cursor-pointer ms:mt-3 ms:text-[16px] ms:px-6 ms:py-2.5 l:px-4 l:py-2 4k:text-2xl group bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white group-hover:font-medium group-hover:text-headupb2b group-hover:from-white group-hover:to-white" onClick={(e) => {
                            // e.stopPropagation();
                            handleNavigate();
                            handleClick();
                        }}>
                            Raise Quote
                        </Button>
                    </div>
                    {/* <div className='l:bottom-4 l:mt-[-10px] 4k:mt-[4px]'>
                        <CustomRipple
                            text={'Raise Quote'}
                            className={`ripple cursor-pointer ms:mt-3 ms:text-[16px] ms:px-6 ms:py-2.5 l:px-4 l:py-2 4k:text-2xl`}
                            onClick={(e) => {
                                // e.stopPropagation();
                                handleNavigate();
                                handleClick();
                            }}
                        />

                    </div> */}
                    {/* <ShinyButton text="View all" className="hover:bg-purple-700" /> */}
                    <Link href={url}>
                    {/* {console.log("data.subCategoryData.products.length--->", subCategoryData.products.length)} */}
                    
                        {subCategoryData.products.length>0 && <Button variant="default" className="ripple px-4 py-2 font-normal tracking-wider rounded-md mm:text-xs cursor-pointer ms:mt-3 ms:text-[16px] ms:px-6 ms:py-2.5 l:px-4 l:py-2 4k:text-2xl group bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white group-hover:font-medium group-hover:text-headupb2b group-hover:from-white group-hover:to-white">
                            
                            View more
                        </Button>}
                    </Link>
                </div>

            </div>
            {show ? (
                <Modal
                    show={show}
                    categoryName={data?.categoryName}
                    setShow={setShow}
                    maxHeight={650}
                    data={
                        <CommonForm
                            setShow={setShow}
                            endPoint={sendEmailToBuy}
                            categoryName={data?.categoryName}
                            productName={selected}
                            categorySlug={subCategoryData?.category?.slug}
                            productSlug={data?.slug}
                        />
                    }
                />
            ) : null}
        </div>
    );
}

export default ProductCard;
