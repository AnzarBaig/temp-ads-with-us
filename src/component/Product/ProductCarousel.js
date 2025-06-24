"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function ProductCarousel({ product }) {
  return (
    <div className="flex-1 w-full md:max-w-[640px] mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 7000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {product?.images?.map((image, index) => (
            <CarouselItem
              key={index}
              className="w-full aspect-[3/2] relative"
            >
              <Image
                src={image}
                fill
                alt={product?.name}
                className="rounded-xl object-cover shadow-2xl"
                priority
                unoptimized
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {product?.images.length > 1 && <CarouselPrevious className="left-0 ml-2 " />}
        {product?.images.length > 1 && <CarouselNext className="right-0 mr-2" />}
      </Carousel>
    </div>
  );
}
