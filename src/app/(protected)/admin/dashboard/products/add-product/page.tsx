import { CreateProductForm } from "@/components/dashboard/products/CreateProductForm";
import { AddProductForm } from "@/components/dashboard/products/ProductForm";
import { ScrollArea } from "@/components/ui/scroll-area";

const AddProductPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Products</h2>
      <ScrollArea className="h-full">
        {/* <AddProductForm /> */}
        <CreateProductForm />
      </ScrollArea>
    </div>
  );
};

export default AddProductPage;
