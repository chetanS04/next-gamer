"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Listing } from "@/common/interface";
import axios from "../../utils/axios";

interface PaymentHandlerProps {
  listing: Listing;
  onSuccess?: () => void;
}

type MessageType = "success" | "error" | "info";




export default function PaymentHandler({
  listing,
  onSuccess,
}: PaymentHandlerProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);
  const router = useRouter();

  const handlePayment = async () => {


      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

    setLoading(true);
    setMessage(null);

    try {
      const { data: wallet } = await axios.get("/api/wallet/balance");
      const walletBalance = Number(wallet.balance);
      const totalPrice = Number(listing.price);

      // ✅ Wallet has enough balance
      if (walletBalance >= totalPrice) {
        await axios.post("/api/wallet/pay", {
          amount: totalPrice,
          game_id: listing.id,
          description: `Purchase for ${listing?.game?.name ?? ""}`,
          user_id : user.id
        });

        setMessage({
          type: "success",
          text: "Payment successful! ✅ Paid fully from wallet.",
        });
        onSuccess?.();
        setLoading(false);
        return;
      }

      // ⚠️ Insufficient balance
      setMessage({
        type: "info",
        text: `Insufficient wallet balance. Your balance: ₹${walletBalance}, Required: ₹${totalPrice}`,
      });
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Payment failed! ❌ Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay ₹${listing.price}`}
      </button>

      {message && (
        <div
          className={`p-4 rounded-lg shadow-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : message.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {message.text}
          {message.type === "info" && (
            <div className="mt-2 flex gap-2 justify-end">
              <button
                onClick={() => router.push("/wallet")}
                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Top Up Wallet
              </button>
              <button
                onClick={() => setMessage(null)}
                className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
