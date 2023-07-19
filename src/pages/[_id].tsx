import FormattedPrice from "@/components/FormattedPrice";
import { addToCart, addToFavorite } from "@/store/nextSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";

const DynamicPage = () => {
  const [product, setProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setProduct(router.query);
  }, [router.query]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-10">
      {isLoading ? (
        <div className="w-full flex items-center flex-col gap-6 py-20">
            <p>Your product is loading...</p>
            <BeatLoader color="#131921" size={40} />
        </div>
      ) : (
        <div className="w-full grid md:grid-cols-3 gap-3 rounded-lg bg-gray-100">
          <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
            <Image
              src={product.image}
              alt="product image"
              height={500}
              width={500}
            />
            <div className="w-12 h-24 absolute right-0 bottom-10 border-[1px] bg-white border-gray-400 rounded-md flex flex-col translate-x-20 group-hover:-translate-x-2 duration-300 transition-transform">
              <span
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: product._id,
                      brand: product.brand,
                      image: product.image,
                      title: product.title,
                      oldPrice: product.oldPrice,
                      price: product.price,
                      isNew: product.isNew,
                      category: product.category,
                      description: product.description,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b-[1px] bg-white border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow duration-300 cursor-pointer"
              >
                <HiShoppingCart />
              </span>
              <span
                onClick={() =>
                  dispatch(
                    addToFavorite({
                      _id: product._id,
                      brand: product.brand,
                      image: product.image,
                      title: product.title,
                      oldPrice: product.oldPrice,
                      price: product.price,
                      isNew: product.isNew,
                      category: product.category,
                      description: product.description,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b-[1px] bg-white border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow duration-300 cursor-pointer"
              >
                <FaHeart />
              </span>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col justify-center p-4 gap-3">
            <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
              {product.category}_{product.brand}
            </p>
            <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
              {product.title}
            </h1>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="text-base text-gray-600 flex items-center gap-1">
              Price:{" "}
              <span className="text-lg font-semibold text-amazon_blue">
                <FormattedPrice amount={product.price} />
              </span>
              <span className="ml-1 line-through">
                <FormattedPrice amount={product.oldPrice} />
              </span>
            </div>
            <p className="text-sm text-gray-500 flex gap-1 items-center">
              Your saved:{" "}
              <span>
                <FormattedPrice amount={product.oldPrice - product.price} />
              </span>
            </p>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: product._id,
                    brand: product.brand,
                    image: product.image,
                    title: product.title,
                    oldPrice: product.oldPrice,
                    price: product.price,
                    isNew: product.isNew,
                    category: product.category,
                    description: product.description,
                    quantity: 1,
                  })
                )
              }
              className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue divide-fuchsia-300 rounded-lg mt-5 text-base font-semibold"
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPage;
