import { Gradient } from "@/Contants/constant";
import CustomRipple from "@/component/Form/Button/CustomRipple";
import Image from "next/image";
import React, { forwardRef, useState } from "react";
import Modal from "@/component/Modal/Modal";
import { sendEmailToBuy } from "@/Contants/APIEndpoint";
import CommonForm from "@/component/Form/CommonForm";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Mail, Phone } from "lucide-react";

const Item = forwardRef(
  ({ ele, data, selected, setSelected, showSelected, resultRef }) => {
    const router = useRouter();
    const [show, setShow] = useState("");
    const [categoryName, setCategoryName] = useState(data?.categoryName);
    const [selectedSubcategory, setSelectedSubcategory] = useState(false);

    const handleRaiseQuoteClick = (event) => {
      setShow(true);
    };
    const isProductExists = ele?.products && ele?.products.length > 0;
    console.log("isProductExists------->", isProductExists, "the prodduct name is ", ele);

    const slug = router.query.category;
    const url = isProductExists ? `/${slug}/${ele?.SCSSlug}` : `/${slug}/`+`#`;
    console.log("new data------>", data.subCategory);
    return (
      <div className="w-full">
        <div
          className={`group cursor-pointer card product-card ml:rounded-2xl ms:rounded-2xl ms:text-center l:min-h-[280px] hover:bg-headupb2b hover:text-white`}
          style={selected === ele ? { backgroundColor: "#5E3F99" } : {}}
        >
          <Link href={url}>
            <div
              className="flex item-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={ele?.imageUrl ? ele?.imageUrl : "/defaultImage.jpeg"}
                width={100}
                height={100}
                priority={true}
                className="cursor-pointer ms:rounded-3xl ms:p-3 ms:min-h-[250px] ms:max-h-[250px] t:min-h-[160px] t:max-h-[160px] 4k:min-h-[260px] 4k:max-h-[260px]"
                style={{ width: "100%", objectFit: "cover" }}
                unoptimized={true}
              />
            </div>
          </Link>
          <div className="ms:px-3 ms:pb-2 4k:pb-6">
            <Link href={url}>
              <div
                className={`l:mt-[-10px]`}
                onClick={(e) => e.stopPropagation()}
              >
                <label
                  className={`cursor-pointer font-bold ms:text-xl l:text-[15px] 4k:text-3xl`}
                >
                  {ele?.displayName || ele?.categoryName || ele?.name}
                </label>
              </div>
            </Link>
            <div className="w-full flex flex-row justify-center space-x-4 mt-4">
              <Link href="tel:+917210199772" className="w-1/2">
                <Button
                  variant="default"
                  className="w-full px-4 py-2 font-normal tracking-wider rounded-md mm:text-xs cursor-pointer ms:text-[16px] l:px-4 l:py-2 4k:text-2xl bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white group-hover:font-medium group-hover:text-headupb2b group-hover:from-white group-hover:to-white"
                >
                  <Phone className="mr-2 h-4 w-4" /> Call Us
                </Button>
              </Link>
              <Button
                variant="default"
                className="w-1/2 px-4 py-2 font-normal tracking-wider rounded-md mm:text-xs cursor-pointer ms:text-[16px] l:px-4 l:py-2 4k:text-2xl bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white group-hover:font-medium group-hover:text-headupb2b group-hover:from-white group-hover:to-white"
                onClick={handleRaiseQuoteClick}
              >
                <Mail className="mr-2 h-4 w-4" /> Raise Quote
              </Button>
            </div>
          </div>
          <div className="p-2 mt-4">
            {isProductExists && (
              <Link href={url} className="w-full flex justify-center">
                <Button
                  variant="default"
                  className="w-5/12 px-4 py-2 font-normal tracking-wider rounded-md mm:text-xs cursor-pointer ms:text-[16px] l:px-4 l:py-2 4k:text-2xl group bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white group-hover:font-medium group-hover:text-headupb2b group-hover:from-white group-hover:to-white"
                >
                  View more
                </Button>
              </Link>
            )}
          </div>
        </div>
        {show && (
          <Modal
            show={show}
            categoryName={categoryName}
            setShow={setShow}
            maxHeight={650}
            data={
              <CommonForm
                setShow={setShow}
                endPoint={sendEmailToBuy}
                categoryName={categoryName}
                productName={selected}
                categorySlug={data?.url}
                productSlug={ele?.SCSSlug}
              />
            }
          />
        )}
      </div>
    );
  }
);

export default Item;
