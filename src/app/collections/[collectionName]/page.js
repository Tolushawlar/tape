"use client";
import { useParams } from 'next/navigation';
import React from 'react';
import ImageCard from '../../components/ItemsCard';
import { useGlobalState } from '../../../../GlobalStateContext';


const itemsData = [
    {
        name: "Dope Like Coke Tee",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "₦35,000.00",
    },
    {
        name: "Cool Summer Shirt",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545533/cardImage3_j4z4fg.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image5_aa1sje.png",
        price: "₦40,000.00",
    },
    {
        name: "Dope Like Coke Tee",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545538/image9_kdgq90.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "₦35,000.00",
    },
    {
        name: "Cool Summer Shirt",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545539/image11_a1lhru.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "₦40,000.00",
    },
];

const CollectionPage = () => {
    const { globalState, setGlobalState } = useGlobalState();
    const { collectionName } = useParams(); // Correctly access the collection name using useParams
    // Decode the URL-encoded collection name to a readable format
    const decodedCollectionName = decodeURIComponent(collectionName);

    // Filter items based on the collection name or other criteria
    // const filteredItems = itemsData.filter(item => item.collection === decodedCollectionName);

    return (
        <div className={`${globalState ? "fixed" : ""} `}>
            <div className="flex flex-col items-center justify-center gap-5">
                <p className='font-[600] text-[32px] font-CLash-Regular'>{decodedCollectionName}</p>
                <p className='font-[400] text-[14px] font-Sweet-Regular text-center w-[692px] h-[59px]'>
                    Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus.
                    Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus odio donec varius
                    hendrerit facilisis vitae massa.
                </p>
            </div>

            {/* Render specific collection items here */}
            <div className='flex flex-wrap justify-center gap-6 mt-10 mb-10'>
                {itemsData.map((item, index) => (
                    <ImageCard
                        key={index}
                        name={item.name}
                        defaultImage={item.defaultImage}
                        hoverImage={item.hoverImage}
                        price={item.price}
                        itemName={item.name}
                    />
                ))}
                {itemsData.map((item, index) => (
                    <ImageCard
                        key={index}
                        name={item.name}
                        defaultImage={item.defaultImage}
                        hoverImage={item.hoverImage}
                        price={item.price}
                        itemName={item.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default CollectionPage;
