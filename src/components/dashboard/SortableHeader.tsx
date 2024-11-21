/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SortableHeader: React.FC<{
  column: any;
  title: string;
}> = ({ column, title }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
