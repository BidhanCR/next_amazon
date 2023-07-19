import React from "react";
import { ProductProps } from "../../type";
import Image from "next/image";
import {HiShoppingCart} from "react-icons/hi"
import {FaHeart} from "react-icons/fa"
import FormattedPrice from "./FormattedPrice";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from "@/store/nextSlice";
import Link from "next/link";
const Products = ({ productData }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {productData.map(
        ({
          _id,
          title,
          brand,
          category,
          isNew,
          price,
          oldPrice,
          description,
          image,
        }: ProductProps) => (
          <div key={_id} className="bg-white w-full text-black p-4 border border-gray-300 rounded-lg group overflow-hidden">
            <div className="w-full h-[260px] relative">
            <Link href={{pathname:`/${_id}`, query: {
              _id: _id,
              brand: brand,
              image: image, 
              title: title,
              oldPrice: oldPrice,
              price: price,
              isNew: isNew,
              category: category,
              description: description,
            }}}>
            <Image className="w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300" src={image} alt="ProductImage" height={300} width={300}/>
            </Link>
            <div className="w-12 h-24 absolute right-0 bottom-10 border-[1px] bg-white border-gray-400 rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 duration-300 transition-transform">
                <span onClick={()=>dispatch(addToCart({
                  _id: _id,
                  brand: brand,
                  image: image, 
                  title: title,
                  oldPrice: oldPrice,
                  price: price,
                  isNew: isNew,
                  category: category,
                  description: description,
                  quantity: 1,
                }))} className="w-full h-full border-b-[1px] bg-white border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow duration-300 cursor-pointer"><HiShoppingCart/></span>
                <span onClick={()=>dispatch(addToFavorite({
                  _id: _id,
                  brand: brand,
                  image: image, 
                  title: title,
                  oldPrice: oldPrice,
                  price: price,
                  isNew: isNew,
                  category: category,
                  description: description,
                  quantity: 1,
                }))} className="w-full h-full border-b-[1px] bg-white border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow duration-300 cursor-pointer"><FaHeart/></span>
            </div>
            {
                isNew && <p className="absolute top-0 right-0 text-xs font-medium tracking-wide animate-bounce text-amazon_blue">!save <FormattedPrice amount={oldPrice - price}/></p>
            }
            </div>
            <hr />
            <div className="px-4 py-3 flex flex-col gap-1">
                <p className="text-xs text-gray-500 tracking-wide">{category}</p>
                <p className="text-base font-medium">{title}</p>
                <p className="flex items-center gap-2">
                    <span className="text-sm line-through"><FormattedPrice amount={oldPrice}/></span>
                    <span className="text-amazon_blue font-semibold"><FormattedPrice amount={price}/></span>
                </p>
                <p className="text-xs text-gray-600 text-justify">{description.substring(0, 120)}</p>
                <button onClick={()=>dispatch(addToCart({
                  _id: _id,
                  brand: brand,
                  image: image, 
                  title: title,
                  oldPrice: oldPrice,
                  price: price,
                  isNew: isNew,
                  category: category,
                  description: description,
                  quantity: 1,
                }))} className="h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2">Add to Cart</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Products;
