import React, { useEffect, useState } from "react";
import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from "./FormattedPrice";
import {  useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
const Payment = () => {
  const { productData, userInfo } = useSelector((state: StateProps) => state.next);
 
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let amn = 0;
    productData.map((item: StoreProduct) => {
      amn += item.price * item.quantity;
      return;
    });
    setTotalAmount(amn);
  }, [productData]);

  // stripe payment
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const {data:session} = useSession();

  const handleCheckOut = async() => {
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({items:productData, email: session?.user?.email})
    });
    const checkoutSession = await response.json();
    const result:any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id,
    })
    if(result.error){
      alert(result?.error.message)
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span className="bg-green-600 rounded-full p-1 w-6 h-6 text-sm flex justify-center items-center text-white mt-1">
          <SiMediamarkt />
        </span>
        <p className="text-sm">
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details....
        </p>
      </div>
      <p className="flex items-center justify-between px-2 font-semibold">
        Total:{" "}
        <span className="text-xl font-bold">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>
      {userInfo ? <div className="flex flex-col items-center">
        <button onClick={handleCheckOut} className="w-full h-10 text-sm font-semibold bg-amazon_blue text-white rounded-lg hover:bg-amazon_yellow hover:text-black">
          Proceed to Buy
        </button>
      </div> : <div className="flex flex-col items-center">
        <button className="w-full h-10 text-sm font-semibold bg-amazon_blue text-white rounded-lg cursor-not-allowed">
          Proceed to Buy
        </button>
        <p className="text-xs  mt-2 text-red-500 font-semibold animate-bounce">
          Please Login to continue
        </p>
      </div>}
    </div>
  );
};

export default Payment;
