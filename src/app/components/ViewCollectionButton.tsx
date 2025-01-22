import Link from "next/link";
import React from "react";

const ViewCollectionButton = () => {
  return (
    <Link href="/products">
    <button className="md:w-[170px] w-full px-4 mb-4 h-[56px] bg-[#F9F9F9] text-[#2A254B] font-[400] text-[1rem] leading-6 satoshi tracking-wider hover:bg-[#161b2fe6] hover:text-white mt-4">
View Collections
    </button>
</Link>
  );
};

export default ViewCollectionButton;
