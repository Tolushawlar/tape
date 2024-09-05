"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard'
import Pagination from '../components/Pagination';

function TapeBlog() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; // Example total pages

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Add your logic to fetch or display data based on the page
    };
    return (
        <div className='flex flex-col items-center justify-center relative pt-[150px]'>
            <p className='text-[32px] font-[500] text-black font-CLash-Medium'>TAPE BLOG</p>
            <p className='text-[14px] font-normal text-black font-Sweet-Regular py-8'>Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus </p>
            <div className='flex justify-center items-center flex-wrap gap-8 my-10'>
                <BlogCard
                    imageSrc="/image (1).png"
                    title="Classic Knit Box Shirt"
                    date="September 15, 2024"
                    description="Vitae dictumst augue egestas dolor. Commodo aliquam proin posuere massa et. Posuere dui vulputate semper ac. Odio enim egestas molestie netus massa morbi a. Viverra augue id in in consectetur ac vestibulum pellentesque facilisis."
                />
                <BlogCard
                    imageSrc="/image.png"
                    title="New Season Jacket"
                    date="October 1, 2024"
                    description="Aliquam posuere massa et dui vulputate semper ac odio. Vitae dictumst augue egestas dolor. Viverra augue id in in consectetur ac vestibulum pellentesque facilisis."
                />
                <BlogCard
                    imageSrc="/image (1).png"
                    title="Classic Knit Box Shirt"
                    date="September 15, 2024"
                    description="Vitae dictumst augue egestas dolor. Commodo aliquam proin posuere massa et. Posuere dui vulputate semper ac. Odio enim egestas molestie netus massa morbi a. Viverra augue id in in consectetur ac vestibulum pellentesque facilisis."
                />
                <BlogCard
                    imageSrc="/image.png"
                    title="New Season Jacket"
                    date="October 1, 2024"
                    description="Aliquam posuere massa et dui vulputate semper ac odio. Vitae dictumst augue egestas dolor. Viverra augue id in in consectetur ac vestibulum pellentesque facilisis."
                />
            </div>
            <div className="my-10">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default TapeBlog