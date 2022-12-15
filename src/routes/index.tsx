import {Container, Typography} from '@mui/material';
import {FC, lazy, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  matchPath,
  Navigate,
  Outlet,
  RouteObject,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Loading from 'src/components/loading';
import {pageNoneAuth} from 'src/constants/pageNoneAuth';
// import DanhSachNhanSuPage from 'src/modules/quan-ly/nhan-su';

import {selectInfoUser, selectJWT, setJwt} from 'src/redux/slice/authSlice';
import {NotFound} from '../components';
// import ThongTinChiTietPage from '../modules/danh-sach-phieu-yeu-cau/chi-tiet-ho-so';
import {useAppDispatch} from '../redux/hooks';
const MainLayout = lazy(() => import('../layouts'));

const DanhSachPhieuYeuCau = lazy(() => import('src/modules/danh-sach-phieu-yeu-cau'));
// const LoaiNghiepVu = lazy(() => import('src/modules/quan-ly/loai-nghiep-vu'));
// const LoaiYeuCau = lazy(() => import('src/modules/quan-ly/loai-yeu-cau'));
// const BoPhan = lazy(() => import('src/modules/quan-ly/bo-phan'));
// const TimKiem = lazy(() => import('src/modules/tim-kiem-phieu-yeu-cau'));
const LoginPage = lazy(() => import('src/modules/auth/login'));

interface AuthProps {
  children: React.ReactNode;
}
const Auth: FC<AuthProps> = ({children}) => {
  const {roles, Email} = useSelector(selectInfoUser);
  const location = useLocation();

  return roles.some(
    role =>
      !!matchPath(
        {
          path: role + '/*',
          caseSensitive: true,
          // end: true,
        },
        location.pathname
      )
  ) ||
    pageNoneAuth({
      roles,
      currentPath: location.pathname,
    }) ? (
    <>{children}</>
  ) : Email ? (
    <Navigate
      to="/403"
      state={{
        from: location,
      }}
      replace
    />
  ) : (
    <Navigate
      to="/401"
      state={{
        from: location,
      }}
      replace
    />
  );
};

const RedirectChiTietPhieuYeuCau: FC<any> = ({children}) => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('phieuYeuCauId');

  if (url) {
    return <Navigate to={`/chi-tiet-ho-so/${url}`} />;
  }
  return <>{children}</>;
};

const TokenPage = () => {
  const {token} = useParams();
  const jwt = useSelector(selectJWT);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(setJwt(token));
    }
  }, [dispatch, token]);

  if (!jwt) {
    return <Loading delay={300} />;
  }
  return (
    <RedirectChiTietPhieuYeuCau>
      <Navigate to="/" />;
    </RedirectChiTietPhieuYeuCau>
  );
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/danh-sach-phieu-yeu-cau" />,
  },
  {
    path: '/token/:token',
    element: <TokenPage />,
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
      // {
      //   path: 'thong-tin-ca-nhan',
      //   element: <ThongTinCaNhanPage />,
      // },
      {
        path: 'danh-sach-phieu-yeu-cau',
        element: <Outlet />,
        children: [
          {index: true, element: <Navigate to="tat-ca" replace />},
          {
            path: ':screen',
            element: <DanhSachPhieuYeuCau />,
            children: [
              {
                path: ':subScreen',
                element: <DanhSachPhieuYeuCau />,
              },
            ],
          },
          {
            path: ':tab/:id',
            element: <h1>chi tiết phiếu yêu cầu</h1>,
          },
        ],
      },
      // {
      //   path: 'tim-kiem',
      //   element: <TimKiem />,
      // },
      // {
      //   path: 'quan-ly',
      //   children: [
      //     {
      //       path: 'loai-nghiep-vu',
      //       element: <LoaiNghiepVu />,
      //     },
      //     {
      //       path: 'loai-yeu-cau',
      //       element: <LoaiYeuCau />,
      //     },
      //     {
      //       path: 'bo-phan',
      //       element: <BoPhan />,
      //     },
      //     {
      //       path: 'danh-sach-nhan-su',
      //       element: <DanhSachNhanSuPage />,
      //     },
      //   ],
      // },
      // {
      //   path: 'chi-tiet-ho-so/:idHoSo',
      //   element: <ThongTinChiTietPage />,
      // },
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
