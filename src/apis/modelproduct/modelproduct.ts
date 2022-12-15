import {ModelProduct} from 'src/models';
import {QueryParams, ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const modelProductApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<ModelProduct>>> => {
    const url = '/modelproducts/du-lieu';
    return axiosClient.get(url, {params});
  },
  getOne: (_id: number | string): Promise<ResponseData<ModelProduct>> => {
    const url = `/modelproducts/chi-tiet?id=${_id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<ModelProduct>): Promise<ResponseData<number>> => {
    const url = '/modelproducts/tao';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<ModelProduct>): Promise<ResponseData<number>> => {
    const url = `/modelproducts/cap-nhat${data?._id}`;
    return axiosClient.put(url, data);
  },
  delete: (_id: number | string): Promise<ResponseData<number>> => {
    const url = `/modelproducts/xoa?id=${_id}`;
    return axiosClient.delete(url);
  },
};
export default modelProductApi;
