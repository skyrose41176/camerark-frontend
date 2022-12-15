import {Stack, Typography, Box, IconButton} from '@mui/material';
import {DirectInbox} from 'iconsax-react';
import React, {FC} from 'react';
import {formatDatetimeHHmmDDMMYYYY} from 'src/utils/format';

interface Props {
  labelWidth?: number;
  contentWidth?: number;
  data: {
    label: React.ReactNode;
    valueBold?: boolean;
    createBy: string;
    fileName: string | undefined;
    link?: string | undefined | number;
    createdAt?: string | undefined;
  }[];
}
const ListFileThaoLuan: FC<Props> = ({labelWidth, data}) => {
  return (
    <>
      {data.map(item => (
        <Box className="mb-2 mt-2" style={{borderBottom: '1px solid #EEEEEE'}}>
          <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Stack display={'flex'} flexDirection={'column'}>
              <Typography className={'font-bold'} variant="body2">
                {item.fileName}
              </Typography>
              <Box className="mb-1" />
              <Typography variant="caption" color={'#999999'} display="block" gutterBottom>
                Tạo bởi {item.createBy} -
                <span className={`${item.valueBold ? 'font-bold ml-1' : 'font-normal ml-1'}`}>
                  {formatDatetimeHHmmDDMMYYYY(item.createdAt || '')}
                </span>
              </Typography>
            </Stack>
            <IconButton
              color="primary"
              style={{
                // backgroundColor: '#0C56A5',
                height: '30px',
                borderRadius: '50px',
                padding: '5px',
                marginTop: '10px',
              }}
            >
              <DirectInbox
                size="20"
                //color="#fff"
              />
            </IconButton>
          </Stack>
        </Box>
      ))}
    </>
  );
};

export default ListFileThaoLuan;
