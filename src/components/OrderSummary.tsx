import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const OrderSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          In Your Cart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative h-20 w-20 overflow-hidden rounded">
              <Image
                src="/placeholder.svg"
                alt="Product image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Item</h3>
              <p className="text-sm text-gray-500">Size: XS</p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-6 w-6">
                  <Minus className="h-3 w-3" />
                </Button>
                <span>2</span>
                <Button variant="outline" size="icon" className="h-6 w-6">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">£41,000.00</p>
              <button className="text-sm text-red-500">Remove</button>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal (2 items)</span>
              <span className="font-semibold">£77,000.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">£7,000.00</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>£7,000.00</span>
            </div>
            <p className="text-sm text-gray-500  text-right">
              Including £4,918.60 in taxes
            </p>
          </div>

          <div className="pt-4 flex gap-3">
            <Input placeholder="Enter discount code" />
            <Button type="button" className="bg-blue-600 uppercase">
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
