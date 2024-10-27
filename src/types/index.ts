export interface ICartItem {
  id: string;
  quantity: number;
  name: string;
  price: string;
  image?: string;
  description?: string;
  size?: string;
  defaultImage: string;
}
