import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Itemcontent from './Itemcontent';

const HeroSection = () => {
  const [wallets, setWallets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const renderPagination = () => {
    const pageCount = Math.ceil(wallets.length / rowsPerPage);
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <span
          key={i}
          className={`page-link cursor-pointer mx-1 ${i === currentPage ? 'text-blue-500' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }
    return pages;
  };

  return (
    <div className="p-[10px] rounded-[20px] bg-[rgb(29,30,37)] text-white w-[80%] mx-auto">
      <div className="flex justify-around mb-5">
        <h2 className="text-lg font-bold">Net Profit</h2>
        <h2 className="text-lg font-bold">Wallet Address</h2>
      </div>
      {wallets.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((item, index) => (
        <Itemcontent key={index} item={item} />
      ))}
      <div className="pagination mt-5 flex justify-center">
        {renderPagination()}
      </div>
    </div>
  );
};

export default HeroSection;
