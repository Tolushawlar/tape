"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  imageSrc: string;
  title: string;
  description: string;
  date: string;
}

const BlogCard = ({ imageSrc, title, description, date }: BlogCardProps) => {
  const { push } = useRouter();
  const navigateToSingleBlog = () => {
    push(`/singleBlog/${encodeURIComponent(title)}`);
  };

  return (
    <div
      onClick={navigateToSingleBlog}
      className="flex flex-col items-start justify-start md:w-[547px] w-[320px] h-[413px] max-h-[413px] cursor-pointer"
    >
      <Image
        src={imageSrc}
        width={547}
        height={242}
        className="h-[242px] max-h-[242px] md:w-[547px] w-[450px]"
        alt="BlogImage"
      />
      <p className="font-[500] font-CLash-Regular text-[16px] text-black mt-6">
        {title}
      </p>
      <p className="text-[12px] font-normal text-black font-Sweet-Regular opacity-50 mt-4">
        {date}
      </p>
      <p className="leading-[27.8px] text-[12px] font-normal font-Sweet-Regular mt-3">
        {description}
      </p>
    </div>
  );
};

export default BlogCard;
