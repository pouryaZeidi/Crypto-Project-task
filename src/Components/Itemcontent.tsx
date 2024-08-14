import Link from 'next/link';
import React from 'react';

const Itemcontent = ({ item }: { item: any }) => {
  const walletAddress = item?.walletAddress || '';


  const shortenedWalletAddress = walletAddress.length > 16
    ? `${walletAddress.slice(0, 12)}...${walletAddress.slice(-6)}`
    : walletAddress;

  return (
    <Link
      href={`/${item?.walletAddress}`}
      className="w-full flex-shrink-0 h-[18%] hover:bg-slate-800 cursor-pointer rounded-2xl mt-3 p-3 flex items-center">
    
      <h2 className="w-[25%] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mr-10 text-blue-300">
        {item?.netProfit}
      </h2>
      <h2 className="w-[70%] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ml-4">
        <span className="hidden sm:inline">{walletAddress}</span>
        <span className="sm:hidden">{shortenedWalletAddress}</span>
      </h2>
    </Link>
  );
};

export default Itemcontent;
