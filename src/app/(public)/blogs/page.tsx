"use client";

import { useState } from "react";

import BlogCard from "@/components/BlogCard";
import BlogPagination from "@/components/Pagination";

const TapeBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add your logic to fetch or display data based on the page
  };

  return (
    <div>
      <div
        className={`flex flex-col items-center justify-center relative pt-[50px]`}
      >
        <p className="text-[32px] font-[500] text-black font-CLash-Medium">
          TAPE BLOG
        </p>
        <p className="text-[14px] font-normal text-black font-Sweet-Regular py-8 md:w-auto w-[300px]">
          Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla
          pretium lectus{" "}
        </p>
        <div className="flex justify-center items-center flex-wrap gap-8 my-10">
          <BlogCard
            imageSrc="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545892/image_1_vhyzms.png"
            title="Classic Knit Box Shirt"
            date="September 15, 2024"
            description="Vitae dictumst augue egestas dolor. Commodo aliquam proin posuere massa et. Posuere dui vulputate semper ac. Odio enim egestas molestie netus massa morbi a. Viverra augue id in in consectetur ac vestibulum pellentesque facilisis."
          />
          <BlogCard
            imageSrc="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545953/image_ag4vjq.png"
            title="New Season Jacket"
            date="October 1, 2024"
            description="Aliquam posuere massa et dui vulputate semper ac odio. Vitae dictumst augue egestas dolor. Viverra augue id in in consectetur ac vestibulum pellentesque facilisis."
          />
          <BlogCard
            imageSrc="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545892/image_1_vhyzms.png"
            title="Classic Knit Box Shirt"
            date="September 15, 2024"
            description="Vitae dictumst augue egestas dolor. Commodo aliquam proin posuere massa et. Posuere dui vulputate semper ac. Odio enim egestas molestie netus massa morbi a. Viverra augue id in in consectetur ac vestibulum pellentesque facilisis."
          />
          <BlogCard
            imageSrc="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545953/image_ag4vjq.png"
            title="New Season Jacket"
            date="October 1, 2024"
            description="Aliquam posuere massa et dui vulputate semper ac odio. Vitae dictumst augue egestas dolor. Viverra augue id in in consectetur ac vestibulum pellentesque facilisis."
          />
        </div>
        <div className="my-10">
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TapeBlog;
