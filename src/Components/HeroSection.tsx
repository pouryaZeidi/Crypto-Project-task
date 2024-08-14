import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Itemcontent from './Itemcontent';

const HeroSection = () => {
  const [wallets, setWallets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://onchain.dextrading.com/valuable_wallets?network=eth&page=1&limit=50');
        setWallets(response.data);
      } catch (error) {
        console.error('Error fetching wallets:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sortedWallets = [...wallets].sort((a, b) => {
    const netProfitA = a.netProfit || 0;
    const netProfitB = b.netProfit || 0;
    return sortDirection === 'desc'
      ? netProfitB - netProfitA
      : netProfitA - netProfitB;
  });

  const pageCount = Math.ceil(sortedWallets.length / rowsPerPage);

  return (
    <div className="p-4 rounded-lg bg-gray-800 text-white justify-between w-4/5 mx-auto">
      <div className="flex mb-4 justify-around items-center">
        <h2 className="text-lg w-[10%] mr-2 font-bold">Net Profit</h2>
        <button
          onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          className="m-3 hover:text-yellow-200"
        >
          Sort by Net Profit {sortDirection === 'asc' ? '(Ascending)' : '(Descending)'}
        </button>
        <h2 className="text-lg ml-[70px] w-[60%] font-bold">Wallet Address</h2>
      </div>
      {sortedWallets.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((item, index) => (
        <Itemcontent key={index} item={item} />
      ))}
      <div className="pagination mt-4 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm mx-2">
          Page {currentPage} of {pageCount}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
          className="px-4 py-2 mx-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
