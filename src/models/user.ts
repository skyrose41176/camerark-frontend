import {TimeStamp} from './common';
export interface User extends TimeStamp {
  _id: string;
  address: string;
  name: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
