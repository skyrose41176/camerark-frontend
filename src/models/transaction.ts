import {TimeStamp} from './common';
import {ModelProduct, Product} from './product';

export interface Transaction extends TimeStamp {
  _id: string;
  modelProductId: string;
  nameCustomer: string;
  phoneCustomer: string;
  priceIn: string;
  priceOut: string;
  profit: string;
  createdAt: string;
  content: string;
  product: Product;
  modelProduct: ModelProduct;
  updatedAt: string;
}
