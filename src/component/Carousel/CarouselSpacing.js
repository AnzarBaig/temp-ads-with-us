import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export default function CarouselSpacing({ initialData }) {
  const [data, setData] = useState([]);
  const carouselData = () => {
    const updatedData = initialData.map((ele) => ({
      _id: ele._id,
      categoryName: ele?.categoryName,
      url: ele?.url,
      imageUrl: ele?.imageUrl,
    }));
    setData(updatedData);
  };

  useEffect(() => {
    carouselData();
  }, [initialData]);

  return (
    <div className="flex items-center justify-center">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 4000 })]}
        className=" w-[100%] max-w-6xl"
      >
        <CarouselContent className="-ml-1">
          {data.map((ele, index) => (
            <CarouselItem
              key={index}
              className="p-[0] basis-1/3 md:basis-1/5 mt-2 "
            >
              <Link href={ele.url}>
                <div className="p-1">
                  <Card className="border-0">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <div
                        className={`flex justify-center items-center overylay-image hover:shadow-2xl text-center border transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-white ms:text-[9px] t:text-[11px] ll:text-base 4k:text-xl
                      t:p-1.5 l:p-2.5 4k:p-6  l:font-medium transaction-delay hover:cursor-pointer hover:bg-purple hover:border-headupb2b hover:text-white focus:bg-headupb2b`}
                        style={{
                          backgroundImage: `url('${ele?.imageUrl}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundBlendMode: "multiply",
                          opacity: 0.95,
                        }}
                      >
                        {ele?.categoryName}
                      </div>
                      <style jsx>{`
                        div:hover {
                          z-index: 1;
                        }
                      `}</style>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
