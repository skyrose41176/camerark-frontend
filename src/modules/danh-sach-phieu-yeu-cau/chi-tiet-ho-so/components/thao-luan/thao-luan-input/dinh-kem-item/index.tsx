import {Box, Link, Typography} from '@mui/material';
import React from 'react';
import {IconButtonBase} from 'src/components/base';
import {CloseCircle} from 'iconsax-react';

export interface DinhKemItemProps {
  data: File[];
  onDelete?: (file: File) => void;
}

export default function DinhKemItem({data, onDelete}: DinhKemItemProps) {
  return (
    <div>
      <div className="flex flex-1 flex-wrap">
        {data
          .filter(item => item.type !== 'image/png' && item.type !== 'image/jpeg')
          .map(item => (
            <Box
              sx={{width: '100%'}}
              className="bg-[#f2f0f5] px-2 py-1 rounded-full item-attach-comment"
            >
              <Typography variant="caption" sx={{width: "calc(100% - 30px)", display: "inline-block"}}>
                <Link>{item.name}</Link>
              </Typography>
              {onDelete && (
                <IconButtonBase
                  className="ml-1"
                  iconName={CloseCircle}
                  tooltip="Xóa"
                  color="error"
                  onClick={() => onDelete(item)}
                />
              )}
            </Box>
          ))}
      </div>
      <div className="flex flex-1 mt-2 flex-wrap">
        {data
          .filter(item => item.type === 'image/png' || item.type === 'image/jpeg')
          .map(item => {
            const url = URL.createObjectURL(item);

            return (
              <div className="relative mr-2 mb-2">
                <img alt="test" src={url} height={100} className="object-cover rounded-xl" />
                {onDelete && (
                  <IconButtonBase
                    className="ml-1 absolute right-0 top-0"
                    iconName={CloseCircle}
                    tooltip="Xóa"
                    color="error"
                    onClick={() => onDelete(item)}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
