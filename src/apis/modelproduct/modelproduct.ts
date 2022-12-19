import {ModelProduct} from 'src/models';
import {QueryParams, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const modelProductApi = {
  getAll: (params: QueryParams): Promise<ResultData<ModelProduct>> => {
    const url = '/modelproducts/du-lieu';
    return axiosClient.get(url, {params});
  },
  getOne: (_id: number | string | undefined): Promise<ModelProduct> => {
    const url = `/modelproducts/chi-tiet?id=${_id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<ModelProduct>): Promise<number> => {
    const url = '/modelproducts/tao';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<ModelProduct>): Promise<number> => {
    const url = `/modelproducts/cap-nhat?id=${data?._id}`;
    return axiosClient.put(url, data);
  },
  delete: (_id: number | string): Promise<number> => {
    const url = `/modelproducts/xoa?id=${_id}`;
    return axiosClient.delete(url);
  },
};
export default modelProductApi;
