"use client";

import { useRouter } from "next/navigation";
import RatingStars from "./RatingStars";

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

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-3xl p-6 w-[320px] text-center shadow-xl">

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
          {phone || "+251"}
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              router.push("/success");
            }}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>

        </div>

      </div>

    </div>
  );
}