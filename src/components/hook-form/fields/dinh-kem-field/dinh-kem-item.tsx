import {Link, Typography} from '@mui/material';
import {Trash} from 'iconsax-react';
import moment from 'moment';
import React from 'react';
import {IconButtonBase} from 'src/components/base';
import DialogViewDocument from 'src/components/base/dialog-view-file';
// import DialogViewDocument from 'src/components/base/dialog-view-file';
// import {DinhKem} from 'src/models/common';

export interface ItemFileProp {
  id: number | string;
  created: string;
  nameInit: string;
  createdBy: string;
  url: string;
  type: string;
}
interface DinhKemItemProps {
  listFiles?: ItemFileProp[];
  item: ItemFileProp;
  onDelete?: () => void;
}

export default function DinhKemItem({listFiles, item, onDelete}: DinhKemItemProps) {
  const [openDialogViewDocument, setOpenDialogViewDocument] = React.useState(false);
  return (
    <>
      <div className="flex py-1 justify-between items-center">
        <div className="flex flex-col overflow-hidden mr-2">
          <Link
            variant="body2"
            className="link-attachment-file"
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              setOpenDialogViewDocument(true);
            }}
            sx={{
              cursor: 'pointer',
            }}
          >
            {item.nameInit}
          </Link>
          <Typography variant="caption">{`Được tạo bởi: ${item.createdBy} - ${moment(
            item.created
          ).format('HH:mm, DD/MM/YYYY')}`}</Typography>
        </div>
        {onDelete && (
          <IconButtonBase
            onClick={() => {
              onDelete && onDelete();
            }}
            tooltip={`Xóa file ${item.nameInit}`}
            iconName={Trash}
            color="error"
          />
        )}
      </div>
      {/* <div className="h-[1px] bg-[#eee] w-full" /> */}

      {openDialogViewDocument && (
        <DialogViewDocument
          open={openDialogViewDocument}
          onClose={() => setOpenDialogViewDocument(false)}
          defaultFile={item}
          files={listFiles || []}
        />
      )}
    </>
  );
}
