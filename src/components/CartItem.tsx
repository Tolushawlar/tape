import Image from "next/image";
import { ICartItem } from "@/types";

interface CartItemProps {
  item: ICartItem;
  removeFromCart: (itemId: string) => void;
}

const CartItem = ({ item, removeFromCart }: CartItemProps) => {
  return (
    <div className="flex flex-row items-center justify-start gap-10 mt-10 w-full">
      {/* Render item image */}
      <Image
        src={item.defaultImage}
        width={87.7}
        height={86.93}
        alt={item.name}
      />

      <div className="flex flex-col items-start justify-start h-[88.46px]">
        {/* Render item name */}
        <p className="font-CLash-Regular font-[600] text-[16px] leading-[14px] text-left">
          {item.name}
        </p>

        {/* Render item size */}
        <p className="text-[10px] font-normal font-Sweet-Regular mt-3 mb-5 text-left">
          Size: {item.size}
        </p>

        <div className="flex flex-row items-center justify-between gap-6">
          <div className="flex flex-row items-center justify-center gap-2">
            {/* Quantity controls */}
            <p className="font-normal font-Sweet-Regular text-[14px] cursor-pointer">
              -
            </p>
            <p className="font-normal font-Sweet-Regular text-[14px]">
              {item.quantity}
            </p>
            <p className="font-normal font-Sweet-Regular text-[14px] cursor-pointer">
              +
            </p>
          </div>

          {/* Render item price */}
          <p className="font-CLash-Regular font-[600] text-[14px] ml-[100px]">
            €{item.price}
          </p>
        </div>

        {/* Remove button */}
        <button
          className="mt-4 text-red-500 text-sm"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
