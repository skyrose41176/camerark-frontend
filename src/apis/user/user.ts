import {User} from 'src/models';
import {QueryParams, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const userApi = {
  getAll: (params: QueryParams): Promise<ResultData<User>> => {
    const url = '/users/du-lieu';
    return axiosClient.get(url, {params});
  },
  getOne: (_id: number | string): Promise<User> => {
    const url = `/users/chi-tiet?id=${_id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<User>): Promise<number> => {
    const url = '/users/tao';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<User>): Promise<number> => {
    const url = `/users/cap-nhat?id=${data?._id}`;
    return axiosClient.put(url, data);
  },
  delete: (_id: number | string): Promise<number> => {
    const url = `/users/xoa?id=${_id}`;
    return axiosClient.delete(url);
  },
};
export default userApi;
