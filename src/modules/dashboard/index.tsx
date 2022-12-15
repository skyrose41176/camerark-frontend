import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {Avatar, CircularProgress, Grid, Stack, Typography} from '@mui/material';
import ButtonBaseMUI from '@mui/material/ButtonBase';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/system';
import React, {useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';
import {ButtonBase, CardBase} from 'src/components/base';
import {InputField} from 'src/components/hook-form/fields';
import {PageWrapper} from 'src/components/wrapper';
import {PHONE_NUMBER_REGEX} from 'src/constants';
import FieldLayout from 'src/layouts/FieldLayout';
import {useAppDispatch, useAppSelector} from 'src/redux/hooks';
import {selectInfoUser} from 'src/redux/slice/authSlice';
// import {nguoiDungService} from 'src/services/saturn';
// import uploadFiles from 'src/services/upload';
import {avatar} from 'src/utils';
import Header from '../../layouts/Header';
const ThongTinCaNhanPage = () => {
  const formThongTinCaNhan = useForm({
    defaultValues: {
      phongBanClaim: '',
      maPhongBanClaim: '',
      chucVuClaim: '',
      maChucVuClaim: '',
      email: 'dotrungduc@vietbank.com.vn',
      maNhanVien: '',
      tenNhanVien: '',
    },
  });
  const infoUser = useAppSelector(selectInfoUser);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const avatarRef = useRef<any>();
  const form = useForm();
  const {setValue, watch} = form;
  const [hoverAvatar, setHoverAvatar] = React.useState(false);
  const watchAvatar = watch('anhDaiDien');
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '200px',
    borderRadius: '50%',
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  const ImageButton = styled(ButtonBaseMUI)(({theme}) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    width: '200px',
    borderRadius: '50%',
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.4,
        width: '200px',
        borderRadius: '50%',
        height: '200px',
      },
      '& .MuiImageMarked-root': {
        opacity: 0.4,
        width: '200px',
        borderRadius: '50%',
        height: '200px',
      },
      '& .title-update-avt': {
        zIndex: 1,
        color: '#fff',
      },
      '& .icon-addPhoto': {
        color: '#fff',
      },
    },
  }));
  const Image = styled('span')(({theme}) => ({
    boxShadow: theme.shadows[8],
    border: '4px solid currentColor',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    borderRadius: '50%',
    height: '200px',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '200px',
    borderRadius: '50%',
    height: '200px',
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  }));

  const [isLoadingUpload, setIsLoadingUpload] = React.useState(false);

  // const mutationCreateAvatar = useMutation(nguoiDungService.createAvatar, {
  //   onSuccess: data => {
  //     if (data) {
  //       queryClient.invalidateQueries('nguoiDung');
  //     }
  //   },
  // });
  // const mutationCreateSoDienThoai = useMutation(nguoiDungService.createSoDienThoai, {
  //   onSuccess: data => {
  //     if (data) {
  //       queryClient.invalidateQueries('nguoiDung');
  //     }
  //   },
  // });
  React.useEffect(() => {
    if (infoUser) {
      Object.entries(infoUser).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [infoUser]);
  return (
    <div className="w-full">
      <Header title="Thông tin cá nhân" />
      <PageWrapper>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardBase>
              <Stack justifyContent="center" alignItems={'center'} flexDirection="column">
                <input
                  type="file"
                  ref={avatarRef}
                  className="hidden"
                  onChange={async e => {
                    // const files = e.target.files;
                    // if (files) {
                    //   setIsLoadingUpload(true);
                    //   const res = await uploadFiles([...files], infoUser.Email);
                    //   if (res) {
                    //     await mutationCreateAvatar.mutateAsync({
                    //       userId: infoUser?.uid ?? '',
                    //       claimType: 'AnhDaiDien',
                    //       claimValue: res.files[0].url,
                    //     });
                    //   }
                    //   setIsLoadingUpload(false);
                    // }
                  }}
                />
                <ImageButton
                  focusRipple
                  key={`avatar`}
                  style={{
                    justifyContent: 'center',
                  }}
                  onClick={() => avatarRef.current.click()}
                >
                  {watchAvatar ? (
                    <ImageSrc
                      style={{
                        backgroundImage: `url(${watchAvatar})`,
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{backgroundColor: avatar.getColor(form.watch('tenNhanVien'))}}
                      className={`border-2 border-solid border-[#ececec] font-bold text-8xl cursor-pointer w-full h-full`}
                      src={watchAvatar}
                    >
                      {avatar.generateName(form.watch('tenNhanVien'))}
                    </Avatar>
                  )}

                  <ImageBackdrop className="MuiImageBackdrop-root" />
                  {isLoadingUpload && <CircularProgress color="warning" />}
                  <Image
                    onMouseEnter={() => setHoverAvatar(true)}
                    onMouseLeave={() => setHoverAvatar(false)}
                  >
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: theme => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                    >
                      <Typography
                        className="title-update-avt flex flex-col justify-center items-center"
                        variant="subtitle2"
                        gutterBottom
                        color={'#fff0'}
                      >
                        <AddAPhotoIcon className="mb-1" />
                        Thay đổi ảnh đại diện
                      </Typography>
                    </Typography>
                  </Image>
                </ImageButton>
                <Box className="mt-5" />
                <Typography textAlign={'center'} variant="subtitle1" component="div">
                  {form.watch('tenNhanVien')}
                </Typography>
                <Typography textAlign={'center'} variant="body2" gutterBottom component="div">
                  {form.watch('chucVuClaim')}
                </Typography>
              </Stack>
            </CardBase>
          </Grid>
          <Grid item xs={8}>
            {hoverAvatar && (
              <img src={infoUser.anhDaiDien} alt={infoUser.TenNhanVien} className="absolute z-10" />
            )}
            <CardBase headerShow title="Thông tin chi tiết">
              <FieldLayout xs={12} md={12} lg={4} xl={3}>
                <InputField name="tenNhanVien" label="Tên nhân viên" form={form} disabled />
                <InputField name="maNhanVien" label="Mã nhân viên" form={form} disabled />
                <InputField name="email" label="Email" form={form} disabled />
                <InputField name="maChucVuClaim" label="Mã chức vụ" form={form} disabled />
                <InputField name="chucVuClaim" label="Tên chức vụ" form={form} disabled />
                <InputField name="maPhongBanClaim" label="Mã phòng ban" form={form} disabled />
                <InputField name="phongBanClaim" label="Tên phòng ban" form={form} disabled />
                <InputField
                  name="soDienThoai"
                  label="Số điện thoại"
                  form={form}
                  rules={{
                    pattern: {
                      value: PHONE_NUMBER_REGEX,
                      message: 'Số điện thoại không hợp lệ',
                    },
                  }}
                />
              </FieldLayout>
              <div className="flex justify-end mt-2">
                <ButtonBase
                  label="Cập nhật"
                  // loading={mutationCreateSoDienThoai.isLoading}
                  onClick={form.handleSubmit(data => {
                    // mutationCreateSoDienThoai.mutateAsync({
                    //   userId: infoUser?.uid ?? '',
                    //   claimType: 'SoDienThoaiClaim',
                    //   claimValue: data.soDienThoai,
                    // });
                  })}
                />
              </div>
            </CardBase>
          </Grid>
        </Grid>
      </PageWrapper>
    </div>
  );
};

export default ThongTinCaNhanPage;
