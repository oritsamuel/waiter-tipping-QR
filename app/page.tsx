"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RatingStars from "@/components/RatingStars";
import TipButtons from "@/components/TipButtons";
import TipModal from "@/components/TipModal";

export default function Page() {
  const [tip, setTip] = useState(25);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [phoneError, setPhoneError] = useState("");  

  type Waiter = {
    image?: string;
    name?: string;
    rating?: number;
    phoneNumber?: string;
    company?: {
      logo?: string;
    };
  };

  const [waiter, setWaiter] = useState<Waiter | null>(null);

  const searchParams = useSearchParams();

  const phoneNumber = searchParams.get("phone");
  const companyId = searchParams.get("companyId");

useEffect(() => {
  const fetchWaiter = async () => {
    if (!phoneNumber || !companyId) return;
// https://v7-hulubeje.cnetcommerce.com/api/routing/getcompanyimages?tin=0076217301&branchCode=55915&industryType=1992
    const res = await fetch(
      `https://v7-hulubeje.cnetcommerce.com/api/waiter/get?phoneNumber=${phoneNumber}&companyId=${companyId}`
    );

    const data = await res.json();
    setWaiter(data);
  };

  fetchWaiter();
}, [phoneNumber, companyId]);


  const increase = () => setTip(tip + 5);
  const decrease = () => tip > 0 && setTip(tip - 5);

  return (
    <main className="flex justify-center items-start min-h-screen bg-gray-100 py-10">
      <div className="bg-white w-[350px] rounded-xl shadow-lg p-6 text-center space-y-6 relative">

        {/* Card with logo half in/out */}
        <div className="bg-white border-1 border-yellow-300 rounded-xl shadow-lg pt-14 pb-6 px-4 relative text-center">

          {/* Logo half inside/outside */}
          <img
            src={waiter?.company?.logo || "/logo.png"}    
            className="w-20 h-20 rounded-full absolute -top-10 left-1/2 transform -translate-x-1/2 border-4 border-white"
          />

          {/* Waiter image */}
          <div className="relative flex justify-center mt-4">
            <div className="relative group p-1 rounded-full bg-gradient-to-b from-yellow-200 to-yellow-500 shadow-md">
              <img
                src={waiter?.image || "/waiter1.jpg"}
                className="w-20 h-20 rounded-full cursor-pointer"
                onClick={() => setOpen(true)}
              />
            </div>

            {open && (
              <>
                {/* Click outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpen(false)}
                ></div>

                {/* Expanded circular image */}
                <img
                  src={waiter?.image || "/waiter1.jpg"}
                  className="absolute top-0 z-50 w-72 h-72 rounded-full shadow-xl border-4 border-white"
                />
              </>
            )}
          </div>

          {/* Name */}
          <h2 className="text-lg font-semibold text-black mt-2">
           {waiter?.name}
          </h2>

          {/* Rating in one line */}
         
            <div className="mb-4"> <RatingStars rating={waiter?.rating || 0} /> </div>
            
        
        </div>

        {/* Tip Section */}
        <div className="space-y-2">
          <p className="text-black text-sm text-left">Tip Amount</p>
          <TipButtons setTip={setTip} />

          <p className="text-black text-sm text-left">Enter custom Amount</p>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={decrease}
              className="text-xl text-black font-bold"
            >
              -
            </button>

            <div className="border px-6 text-black py-1 rounded">{tip}</div>

            <button
              onClick={increase}
              className="text-xl text-black font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Rating Section */}
        {/* Rating in one line */}
<div className="flex mt-2 gap-2 items-center">
  <span className="text-black text-sm font-medium">Rating:</span>
  <RatingStars rating={rating} setRating={setRating} />
</div>
        {/* Comment Section */}
        <div className="space-y-2">
          <p className="text-black text-sm text-left">Comment</p>
          <textarea
            rows={1}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border text-black w-full rounded p-2"
          />

          {/* Default comment buttons */}
          <div className="flex gap-2">
            {["Thanks!", "Great service!", "Much appreciated!"].map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => setComment(text)}
                className="text-sm text-yellow-600 bg-white hover:bg-gray-300 text-black px-3 py-1 rounded-full border-1 border-red-300"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* Phone Section */}
       <div className="space-y-1">
  <p className="text-black text-sm text-left">Payment Method</p>

  <div className="flex items-center gap-2">
    <img src="/telebirr.jpg" className="w-7 h-7" />

    <div
      className={`flex items-center border rounded w-full ${
        phoneError ? "border-red-500" : "border-gray-300"
      }`}
    >
      <span className="text-black px-2 border-r">+251</span>

      <input
        value={phone}
        onChange={(e) => {
          let value = e.target.value.replace(/\D/g, "");

          if (value.length <= 9) setPhone(value);

          // remove error while typing
          setPhoneError("");
        }}
        placeholder="9XXXXXXXX"
        className="text-black w-full p-2 outline-none"
      />
    </div>
  </div>

  {phoneError && (
    <p className="text-red-500 text-xs text-left">
      {phoneError}
    </p>
  )}
</div>

        {/* Send Tip Button */}
     <button
  onClick={() => {
    if (phone.length !== 9 || !phone.startsWith("9")) {
      setPhoneError("Enter a valid phone number");
      return;
    }

    setShowModal(true);
  }}
  className="bg-red-600 text-white py-2 rounded w-full hover:bg-red-700"
>
  Send Tip
</button>

      </div>

      <TipModal
  show={showModal}
  onClose={() => setShowModal(false)}
  tip={tip}
  rating={rating}
  comment={comment}
  phone={phone}
  waiterPhoneNumber={waiter?.phoneNumber}
  companyId={companyId}
/>
    </main>
  );
}