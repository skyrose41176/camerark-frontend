import {Avatar, TextareaAutosize, Typography} from '@mui/material';
import {AttachSquare, Send} from 'iconsax-react';
import React, {useRef, useState} from 'react';
import {useCreateThaoLuan} from 'src/apis';
import uploadFiles, {FileUpload} from 'src/apis/upload';
import {ButtonBase} from 'src/components/base';
import {DinhKemThaoLuan} from 'src/models';
import {useAppSelector} from 'src/redux/hooks';
import {selectInfoUser} from 'src/redux/slice/authSlice';
// import {thaoLuanService} from 'src/services/mars';
// import uploadFiles from 'src/services/upload';
import {avatar} from 'src/utils';
import DinhKemItem from './dinh-kem-item';
export interface ThaoLuanInputProps {
  // onSend: (message: string) => void;
  // sendLoading?: boolean;
  data: {
    parentId?: number;
    phieuYeuCauId?: number;
  };
}

export default function ThaoLuanInput({data}: ThaoLuanInputProps) {
  const infoUser = useAppSelector(selectInfoUser);
  const [message, setMessage] = useState('');
  const fileRef = useRef<any>(null);
  const [listDinhKem, setListDinhKem] = useState<File[]>([]);
  const mutationCreate = useCreateThaoLuan(data?.parentId || 0, () => {
    setMessage('');
    setListDinhKem([]);
  });
  //   onSuccess: () => {
  //     if (parentId === 0) {
  //       queryClient.invalidateQueries('listThaoLuanHDDGParent');
  //     } else {
  //       queryClient.invalidateQueries('listThaoLuanHDDGParent');
  //       queryClient.invalidateQueries(`listThaoLuanHDDG${parentId}`);
  //     }
  //     queryClient.invalidateQueries('danhSachDinhKemThaoLuanPyc');
  // setMessage('');
  //     setListDinhKem([]);
  //   },
  // });
  const handleSendMessage = async () => {
    if (message.trim() || listDinhKem.length > 0) {
      let resDinhKem: FileUpload | undefined = undefined;
      if (listDinhKem.length > 0) {
        resDinhKem = await uploadFiles(listDinhKem, infoUser.Email);
      }

      mutationCreate.mutateAsync({
        ...data,
        noiDung: message.trim(),
        dinhKemThaoLuans: resDinhKem?.files as DinhKemThaoLuan[],
      });
    }
  };
  return (
    <div>
      <div className="flex flex-col flex-1 p-2 border border-solid border-[#f3f6f9] rounded-[6px]">
        <div className="flex items-center">
          <Avatar
            // onClick={() => navigate('/thong-tin-ca-nhan')}
            sx={{backgroundColor: avatar.getColor(infoUser.TenNhanVien), width: 30, height: 30}}
            className={`border-2 border-solid border-[#ececec] font-bold cursor-pointer text-xs`}
          >
            {avatar.generateName(infoUser.TenNhanVien)}
          </Avatar>
          <div className="ml-1 flex flex-col">
            <Typography variant="h6">{infoUser.TenNhanVien}</Typography>
            <Typography variant="caption">{infoUser.Email}</Typography>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[30px]" />
          <div className="ml-1 mt-1 flex flex-1">
            <TextareaAutosize
              className="border border-solid border-[#eee] w-full p-2 rounded-[6px]"
              minRows={3}
              maxRows={5}
              placeholder="Viết thảo luận..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <input
            type="file"
            ref={fileRef}
            style={{display: 'none', borderRadius: 4}}
            multiple
            onChange={e => {
              const files = e.target.files;
              if (files) {
                const newFiles =
                  [...files].filter(
                    (item: File) => listDinhKem.map(item => item.name).indexOf(item.name) === -1
                  ) ?? [];
                setListDinhKem(prev => [...prev, ...newFiles]);
              }
            }}
          />
          <div className="txtUppercase flex">
            <ButtonBase
              label="Đính kèm"
              color="success"
              variant="outlined"
              onClick={() => fileRef.current.click()}
              startIcon={<AttachSquare style={{fontSize: 16, width: '16px', height: '16px'}} />}
            />
            <div className="mx-2" />
            <ButtonBase
              variant="outlined"
              label="Gửi"
              loading={mutationCreate.isLoading}
              onClick={handleSendMessage}
              startIcon={<Send style={{fontSize: 16, width: '16px', height: '16px'}} />}
            />
          </div>
        </div>
        <DinhKemItem
          data={listDinhKem}
          onDelete={file => {
            const newList = [...listDinhKem];
            setListDinhKem(newList.filter(item => item.name !== file.name));
          }}
        />
      </div>
    </div>
  );
}
