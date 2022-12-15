import {TimeStamp} from './common';
export interface User extends TimeStamp {
  _id: string;
  address: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
