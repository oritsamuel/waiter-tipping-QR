"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {

  const router = useRouter();
  useEffect(() => {
    // Trigger confetti when component mounts
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-center px-6">

      {/* Green circle */}
      <div className="w-56 h-56 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
        Thank You!
      </div>

      <p className="text-white mt-6 max-w-sm">
        We've successfully confirmed your payment. You will receive sms confirmation shortly.
      </p>

      <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">

        <button
          onClick={() => router.push("/orders")}
          className="bg-red-500 text-white py-3 rounded-full"
        >
          View Receipt
        </button>


      </div>

    </main>
  );
}