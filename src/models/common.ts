export interface ResponseData<T> {
  data: T;
  errors: string[] | null;
  succeeded: boolean;
  message: string;
}

export interface PaginationParams {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface ResultData<T> extends PaginationParams {
  data: T[];
}

export interface QueryParams {
  search?: string;
  pageNumber?: number | string;
  pageSize?: number | string;
  [x: string]: any;
}

export interface TimeStamp {
  createdBy?: any | string;
  createdById?: any | number;
  created?: string;
  lastModifiedBy?: any;
  lastModified?: any;
}

export type PathParams = {
  screen?: string;
  subScreen?: string;
  idHoSo?: string;
};
