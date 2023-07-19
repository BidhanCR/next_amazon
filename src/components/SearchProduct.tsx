import React from "react";
import { ProductProps } from "../../type";
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";

interface Props {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
}
type Item = {
  item: Props;
};
const SearchProduct = ({ item }: Item) => {
  return (
    <div className="flex  items-center gap-4">
      <Image
        src={item.image}
        alt="product image"
        width={96}
        height={96}
        className="w-24"
      />
      <div>
        <p className="text-xs -mb-1">
          {item.brand}_{item.category}
        </p>
        <p className="text-lg font-medium">{item.title}</p>
        <p className="text-xs">{item.description.substring(0, 100)}</p>
        <p className="flex items-center gap-2">
          <span className="text-sm line-through">
            <FormattedPrice amount={item.oldPrice} />
          </span>
          <span className="text-amazon_blue font-semibold">
            <FormattedPrice amount={item.price} />
          </span>
        </p>
      </div>
      <div>
        <p className="text-base font-semibold text-amazon_blue animate-bounce">Save: <FormattedPrice amount={item.oldPrice - item.price}/></p>
      </div>
    </div>
  );
};

export default SearchProduct;
