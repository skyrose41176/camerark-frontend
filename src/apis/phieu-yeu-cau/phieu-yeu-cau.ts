import {CountHopThuInside, CountPyc, DinhKemKetQua, PhieuYeuCau} from 'src/models';
import {QueryParams, ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const phieuYeuCauApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<PhieuYeuCau>>> => {
    const url = '/PhieuYeuCau';
    return axiosClient.get(url, {params});
  },
  search: (
    params: QueryParams & {
      maYc?: string;
      loaiYeuCauId?: number;
      loaiNghiepVuId?: number;
      created?: string;
      createdBy?: string;
      nguoiXuLy?: string;
    }
  ): Promise<ResponseData<ResultData<PhieuYeuCau>>> => {
    const url = '/PhieuYeuCau/Search';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<PhieuYeuCau>> => {
    const url = `/PhieuYeuCau/${id}`;
    return axiosClient.get(url);
  },
  count: (): Promise<ResponseData<CountPyc>> => {
    const url = `/PhieuYeuCau/count`;
    return axiosClient.get(url);
  },
  countHopThu: (params: {screen: string}): Promise<ResponseData<CountHopThuInside>> => {
    const url = `/PhieuYeuCau/countHopThu`;
    return axiosClient.get(url, {params});
  },
  create: (data: Partial<PhieuYeuCau>): Promise<ResponseData<number>> => {
    const url = '/PhieuYeuCau';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<PhieuYeuCau>): Promise<ResponseData<number>> => {
    const url = `/PhieuYeuCau/${data?.id}`;
    return axiosClient.put(url, data);
  },
  updateStatus: (data: {
    id: number;
    type: string;
    role: string;
    noiDung?: string;
    xuLy?: string;
    tenNhanSu?: string;
    tenDonVi?: string;
    chucVu: string;
    dinhKemKetQuas?: DinhKemKetQua[];
  }): Promise<ResponseData<number>> => {
    const url = `/PhieuYeuCau/update-status/${data.id}`;
    return axiosClient.put(url, data);
  },
  dongPyc: (data: {
    id: number;
    noiDung?: string;
    tenNhanSu?: string;
    tenDonVi?: string;
    chucVu: string;
  }): Promise<ResponseData<number>> => {
    const url = `/PhieuYeuCau/dong-pyc/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/PhieuYeuCau/${id}`;
    return axiosClient.delete(url);
  },
};
export default phieuYeuCauApi;
