import Image from "next/image";

import BlogCard from "@/components/BlogCard";

const SingleBlogPage = ({ params }: { params: { title: string } }) => {
  const { title } = params;

  const decodedItemName = decodeURIComponent(title);

  return (
    <div className={`flex flex-col items-center justify-center w-full`}>
      <Image
        src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1726832087/Rectangle_34624648_f9mxzj.png"
        alt="titel"
        width={1101}
        height={520}
        className="mt-10"
      />
      <div className="mt-10 md:w-[543px] w-[320px]">
        <p className="text-[24px] font-Clash-Display font-500">
          {decodedItemName}
        </p>
        <p className="text-[12px] text-gray-400 mt-3 font-Sweet-Regular font-400">
          September 15, 2024
        </p>
        <p className="text-[12px] mt-5 text-left leading-[27.84px] text-black font-Sweet-Regular font-400">
          Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla
          pretium lectus phasellus. Magna tellus porta sem viverra at ornare
          enim ante sit. Diam tellus tellus odio donec varius hendrerit
          facilisis vitae massa. Tellus augue eget sit enim blandit faucibus.
          Dolor aliquam lectus tincidunt lacus lorem nam. Elit id aliquet eget
          maecenas id lacinia. Ultrices ullamcorper aliquet fermentum at potenti
          placerat sed sit. Nunc augue aenean amet lobortis mattis curabitur
          risus diam sit. Ipsum pellentesque rhoncus ultrices sollicitudin fusce
          eget mauris tincidunt ipsum.
        </p>
        <p className="text-[12px] mt-5 text-left leading-[27.84px] text-black font-Sweet-Regular font-400">
          Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla
          pretium lectus phasellus. Magna tellus porta sem viverra at ornare
          enim ante sit. Diam tellus tellus odio donec varius hendrerit
          facilisis vitae massa. Tellus augue eget sit enim blandit faucibus.
          Dolor aliquam lectus tincidunt lacus lorem nam. Elit id aliquet eget
          maecenas id lacinia. Ultrices ullamcorper aliquet fermentum at potenti
          placerat sed sit. Nunc augue aenean amet lobortis mattis curabitur
          risus diam sit. Ipsum pellentesque rhoncus ultrices sollicitudin fusce
          eget mauris tincidunt ipsum.
        </p>
        <p className="text-[12px] mt-5 text-left leading-[27.84px] text-black font-Sweet-Regular font-400">
          Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla
          pretium lectus phasellus. Magna tellus porta sem viverra at ornare
          enim ante sit. Diam tellus tellus odio donec varius hendrerit
          facilisis vitae massa. Tellus augue eget sit enim blandit faucibus.
          Dolor aliquam lectus tincidunt lacus lorem nam. Elit id aliquet eget
          maecenas id lacinia. Ultrices ullamcorper aliquet fermentum at potenti
          placerat sed sit. Nunc augue aenean amet lobortis mattis curabitur
          risus diam sit. Ipsum pellentesque rhoncus ultrices sollicitudin fusce
          eget mauris tincidunt ipsum.
        </p>
      </div>
      <p className="text-[24px] font-Clash-Display font-500 mt-10">
        OTHER RELATED POST
      </p>
      <div className="flex justify-center items-center flex-wrap gap-8 my-[50px]">
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
    </div>
  );
};

export default SingleBlogPage;
