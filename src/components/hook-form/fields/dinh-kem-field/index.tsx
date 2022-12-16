import axios from 'axios';
import React, {useState} from 'react';
import {ControllerProps, UseFormReturn} from 'react-hook-form';
import {DialogConfirm} from 'src/components/base';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import FileMultiPickerField from '../file-multi-picker-field';
import DinhKemItem, {ItemFileProp} from './dinh-kem-item';

export interface DinhKemFieldProps {
  name: string;
  label?: string;
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'] | any;
  data?: any[];
  isLoadingDelete?: boolean;
  acceptedFileTypes?: string[];
  onDelete?: (id: number) => void;
}

export default function DinhKemField(props: DinhKemFieldProps) {
  const {
    data = [],
    name,
    form,
    onDelete,
    isLoadingDelete = false,
    label = 'Đính kèm',
    acceptedFileTypes,
    rules,
  } = props;
  const dispatch = useAppDispatch();
  const [showDeleteDinhKem, setShowDeleteDinhKem] = useState({
    visible: false,
    urlDelete: '',
    id: -1,
  });
  const handleDelete = () => {
    if (data.length > 1) {
      axios.delete(showDeleteDinhKem.urlDelete);
      onDelete && onDelete(showDeleteDinhKem.id);
      setShowDeleteDinhKem(prev => ({...prev, visible: false}));
    } else {
      dispatch(
        setShowAlert({
          message: 'Không được xóa. Phải tồn tại ít nhất một file đính kèm cho tài sản này',
          type: 'warning',
        })
      );
    }
  };
  return (
    <div className="w-full">
      {data?.map((item, index) => (
        <DinhKemItem
          key={index.toString()}
          listFiles={data as ItemFileProp[]}
          item={item as ItemFileProp}
          onDelete={() => {
            setShowDeleteDinhKem({
              visible: true,
              id: item.id,
              urlDelete: item.deleteUrl,
            });
          }}
        />
      ))}
      <FileMultiPickerField
        form={form}
        name={name}
        label={label}
        isMulti
        rules={rules}
        acceptedFileTypes={acceptedFileTypes}
      />
      <DialogConfirm
        open={showDeleteDinhKem.visible}
        title="Xác nhận"
        loading={isLoadingDelete}
        content="Bạn có chắc chắn muốn xóa tập tin đính kèm này?"
        onClose={() => setShowDeleteDinhKem(prev => ({...prev, visible: false}))}
        onAgree={handleDelete}
      />
    </div>
  );
}
