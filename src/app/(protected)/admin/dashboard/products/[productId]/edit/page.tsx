import { EditProductForm } from "@/components/dashboard/products/EditProductForm";
import { ScrollArea } from "@/components/ui/scroll-area";

const EditProductPage = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  console.log({ productId });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Products</h2>
      <p className="text-muted-foreground">Edit Product</p>
      <ScrollArea className="h-full">
        <EditProductForm />
      </ScrollArea>
    </div>
  );
};

export default EditProductPage;
