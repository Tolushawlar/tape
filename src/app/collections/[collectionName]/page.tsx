import ImageCard from "@/components/ItemsCard";
import { itemsData } from "@/constants";

const CollectionPage = ({ params }: { params: { collectionName: string } }) => {
  const { collectionName } = params;

  const decodedCollectionName = decodeURIComponent(collectionName);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="font-[600] md:text-[32px] text-[30px] font-CLash-Regular">
          {decodedCollectionName}
        </p>
        <p className="font-[400] text-[14px] font-Sweet-Regular text-center md:w-[692px] w-[300px] h-[59px] md:mb-0 mb-10">
          Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla
          pretium lectus phasellus. Magna tellus porta sem viverra at ornare
          enim ante sit. Diam tellus tellus odio donec varius hendrerit
          facilisis vitae massa.
        </p>
      </div>

      {/* Render specific collection items here */}
      <div className="flex flex-wrap justify-center gap-6 mt-10 mb-10">
        {itemsData.map((item, index) => (
          <ImageCard
            key={index}
            id={item.id}
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
            id={item.id}
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
