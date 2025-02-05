"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useAtom } from "jotai";
import { addToCart } from "../addToCart";
import { useState } from "react";
import CheckOutButton from "../components/CheckOutButton";

const BillingSummary = () => {
  const [addCart, setAddToCart] = useAtom(addToCart);
  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    paymentMethod: "cashOnDelivery",
  });

  const [errors, setErrors] = useState({
    phoneNumber: false,
    email: false,
  });

  const phoneRegex = /^[0-9]{11}$/; // 11 digit phone number
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

  const isFormValid = () => {
    const { fullName, phoneNumber, email, addressLine1, city } = billingDetails;
    return (
      fullName.trim() !== "" &&
      phoneRegex.test(phoneNumber) &&
      emailRegex.test(email) &&
      addressLine1.trim() !== "" &&
      city.trim() !== ""
    );
  };

  const updatedCart = addCart.map((item) => ({
    ...item,
    totalPrice: item.Quantity * item.price,
  }));

  const totalAmount = updatedCart.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  
    // Validation logic
    if (name === "phoneNumber") {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: !phoneRegex.test(value),
      }));
    }
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: !emailRegex.test(value),
      }));
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden max-w-4xl mx-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2">
          <Link href="/carts" className="text-[#2A254B] hover:text-blue-500">
            <FaArrowLeft className="text-base sm:text-lg" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2A254B]">
            Cart Summary
          </h1>
        </div>
      </div>

      {/* Cart Items */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100 text-[#2A254B] uppercase text-sm">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Quantity</th>
                <th className="py-3 px-4">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {addCart.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-lg">
                    Your Cart Is Empty
                  </td>
                </tr>
              ) : (
                addCart.map((item) => (
                  <tr key={item.slug}>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">${item.price}</td>
                    <td className="py-3 px-4 text-center">{item.Quantity}</td>
                    <td className="py-3 px-4">${item.price * item.Quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Billing Form */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#2A254B]">
            Billing Details
          </h2>
          <form className="space-y-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={billingDetails.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={billingDetails.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">Invalid phone number.</span>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={billingDetails.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Invalid email address.</span>
            )}
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              value={billingDetails.addressLine1}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2 (Optional)"
              value={billingDetails.addressLine2}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={billingDetails.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={billingDetails.paymentMethod === "cashOnDelivery"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={billingDetails.paymentMethod === "stripe"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span>Pay with Stripe</span>
              </label>
            </div>
          </form>

          {/* Checkout Button */}
          {billingDetails.paymentMethod === "stripe" ? (
            <CheckOutButton disabled={!isFormValid()} />
          ) : (
            <Link href={isFormValid() ? "/ordersuccess" : "#"}>
              <button
                onClick={() => isFormValid() && setAddToCart([])}
                className={`w-full mt-6 py-3 text-lg font-semibold rounded-lg ${
                  isFormValid() ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
                } text-white`}
                disabled={!isFormValid()}
              >
                Place Order
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingSummary;
