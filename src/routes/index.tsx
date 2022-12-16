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
        element: <DanhSachSanPhamPage />,
      },
      {
        path: '/danh-sach-giao-dich',
        element: <DanhSachGiaoDichPage />,
      },
      {
        path: '/danh-sach-nguoi-dung',
        element: <DanhSachSanPhamPage />,
      },
    ],
  },

  {
    path: '403',
    element: (
      <div className="flex justify-center items-center h-screen text-error font-bold bg-white">
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h3">
            403: Không có quyền truy cập
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Vui lòng liên hệ người quản trị để được hỗ trợ.
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
            401: Phiên đăng nhập hết hạn
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Vui lòng tải lại trang (nhấn phím F5) hoặc đăng nhập lại.
          </Typography>
        </Container>
      </div>
    ),
  },
  {path: '*', element: <NotFound />},
];
