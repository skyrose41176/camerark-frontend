import {DialogTitle, IconButton, styled, Tooltip} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {saveAs} from 'file-saver';
import Carousel from 'react-material-ui-carousel';
import {CloseCircle, DocumentDownload} from 'iconsax-react';
import {ItemFileProp} from 'src/components/hook-form/fields/dinh-kem-field/dinh-kem-item';
import {colors} from 'src/theme';
import {useEffect, useState} from 'react';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: any) => {
  const {children, onClose, onDownload, ...other} = props;

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <>
          <Tooltip title="Tải xuống">
            <IconButton
              aria-label="close"
              onClick={onDownload}
              sx={{
                position: 'absolute',
                right: 40,
                top: 8,
              }}
            >
              <DocumentDownload color={colors.primary} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Đóng">
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseCircle color={colors.error} />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
    </DialogTitle>
  );
};

interface DialogViewDocumentProps {
  open: boolean;
  onClose: (value: boolean) => void;
  files: ItemFileProp[];
  defaultFile?: ItemFileProp;
}
export default function DialogViewDocument({
  open = false,
  onClose,
  files,
  defaultFile,
}: DialogViewDocumentProps) {
  useEffect(() => {
    handleChangeDoc(defaultFile);
    const i = files.findIndex(item => item?.id === defaultFile?.id);
    setIndex(i);
  }, [open, defaultFile, files]);
  const [doc, setDoc] = useState<(ItemFileProp & {duongDan?: string}) | undefined>(defaultFile);
  const [index, setIndex] = useState(0);

  const handleClose = () => {
    onClose(false);
  };

  const handleDownload = () => {
    doc && saveAs(doc?.url, doc?.nameInit);
  };

  const handleChangeDoc = (file?: ItemFileProp) => {
    if (file)
      if (file?.type === 'application/pdf' || file?.type.startsWith('image/')) setDoc(file);
      else
        setDoc({
          ...file,
          duongDan: `https://view.officeapps.live.com/op/embed.aspx?src=${file?.url}`,
        });
  };

  return (
    <BootstrapDialog
      fullWidth
      fullScreen
      maxWidth="lg"
      // onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        onDownload={handleDownload}
        style={{textTransform: 'uppercase'}}
      >
        {doc?.nameInit}
      </BootstrapDialogTitle>
      <DialogContent style={{position: 'relative', padding: '0px'}}>
        <Carousel
          autoPlay={false}
          next={() => {
            if (index + 1 >= files?.length) {
              setIndex(0);
              handleChangeDoc(files[0]);
            } else {
              setIndex(index + 1);
              handleChangeDoc(files[index + 1]);
            }
          }}
          prev={() => {
            if (index - 1 < 0) {
              setIndex(files.length - 1);
              handleChangeDoc(files[files.length - 1]);
            } else {
              setIndex(index - 1);
              handleChangeDoc(files[index - 1]);
            }
          }}
          navButtonsProps={{
            style: {
              marginTop: '-55px',
            },
          }}
          navButtonsWrapperProps={{
            style: {
              marginTop: '55px',
              marginRight: '10px',
            },
          }}
        >
          <div
            style={{
              height: 'calc(100vh - 55px)',
            }}
          >
            <iframe
              title={doc?.nameInit}
              src={doc?.duongDan ?? doc?.url}
              width="100%"
              height="100%"
              frameBorder={0}
            />
          </div>
        </Carousel>
      </DialogContent>
    </BootstrapDialog>
  );
}
