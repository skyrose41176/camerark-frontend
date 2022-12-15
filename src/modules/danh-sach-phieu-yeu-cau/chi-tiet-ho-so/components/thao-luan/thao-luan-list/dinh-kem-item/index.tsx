import {Box, Link, Typography} from '@mui/material';
import React from 'react';
import {DinhKemThaoLuan} from 'src/models';
import DialogViewDocument from 'src/components/base/dialog-view-file';
import {ItemFileProp} from 'src/components/hook-form/fields/dinh-kem-field/dinh-kem-item';
// import DialogViewDocument from 'src/components/base/dialog-view-file';

interface DinhKemItemProps {
  // data: {
  //   thaoLuanId?: any;
  //   ten: string;
  //   taiSanId?: number;
  //   moTa: any;
  //   duongDan: string;
  //   loai: string;
  //   trangThai: boolean;
  //   id: number;
  // }[];
  data?: DinhKemThaoLuan[];
  showLine?: boolean;
}

export default function DinhKemItem({data, showLine = false}: DinhKemItemProps) {
  const [fileOpen, setFileOpen] = React.useState<{open: boolean; data?: DinhKemThaoLuan}>({
    open: false,
    data: undefined,
  });

  return (
    <div className="flex">
      {/* <div className="w-[30px] h-full flex flex-col items-center z-[1]">
        {showLine && <div className="h-full w-[1.5px] bg-[#F0F2F5]" />}
      </div> */}

      <div className="mt-1">
        <div className="flex flex-1 flex-wrap">
          {data
            ?.filter(item => item?.type !== 'image/png' && item?.type !== 'image/jpeg')
            ?.map(item => (
              <Box className="mr-2 mb-2 bg-[#f2f0f5] px-2 py-1 rounded-full">
                <Typography variant="caption">
                  <Link
                    className="cursor-pointer"
                    onClick={() => setFileOpen({open: true, data: item})}
                  >
                    {item?.nameInit}
                  </Link>
                </Typography>
              </Box>
            ))}
        </div>
        <div className="flex flex-1 flex-wrap">
          {data
            ?.filter(item => item?.type === 'image/png' || item?.type === 'image/jpeg')
            ?.map(item => {
              return (
                <div
                  className="relative mr-2 mb-2 cursor-pointer"
                  onClick={() => setFileOpen({open: true, data: item})}
                >
                  <img
                    alt={item?.nameInit}
                    src={item?.url}
                    height={100}
                    className="object-cover rounded-xl"
                  />
                </div>
              );
            })}
        </div>
        <DialogViewDocument
          open={fileOpen.open}
          files={data as ItemFileProp[]}
          defaultFile={fileOpen.data as ItemFileProp}
          onClose={() => setFileOpen({open: false, data: undefined})}
        />
      </div>
    </div>
  );
}
