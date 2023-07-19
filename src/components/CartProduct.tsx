import Image from "next/image";
import React from "react";
import FormattedPrice from "./FormattedPrice";
import { LuMinus, LuPlus } from "react-icons/lu";
import {IoMdClose} from "react-icons/io"
import { useDispatch } from "react-redux";
import { decreaseQuantity, deleteProduct, increaseQuantity } from "@/store/nextSlice";
interface Item {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
  quantity: number;
}

interface CartProductProps {
  item: Item;
}
const CartProduct = ({ item }: CartProductProps) => {
  const dispatch = useDispatch()
    return (
    <div className="bg-gray-100 rounded-lg flex items-center gap-4">
      <Image height={150} width={150} src={item.image} alt="productImage" />
      <div className="flex items-center px-2 gap-4">
        <div className="flex flex-col gap-1 ">
          <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span className="text-lg font-semibold text-amazon_blue">
              <FormattedPrice amount={item.price} />
            </span>
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-between mt-1 border border-gray-300 px-2 py-1 rounded-full shadow-lg w-28 shadow-gray-300">
            <span onClick={()=>dispatch(decreaseQuantity({
                  _id: item._id,
                  brand: item.brand,
                  image: item.image, 
                  title: item.title,
                  oldPrice: item.oldPrice,
                  price: item.price,
                  isNew: item.isNew,
                  category: item.category,
                  description: item.description,
                  quantity: 1,
                }))} className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300">
              <LuMinus />
            </span>
            <span>{item.quantity}</span>
            <span onClick={()=>dispatch(increaseQuantity({
                  _id: item._id,
                  brand: item.brand,
                  image: item.image, 
                  title: item.title,
                  oldPrice: item.oldPrice,
                  price: item.price,
                  isNew: item.isNew,
                  category: item.category,
                  description: item.description,
                  quantity: 1,
                }))} className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300">
              <LuPlus />
            </span>
            </div>
            <div onClick={()=> dispatch(deleteProduct(item._id))} className="flex items-center font-medium text-sm text-gray-400 hover:text-red-600 cursor-pointer duration-300">
                <IoMdClose className="mt-[2px]"/> Remove
            </div>
          </div>
        </div>
        <div className="text-lg font-semibold text-amazon_blue">
            <FormattedPrice amount={item.price * item.quantity}/>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
