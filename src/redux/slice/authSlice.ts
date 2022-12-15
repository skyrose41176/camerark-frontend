import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import jwtDecode from 'jwt-decode';
// Define a type for the slice state

export interface InfoUser {
  sub: string;
  jti: string;
  Email: string;
  Id: string;
  uid: string;
  ip: string;
  ten: string;
  maNs: string;
  donVi: string;
  phongBan: string;
  ChucVu: string;
  TenNhanVien: string;
  name: string;
  phone: string;
  user: any;
  sdt: string;
  roles: string[];
  exp: number;
  iss: string;
  aud: string;
  anhDaiDien: string;
  tdv: any;
}

interface Auth {
  token: string;
  info: InfoUser;
}

// Define the initial state using that type
const initialState = {
  token: '',
  info: {
    sub: '',
    jti: '',
    Email: '',
    uid: '',
    ip: '',
    TenNhanVien: '',
    ten: '',
    maNs: '',
    donVi: '',
    phongBan: '',
    ChucVu: '',
    Id: '',
    sdt: '',
    roles: [],
    exp: 0,
    iss: '',
    aud: '',
    anhDaiDien: '',
    tdv: null,
    name: '',
    phone: '',
    user: null,
  },
} as Auth;

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setJwt: (state: Auth, action: PayloadAction<string | null>) => {
      console.log(action);

      const token = action.payload;
      if (token) {
        try {
          const info: InfoUser = jwtDecode(token);

          state.token = token;
          state.info = {
            ...info,
            roles: Array.isArray(info.roles) ? info.roles : info.roles ? [info.roles] : [],
          };
        } catch (error) {
          alert('Lỗi đọc token');
        }
      } else {
        return (state = initialState);
      }
    },
    setInfoUser: (state: Auth, action: PayloadAction<InfoUser>) => {
      const user = action.payload;
      state.info = {...state.info, ...user};
    },
    setRoles: (state: Auth, action: PayloadAction<string[]>) => {
      state.info.roles = action.payload;
    },
  },
});

export const {setJwt, setInfoUser, setRoles} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectJWT = (state: RootState) => state.auth.token;
export const selectInfoUser = (state: RootState) => state.auth.info;
