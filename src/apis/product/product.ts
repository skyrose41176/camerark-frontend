import {Product} from 'src/models';
import {QueryParams, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const productApi = {
  getAll: (params: QueryParams): Promise<ResultData<Product>> => {
    const url = '/products/du-lieu';
    return axiosClient.get(url, {params});
  },
  getOne: (_id: number | string): Promise<Product> => {
    const url = `/products/chi-tiet?id=${_id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<Product>): Promise<number> => {
    const url = '/products/tao';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<Product>): Promise<number> => {
    const url = `/products/cap-nhat${data?._id}`;
    return axiosClient.put(url, data);
  },
  delete: (_id: number | string): Promise<number> => {
    const url = `/products/xoa?id=${_id}`;
    return axiosClient.delete(url);
  },
};
export default productApi;
