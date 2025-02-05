"use client";

import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { useAtom } from "jotai";
import { filterCatogory } from "../store";

const FilterBar = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(filterCatogory);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <main>
      {/* Header Images */}
      <Image
        className="hidden md:block"
        src="/products/frame.png"
        height={209}
        width={1480}
        alt="frame"
      />
      <Image
        className="md:hidden w-full"
        src="/products/Headers.png"
        height={146}
        width={400}
        alt="Header"
      />

      <div className="max-w-[1280px] mx-auto p-4 border-b bg-white flex flex-col md:flex-row justify-between items-center">
        {/* Category Filter */}
        <div className="w-full flex justify-between md:w-auto items-center gap-4">
          <div className="relative">
            <select
              name="category"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="pl-3 pr-8 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              <option value="allProducts">All Products</option>
              <option value="tableware">Tableware</option>
              <option value="decoration-items">Decoration Items</option>
              <option value="tables">Tables</option>
              <option value="chairs">Chairs</option>
              <option value="cutlery">Cutlery</option>
            </select>
            <svg
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Price Filter */}
        <div className="flex items-center gap-2 cursor-pointer mt-4 md:mt-0">
          <span className="text-sm font-medium">Price</span>
          <FaChevronDown className="text-gray-500" />
        </div>

        {/* Brand Filter (Visible on Large Screens) */}
        <div className="hidden lg:flex items-center gap-2 cursor-pointer">
          <span className="text-sm font-medium">Brand</span>
          <FaChevronDown className="text-gray-500" />
        </div>

        {/* Sorting Filter */}
        <div className="w-full md:w-[237px] mt-4 md:mt-0 flex justify-between md:justify-start gap-4 md:gap-0 items-center">
          <span className="text-sm font-medium">Sorting by:</span>
          <div className="w-[154px] flex items-center justify-center gap-1 cursor-pointer">
            <span className="text-sm">Date added</span>
            <FaChevronDown className="text-gray-500" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FilterBar;
