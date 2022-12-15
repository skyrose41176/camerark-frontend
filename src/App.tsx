import {Close} from '@mui/icons-material';
import moment from 'moment';
import 'moment/locale/vi';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {Suspense, useEffect, useLayoutEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {useRoutes} from 'react-router-dom';
import {IconButtonBase} from './components/base';
import Loading from './components/loading';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {selectAlert, setHiddenAlert} from './redux/slice/alertSlice';
import {routes} from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

moment.locale('vi');
const Noti = () => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const alert = useAppSelector(selectAlert);
  useEffect(() => {
    if (alert.open) {
      enqueueSnackbar(alert.message, {
        variant: alert.type,
        autoHideDuration: 5000,
        action: snackbarId => {
          return (
            <IconButtonBase
              color="inherit"
              size="small"
              iconName={Close}
              onClick={() => {
                closeSnackbar(snackbarId);
              }}
            />
          );
        },
      });
    }
  }, [alert.open]);
  return null;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // staleTime: 1000 * 20,
    },
  },
});
// const Loading = () => (
//   <div className="bg-white w-screen h-screen flex flex-col justify-center items-center">
//     <img src={'/avm/loadingCat1.gif'} alt="loading" />
//   </div>
// );
function App() {
  const dispatch = useAppDispatch();
  const route = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading delay={250} />}>
        <ThemeConfig>
          <GlobalStyles />

          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={(event, reason) => {
              dispatch(setHiddenAlert());
            }}
          >
            <div style={{minHeight: '100vh', backgroundColor: '#fff'}}>
              {route}
              <Noti />
            </div>
          </SnackbarProvider>
        </ThemeConfig>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
