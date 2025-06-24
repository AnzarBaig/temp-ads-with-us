import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ProductCarousel from "./ProductCarousel";
import AddToCartButton from "./AddToCartButton";

export default function ProductDetailCard({ product }) {
  // Calculate discount percentage
  const calculateDiscount = () => {
    if (product?.mrp && product?.sellingPrice) {
      const discount =
        ((product.mrp - product.sellingPrice) / product.mrp) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <section className="flex w-full flex-col items-start py-4 md:flex-row">
      <ProductCarousel product={product} />
      <div className="flex w-full flex-col space-y-2 px-0 py-2 md:w-1/2 md:px-4 lg:px-12 mt-9">
        <h1 className="text-xl font-bold md:text-2xl">{product?.name}</h1>

        {/* Updated price display section */}
        <div className="flex flex-col space-y-1">
          {product?.sellingPrice ? (
            <>
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium text-black/60">Price</span>
                <span className="text-lg font-medium text-black">
                  ₹{product.sellingPrice}
                </span>
                {product.mrp && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      MRP: ₹{product.mrp}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {calculateDiscount()}% off
                    </span>
                  </>
                )}
              </div>
              <span className="text-xs text-foreground/40">(Plus GST)</span>
            </>
          ) : (
            <span className="text-lg font-medium text-black">
              Raise quote to know the price
            </span>
          )}
        </div>

        <Table>
          {/* <TableBody>
                        {product?.specifications?.map(spec => (
                            <TableRow key={spec._id}>
                                <TableCell className="font-semibold">{spec.key}:</TableCell>
                                <TableCell>{Array.isArray(spec.value) ? spec.value.join(', ') : spec.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody> */}
        </Table>
        <div className="pt-2">
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}
