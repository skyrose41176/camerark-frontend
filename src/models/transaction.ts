import {TimeStamp} from './common';

export interface Transaction extends TimeStamp {
  _id: string;
  modelProductId: string;
  userId: string;
  priceIn: string;
  priceOut: string;
  profit: string;
  createdAt: string;
  updatedAt: string;
}
