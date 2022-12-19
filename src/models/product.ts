import {TimeStamp} from './common';
export interface Product extends TimeStamp {
  _id: string;
  name: string;
  brand: string;
  status: boolean;
  content: string;
}
export interface ModelProduct extends TimeStamp {
  _id: string;
  productId: string;
  product: Product;
  dateAdd: string;
  priceAdd: string;
  model: string;
  content: string;
  isSold: boolean;
  createdAt: string;
  updatedAt: string;
}
