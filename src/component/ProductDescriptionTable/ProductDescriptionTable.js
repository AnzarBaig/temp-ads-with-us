import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "../Modal/Modal";
import CommonForm from "../Form/CommonForm";
import { sendEmailToBuy } from "@/Contants/APIEndpoint";

export function ProductDescriptionTable({ productData }) {
  const [show, setShow] = useState("");
  const [categoryName, setCategoryName] = useState(productData?.categor?.name);

  const handleRaiseQuoteClick = (event) => {
    setShow(true);
  };

  const transformedData = productData.specifications?.reduce((acc, spec) => {
    const { tag, key, value } = spec;
    const tagKey = tag || "N/A";
    if (!acc[tagKey]) {
      acc[tagKey] = {};
    }
    acc[tagKey][key] = Array.isArray(value) ? value.join(", ") : value;
    return acc;
  }, {});

  if (!transformedData || Object.keys(transformedData).length === 0) {
    return (
      <p className="text-center text-gray-500">No product data available</p>
    );
  }

  const productTypes = Object.keys(transformedData);
  const allAttributes = Array.from(
    new Set(productTypes.flatMap((type) => Object.keys(transformedData[type])))
  );

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-purple-600 border-x border-gray-300">
                SKU
              </TableHead>
              {allAttributes.map((attribute) => (
                <TableHead
                  key={attribute}
                  className="font-semibold text-purple-600 border-x border-gray-300"
                >
                  {attribute ? attribute : "N/A"}
                </TableHead>
              ))}
              <TableHead className="w-[120px] border-x border-gray-300"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productTypes.map((type) => (
              <TableRow key={type}>
                <TableCell className="font-semibold border-x border-gray-300">
                  {type}
                </TableCell>
                {allAttributes.map((attribute) => (
                  <TableCell
                    key={`${type}-${attribute}`}
                    className="border-x border-gray-300"
                  >
                    {transformedData[type]?.[attribute] ?? "N/A"}
                  </TableCell>
                ))}
                <TableCell className="flex gap-2 border-x border-gray-300 justify-center lg:mb-3">
                  <Button
                    variant="secondary"
                    className="w-full bg-yellow-600 text-white hover:bg-yellow-500 lg:mt-[-22px] mt-3 h-9"
                    onClick={(e) => {
                      handleRaiseQuoteClick();
                    }}
                  >
                    Buy Now
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-full bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white hover:bg-lightHeadsup lg:mt-[-22px] mt-3 h-9"
                    onClick={(e) => {
                      handleRaiseQuoteClick();
                    }}
                  >
                    Sell Now
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
              categorySlug={productData?.category?.slug}
              productSlug={productData?.slug}
            />
          }
        />
      ) : null}
    </div>
  );
}
