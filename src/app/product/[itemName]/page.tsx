import CollectionSection from "@/components/CollectionSection";
import Product from "@/components/Product";

import { itemsData } from "@/constants";

const SingleProductPage = ({ params }: { params: { itemName: string } }) => {
  const { itemName } = params;

  return (
    <div className="overflow-x-hidden">
      <div className={`flex flex-col items-center justify-center}`}>
        <div className="flex flex-col items-center w-full max-w-[1200px]">
          <Product productName={itemName} />
          <CollectionSection
            collectionName="RELATED PRODUCTS"
            itemsData={itemsData}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
