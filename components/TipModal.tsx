"use client";

import { useRouter } from "next/navigation";
import RatingStars from "./RatingStars";
import { useState } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  tip: number;
  rating: number;
  comment: string;
  phone: string;
};

export default function TipModal({
  show,
  onClose,
  tip,
  rating,
  comment,
  phone,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleConfirm = async () => {
    setLoading(true);

    try {
      // simulate backend call (replace with real API)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // after backend confirms payment
      router.push("/success");
    } catch (error) {
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-6 w-[320px] text-center shadow-xl">

        {!loading && (
          <>
            <p className="text-black mb-2">
              Are you sure you want to proceed
            </p>

            <h2 className="text-4xl text-black font-bold mb-3">
              {tip} <span className="text-sm font-normal">ETB</span>
            </h2>

            <RatingStars rating={rating} />

            <p className="italic text-black text-sm my-3">
              {comment || " "}
            </p>

            <p className="text-black mb-4">
              {"+251" + phone || "+251"}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </>
        )}

        {loading && (
          <div className="flex flex-col items-center py-6">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mb-4"></div>
            <p className="text-black font-medium">
              Processing payment...
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Please wait while we confirm your payment
            </p>
          </div>
        )}

      </div>
    </div>
  );
}