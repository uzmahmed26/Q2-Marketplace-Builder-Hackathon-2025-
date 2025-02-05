"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js"; // Import Stripe type
import { useEffect, useState } from "react";
import { addToCart } from "../addToCart";
import { useAtom } from "jotai";

const CheckoutButton = ({ disabled }: any) => {
  const [stripe, setStripe] = useState<Stripe | null>(null); // Use Stripe type directly
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addCart, setAddToCart] = useAtom(addToCart);

  useEffect(() => {
    // Load Stripe.js with your publishable key
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!).then(
      (loadedStripe) => {
        setStripe(loadedStripe);
      }
    ).catch((error) => {
      console.error("Error loading Stripe:", error);
    });
  }, []);

  const handleCheckout = async () => {
    if (!stripe) {
      console.error("Stripe has not loaded yet!");
      return;
    }

    setIsLoading(true);

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addCart),
    });

    if (!res.ok) {
      console.error("Failed to create checkout session");
      setIsLoading(false);
      return;
    }

    const { sessionId } = await res.json();

    if (sessionId) {
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe Checkout Error:", error);
      }
    } else {
      console.error("No session ID returned from server");
    }

    setIsLoading(false);
  };

  return (
    <button
      className={`${
        !disabled
          ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          : "bg-gray-500 cursor-not-allowed"
      } w-full text-white font-semibold py-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 mt-4`}
      onClick={handleCheckout}
      disabled={!stripe || isLoading || addCart.length === 0 || disabled}
    >
      {isLoading ? (
        <span className="flex justify-center items-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M22 12h-2a8 8 0 0 1-8-8V2" />
          </svg>
          Loading...
        </span>
      ) : (
        "Checkout"
      )}
    </button>
  );
};

export default CheckoutButton;
