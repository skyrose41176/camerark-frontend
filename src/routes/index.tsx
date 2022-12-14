import {Container, Typography} from '@mui/material';
import {FC, lazy, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  Navigate,
  Outlet,
  RouteObject,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Loading from 'src/components/loading';
import DanhSachGiaoDichPage from 'src/modules/danh-sach-giao-dich';
import DanhSachKhoHangPage from 'src/modules/danh-sach-kho-hang';
import DanhSachUserPage from 'src/modules/danh-sach-nguoi-dung';
import DanhSachSanPhamPage from 'src/modules/danh-sach-san-pham';

import {selectInfoUser, selectJWT, setJwt} from 'src/redux/slice/authSlice';
import {NotFound} from '../components';
import {useAppDispatch} from '../redux/hooks';
const MainLayout = lazy(() => import('../layouts'));
const DanhSachProduct = lazy(() => import('src/modules/danh-sach-san-pham'));
const LoginPage = lazy(() => import('src/modules/auth/login'));

interface AuthProps {
  children: React.ReactNode;
}
const Auth: FC<AuthProps> = ({children}) => {
  const {roles, Email} = useSelector(selectInfoUser);
  const location = useLocation();
  const {token} = useParams();
  const jwt = useSelector(selectJWT);
  return jwt ? <>{children}</> : <Navigate to="/login" />;
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/danh-sach-san-pham" />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: (
      <Auth>
        <MainLayout />
      </Auth>
    ),
    children: [
      {
        path: '/danh-sach-san-pham',
        element: <DanhSachSanPhamPage />,
      },
      {
        path: '/danh-sach-kho-hang',
        element: <DanhSachKhoHangPage />,
      },
      {
        path: '/danh-sach-giao-dich',
        element: <DanhSachGiaoDichPage />,
      },
      {
        path: '/danh-sach-nguoi-dung',
        element: <DanhSachUserPage />,
      },
    ],
  },

  {
    path: '403',
    element: (
      <div className="flex justify-center items-center h-screen text-error font-bold bg-white">
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h3">
            403: Kh??ng c?? quy???n truy c???p
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Vui l??ng li??n h??? ng?????i qu???n tr??? ????? ???????c h??? tr???.
          </Typography>
        </Container>
      </div>
    ),
  },
  {
    path: '401',
    element: (
      <div className="flex justify-center items-center h-screen text-error font-bold bg-white">
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h3">
            401: Phi??n ????ng nh???p h???t h???n
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Vui l??ng t???i l???i trang (nh???n ph??m F5) ho???c ????ng nh???p l???i.
          </Typography>
        </Container>
      </div>
    ),
  },
  {path: '*', element: <NotFound />},
];
