import {User} from 'src/models';
import {QueryParams, ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const userApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<User>>> => {
    const url = '/users/du-lieu';
    return axiosClient.get(url, {params});
  },
  getOne: (_id: number | string): Promise<ResponseData<User>> => {
    const url = `/users/chi-tiet?id=${_id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<User>): Promise<ResponseData<number>> => {
    const url = '/users/tao';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<User>): Promise<ResponseData<number>> => {
    const url = `/users/cap-nhat${data?._id}`;
    return axiosClient.put(url, data);
  },
  delete: (_id: number | string): Promise<ResponseData<number>> => {
    const url = `/users/xoa?id=${_id}`;
    return axiosClient.delete(url);
  },
};
export default userApi;
