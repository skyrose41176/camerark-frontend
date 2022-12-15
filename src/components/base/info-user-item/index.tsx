import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import React, {FC} from 'react';
import {avatar} from 'src/utils';

interface Props {
  item: {
    name: string;
    email: string;
    chucDanh: string;
    donVi: string;
    sdt: string;
  };

  secondaryAction?: React.ReactNode | React.ReactChild;
  checkBox?: React.ReactNode | React.ReactChild;
}
const InfoUserItem: FC<Props> = ({item, secondaryAction, checkBox}) => {
  return (
    // <AvatarGroup sx={{justifyContent: 'center', flexWrap: 'wrap'}} max={100}>
    //   {row?.nhanSuBoPhans?.map(item => (
    //     <Tooltip title={renderInfoUser(item?.nhanSu)}>
    //       <Badge overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
    //         <Avatar
    //           alt={item?.nhanSu?.ten}
    //           style={{
    //             backgroundColor: avatar.getColor(item?.nhanSu?.ten),
    //           }}
    //           className="w-8 h-8 text-sm border-2 border-solid border-[#ececec]"
    //         >
    //           {avatar.generateName(item?.nhanSu?.ten)}
    //         </Avatar>
    //       </Badge>
    //     </Tooltip>
    //   ))}
    // </AvatarGroup>
    <div className="cardbase-padding-0 box-list-item-user">
      <ListItem className="px-0 list-item-user" secondaryAction={secondaryAction}>
        {checkBox}
        <ListItemAvatar>
          <Tooltip
            title={
              <>
                <p>Tên nhân sự: {item.name}</p>
                <p>Email: {item.email}</p>
                <p>Sđt: {item.sdt}</p>
                <p>Chức vụ: {item.chucDanh}</p>
                <p>Đơn vị: {item.donVi}</p>
              </>
            }
          >
            <Badge overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
              <Avatar
                alt={item.name}
                style={{
                  backgroundColor: avatar.getColor(item.name),
                }}
                className="w-8 h-8 text-sm border-2 border-solid border-[#ececec]"
              >
                {avatar.generateName(item.name)}
              </Avatar>
            </Badge>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className="font-bold" variant="h6">
              {item.name}
            </Typography>
          }
          secondary={
            <div className="flex flex-col">
              <Typography component="span" variant="caption">
                {item.email}
              </Typography>
              <Typography component="span" variant="caption" className="text-primary font-bold">
                {item.chucDanh}
              </Typography>
            </div>
          }
        />
      </ListItem>
    </div>
  );
};

export default InfoUserItem;
