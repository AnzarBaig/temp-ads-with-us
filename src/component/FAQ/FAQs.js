import React, { useState } from "react";
import HeaderTitle from "../Header/HeaderTitle";
import SubHeader from "../Header/SubHeader";
import { Language } from "@/locales/Language";
import { getLanguage } from "@/storage/storage";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GradientText } from "@/Contants/constant";

export default function FAQs({ FAQData = [] }) {
  const [selected, setSelected] = useState(null);
  
  const splitFAQs = (data) => {
    const midIndex = Math.ceil(data.length / 2);
    return [data.slice(0, midIndex), data.slice(midIndex)];
  };

  const [faqColumn1, faqColumn2] = splitFAQs(FAQData);

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center">
        <h3 className={`${GradientText} text-transparent bg-clip-text font-bold text-3xl`}>
          FAQs
        </h3>
        <div className="text-center mx-8">
          <SubHeader text="Find the answers to all of our most frequently asked questions" />
        </div>
      </div>

      <Accordion type="single" collapsible value={selected} onValueChange={setSelected}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-2">
          {[faqColumn1, faqColumn2].map((faqs, columnIndex) => (
            <div key={columnIndex}>
              {faqs.map((item, index) => {
                const itemValue = `item-${columnIndex}-${index}`; 
                return (
                  <AccordionItem key={itemValue} value={itemValue} className="border-b-0 my-4 group">
                    <AccordionTrigger
                      className={`px-4 shadow-lg text-md bg-white text-left hover:no-underline ${
                        selected === itemValue ? "rounded-t-xl" : "rounded-xl"
                      }`}
                    >
                      <h2 className="leading-5">{item.question}</h2>
                    </AccordionTrigger>
                    <AccordionContent className="bg-AccordColor p-4 rounded-b-xl">
                      {console.log("item.answer", item.answer)}
                      <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
}
