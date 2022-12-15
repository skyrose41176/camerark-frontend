import {Card} from '@mui/material';
import axios from 'axios';
import {useSnackbar} from 'notistack';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {useLocation, useNavigate} from 'react-router-dom';
import {ButtonBase} from 'src/components/base';
import {InputField} from 'src/components/hook-form/fields';
import {useAppDispatch} from 'src/redux/hooks';
import {setJwt} from 'src/redux/slice/authSlice';
import {getAPIBaseUrl} from 'src/utils/urls';
import logo from 'src/assets/images/logoText1.jpg';
interface FormLogin {
  phone: string;
  password: string;
}
export default function LoginPage() {
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const locationState = location.state as {from?: {pathname?: string}};
  const from = locationState?.from?.pathname || '/';

  const form = useForm<FormLogin>({
    defaultValues: {
      phone: '0973092631',
      password: 'P2t@123123',
    },
  });

  const login = async ({phone, password}: {phone: string; password: string}) => {
    try {
      const res = await axios.post(`${getAPIBaseUrl()}authenticate`, {
        phone: phone.trim(),
        password: password,
      });
      return res.data;
    } catch (err: any) {
      const error = err.response?.data;
      enqueueSnackbar(error?.Errors?.[0] || error?.Message || 'Đã xảy ra lỗi', {variant: 'error'});
    }
  };
  const mutationLogin = useMutation(login, {
    onSuccess: data => {
      if (data) {
        dispatch(setJwt(data.token));
        navigate(from, {replace: true});
      }
    },
  });
  const onSubmit = (data: any) => {
    mutationLogin.mutate(data);
  };
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        background: `url('/background.jpg') no-repeat center center`,
        backgroundSize: 'cover',
      }}
    >
      <Card
        className="card p-4 w-1/3 min-w-[400px] bg-[rgba(255,255,255,0.5)]"
        style={{
          boxShadow: '0px 5px 20px 10px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div className="flex justify-center mb-8">
          <img src={logo} alt="logo" className="w-52" />
        </div>
        <InputField
          form={form}
          name="phone"
          label="Số điện thoại"
          placeholder=""
          rules={{
            required: {
              value: true,
              message: 'Vui lòng nhập số điện thoại',
            },
          }}
          onKeyDown={e => {
            if (e.nativeEvent.key === 'Enter') {
              form.handleSubmit(onSubmit)();
            }
          }}
        />
        <InputField
          form={form}
          name="password"
          label="Mật khẩu"
          type={'password'}
          placeholder=""
          className={'mt-2'}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng nhập mật khẩu',
            },
          }}
          onKeyDown={e => {
            if (e.nativeEvent.key === 'Enter') {
              form.handleSubmit(onSubmit)();
            }
          }}
        />

        <div className="mt-4 flex justify-center">
          <ButtonBase
            label="Đăng nhập"
            loading={mutationLogin.isLoading}
            onClick={form.handleSubmit(onSubmit)}
          />
        </div>
      </Card>
    </div>
  );
}
