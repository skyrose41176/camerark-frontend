import {setShowAlert} from 'src/redux/slice/alertSlice';
import store from 'src/redux/store';
import {removeAccent} from 'src/utils/format';
import axios from 'axios';

export interface MyFile {
  deleteType: string;
  deleteUrl: string;
  name: string;
  nameInit: string;
  size: number;
  thumbnailUrl: any;
  type: string;
  url: string;
}
export interface FileUpload {
  files: MyFile[];
}
const _postUploadFile = async (
  formData: FormData,
  email: string
): Promise<FileUpload | undefined> => {
  const date = new Date();
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL_UPLOAD}/api/file/uploads`, formData, {
      headers: {
        file: `xulysuco/${email}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      },
    });
    if (res) {
      return res.data;
    }
  } catch (error) {
    store.dispatch(
      setShowAlert({
        open: true,
        type: 'error',
        message: 'Đã xảy ra lỗi khi upload file',
      })
    );
  }
};

const onFileUpload = async (files: File[], email: string): Promise<FileUpload | void> => {
  const formData = new FormData();
  for (const f of files) {
    formData.append('files', f);
  }
  return await _postUploadFile(formData, email);
};

const uploadFiles = async (files: File[], email: string): Promise<FileUpload> => {
  let fileCustom = files.map(file => {
    const extraName = `${Date.now()}${Math.random() * 1000}`;
    return {
      file: new File([file], removeAccent(`${extraName}${file?.name}`), {
        type: file.type,
      }),
      extraName,
      nameInit: file?.name,
    };
  });
  let result = await onFileUpload(
    fileCustom.map(item => {
      return item.file;
    }),
    email
  );
  const temp = fileCustom.map(z => removeAccent(`${z.extraName}${z.nameInit}`));
  //   if (result) {
  const result1 = result?.files.map((e: MyFile) => {
    if (temp.indexOf(e.name) !== -1) {
      return Object.assign({}, e, {
        nameInit: fileCustom[temp.indexOf(e.name)].nameInit,
      });
    }
  });
  //   }

  return {files: result1 as MyFile[]};
};

export default uploadFiles;
