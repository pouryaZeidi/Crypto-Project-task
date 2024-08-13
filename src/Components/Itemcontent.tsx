import Link from 'next/link'
import React from 'react'

const Itemcontent = ({item}:{item:any}) => {

  return (
    <Link href={`/${item?.walletAddress}`}
    className='w-full flex-shrink-0 h-[18%] hover:bg-slate-800 cursor-pointer rounded-2xl mt-3 p-3 text-[20px] justify-between md:text-[40px]sm:text-[30px] flex'>
        <h2 className='w-[25%] '>asdasc</h2>
        <h2 className='w-[70%] '>{item?.walletAddress}</h2>
        </Link>
  )
}

export default Itemcontent