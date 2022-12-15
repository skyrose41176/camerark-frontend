import {DialogBase} from 'src/components/base';
import {saveAs} from 'file-saver';

interface Props {
  open: boolean;
  onClose?: () => void;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fileUrl: string;
}

const DialogXuatFilePdf = ({open, title, onClose, maxWidth = 'xl', fileUrl}: Props) => {
  const onDownload = () => {
    saveAs(fileUrl, 'FILE_KET_QUA_XU_LY_SU_CO');
  };
  return (
    <DialogBase
      title={title}
      open={open}
      onClose={onClose}
      hiddenAcceptButton
      color="success"
      maxWidth={maxWidth}
      fullScreen
      loading={false}
      onDownload={onDownload}
    >
      <iframe id="iframeCompare" title="pdf" width="100%" height="100%" src={fileUrl} />
    </DialogBase>
  );
};

export default DialogXuatFilePdf;
