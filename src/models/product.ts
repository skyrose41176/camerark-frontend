import {TimeStamp} from './common';
export interface Product extends TimeStamp {
  _id: string;
  name: string;
  brand: string;
  status: boolean;
}
export interface ModelProduct extends TimeStamp {
  _id: string;
  productId: string;
  dateAdd: string;
  priceAdd: string;
  model: string;
  isSold: boolean;
  createdAt: string;
  updatedAt: string;
}
