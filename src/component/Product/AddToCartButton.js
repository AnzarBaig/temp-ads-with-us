"use client";

import { useToast } from "@/components/ui/use-toast";
import { useCartStore } from "@/store/useCartStore";
import { Mail, Phone, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@radix-ui/react-toast";
import Modal from "../Modal/Modal";
import { useState } from "react";
import CommonForm from "../Form/CommonForm";
import { sendEmailToBuy } from "@/Contants/APIEndpoint";

export default function AddToCartButton({ product }) {
  const [show, setShow] = useState("");
  const [categoryName, setCategoryName] = useState(product?.categor?.name);
  const { toast } = useToast();
  const { addToCart, cart } = useCartStore();
  const router = useRouter();

  const productName = product?.name;

  const cartProduct = {
    ...product,
  };

  const handleRaiseQuoteClick = (event) => {
    setShow(true);
  };

  const productInCart = cart.find((item) => item.id === product?.id);

  const handleCallUs = () => {
    // addToCart(cartProduct);
    // toast({
    //     description: "Your message has been sent.",
    // })
    router.push("tel:+917210199772");
  };

  const handleBuyNow = () => {
    if (productInCart?.quantity === undefined) {
      addToCart(cartProduct);
    }
    router.push("/cart");
  };

  return (
    <>
      <div className="flex space-x-6 mt-6">
        {/* <Button
                    onClick={handleAddToCart}
                    variant="secondary"
                    className="relative w-full rounded-full border transition duration-100 active:scale-9 py-6"
                >
                    <PlusIcon className="absolute left-0 ml-4 h-6 w-6" />
                    Add to Cart
                </Button> */}

        {/* <Link href="tel:+917210199772"> */}
        <Button
          variant="expandIcon"
          className="relative w-full bg-gradient-to-b from-[#402A6F] to-[#5E3F99] border transition duration-100 rounded-lg active:scale-9 py-6"
          Icon={Phone}
          iconPlacement="right"
          onClick={handleCallUs}
        >
          Call Us
        </Button>
        {/* </Link> */}
        {/* <Button
                    onClick={handleBuyNow}
                    variant="default"
                    className="relative w-full rounded-full border transition duration-100 active:scale-95 py-6"
                >
                    Raise Quote
                </Button> */}

        <Button
          variant="expandIcon"
          className="relative w-full bg-gradient-to-b from-[#402A6F] to-[#5E3F99] border transition duration-100 rounded-lg active:scale-95 py-6 "
          Icon={Mail}
          iconPlacement="right"
          onClick={(e) => {
            // e.stopPropagation();
            handleRaiseQuoteClick();
          }}
        >
          Buy Now
        </Button>
      </div>
      {show !== "" ? (
        <Modal
          show={show}
          categoryName={categoryName}
          setShow={setShow}
          maxHeight={650}
          data={
            <CommonForm
              setShow={setShow}
              endPoint={sendEmailToBuy}
              categorySlug={product?.category?.slug}
              productSlug={product?.slug}
            />
          }
        />
      ) : null}
    </>
  );
}
