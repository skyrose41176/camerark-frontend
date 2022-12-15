import {useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useCreatePhieuYeuCau} from 'src/apis';
import uploadFiles, {FileUpload} from 'src/apis/upload';
import {CardCollapse, DialogBase, TableThongTin} from 'src/components/base';
import NhanSuField from 'src/components/hook-form/nhan-su-field';
import FieldLayout from 'src/layouts/FieldLayout';
import {DinhKemPhieuYeuCau, PhieuYeuCau} from 'src/models';
import {useAppDispatch, useAppSelector} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {selectInfoUser} from 'src/redux/slice/authSlice';
import {FormTaoPhieuYeuCau} from './tao-phieu-yeu-cau';

interface Props {
  open: boolean;
  form: UseFormReturn<FormTaoPhieuYeuCau>;
  onClose: () => void;
  onCloseTaoPhieuYeuCau: () => void;
}
const DialogXemTruoc = ({open, form, onClose, onCloseTaoPhieuYeuCau}: Props) => {
  const [showDialogChangeTdv, setShowDialogChangeTdv] = useState({open: false});
  const {
    handleSubmit,
    watch,
    setValue,
    formState: {isSubmitting},
  } = form;
  const infoUser = useAppSelector(selectInfoUser);
  const dispatch = useAppDispatch();
  const mutationCreate = useCreatePhieuYeuCau(() => {
    onClose();
    onCloseTaoPhieuYeuCau();
  });

  const onSubmit = async (data: FormTaoPhieuYeuCau) => {
    if (!data?.tdvId && !infoUser?.tdv?.id) {
      dispatch(setShowAlert({type: 'warning', message: 'Vui lòng chọn trưởng đơn vị'}));
      return;
    }

    let files: FileUpload | undefined = undefined;
    if (data?.dinhKems?.length > 0) {
      files = await uploadFiles(data?.dinhKems, infoUser.Email);
    }
    let newData: Partial<PhieuYeuCau> = {
      ...data,
      loaiYeuCauId: Number(data?.loaiYeuCauId?.value),
      uuTien: data?.uuTien || '',
      tdvId: data?.tdvId?.id || infoUser?.tdv?.id,
      tenDonVi: infoUser?.donVi,
      sdt: infoUser?.sdt,
      tenNhanSu: infoUser?.TenNhanVien,
      chucDanh: infoUser?.ChucVu,
    };
    if (data?.dinhKems?.length > 0 && files) {
      newData = {
        ...newData,
        dinhKemPhieuYeuCaus: files.files as DinhKemPhieuYeuCau[],
      };
    }

    await mutationCreate.mutateAsync(newData);
  };

  return (
    <>
      <DialogBase
        open={open}
        title="PHIẾU YÊU CẦU"
        textCancel="Thoát"
        textAccept="Tạo phiếu yêu cầu"
        maxWidth="sm"
        loading={isSubmitting}
        changeTdv
        onChangeTdv={() => setShowDialogChangeTdv({...showDialogChangeTdv, open: true})}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardCollapse title="Thông tin người yêu cầu" className="detail-">
          <TableThongTin
            className="mb-2"
            labelWidth={200}
            data={[
              {
                label: 'Người khởi tạo',
                value: infoUser?.TenNhanVien,
                valueBold: true,
              },
              {
                label: 'Email người khởi tạo',
                value: infoUser?.Email,
                valueBold: true,
              },
              {
                label: 'Chức vụ người khởi tạo',
                value: infoUser?.ChucVu,
                valueBold: true,
              },
              {
                label: 'Điện thoại liên lạc',
                value: infoUser?.sdt,
                valueBold: true,
              },
              {
                label: 'Đơn vị',
                value: infoUser?.donVi,
                valueBold: true,
              },
              {
                label: 'Email TĐV duyệt',
                value: watch('tdvId')?.email ?? infoUser?.tdv?.email,
                valueBold: true,
              },
            ]}
          />
        </CardCollapse>
        <CardCollapse title="Nội dung yêu cầu" className="detail-">
          <TableThongTin
            className="mb-2"
            labelWidth={200}
            data={[
              {
                label: 'Loại nghiệp vụ',
                value: watch('loaiNghiepVuId')?.label,
                valueBold: true,
              },
              {
                label: 'Loại yêu cầu',
                value: watch('loaiYeuCauId')?.label,
                valueBold: true,
              },
              {
                label: 'Mô tả chi tiết',
                value: watch('moTa'),
                valueBold: true,
              },
              {
                label: 'Mức độ ưu tiên',
                value: watch('uuTien'),
                valueBold: true,
              },
            ]}
          />
        </CardCollapse>
        <CardCollapse title="Tài liệu đính kèm" className="detail-">
          <TableThongTin
            className="table-attach-review"
            // labelWidth={360}
            data={watch('dinhKems')?.map((item: any) => ({
              label: 'Tên file',
              value: item?.name,
              valueBold: true,
            }))}
          />
        </CardCollapse>
      </DialogBase>
      {showDialogChangeTdv?.open && (
        <DialogBase
          open={showDialogChangeTdv?.open}
          title="Thay đổi trưởng đơn vị"
          onSubmit={() => {
            setShowDialogChangeTdv({
              open: false,
            });

            setValue('tdvId', watch('nhanSuId'));
          }}
          onClose={() => setShowDialogChangeTdv({open: false})}
        >
          <FieldLayout xs={12} md={12} lg={12} xl={12}>
            <NhanSuField form={form} name="nhanSuId" valueTypeSelectObject />
          </FieldLayout>
        </DialogBase>
      )}
    </>
  );
};
export default DialogXemTruoc;
