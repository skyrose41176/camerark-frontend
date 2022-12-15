import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import {Typography} from '@mui/material';
import {
  Calendar,
  CalendarEdit,
  CalendarRemove,
  CalendarTick,
  ClipboardClose,
  HierarchySquare2,
  MessageQuestion,
  NoteFavorite,
} from 'iconsax-react';
import {FC} from 'react';
import {CardBase} from 'src/components/base';
import {TrangThaiXuLy} from 'src/constants';

interface Props {
  data: {
    time: string;
    email: string;
    status: number;
    taiBuoc: string;
  }[];
}
const CardLichSuThaoTac: FC<Props> = ({data}) => {
  return (
    <div className="cardbase-padding-0">
      <CardBase headerShow title="Lịch sử thao tác">
        <Timeline position="right" className="scroll-list">
          {data?.map((item, index) => (
            <TimelineItem className="before:clear-none" key={index}>
              <TimelineSeparator>
                {index > 0 && <TimelineConnector />}
                {item.status === TrangThaiXuLy.KHOI_TAO ? (
                  <TimelineDot color="primary">
                    <NoteFavorite
                      color="#fff"
                      style={{width: '20px', height: '20px'}}
                      variant="Bulk"
                    />
                  </TimelineDot>
                ) : item.status === TrangThaiXuLy.CHAP_THUAN ||
                  item.status === TrangThaiXuLy.CAP_TREN_DONG_Y ? (
                  <TimelineDot color="success">
                    <CalendarTick
                      color="#fff"
                      style={{width: '20px', height: '20px'}}
                      variant="Bulk"
                    />
                  </TimelineDot>
                ) : item.status === TrangThaiXuLy.TU_CHOI ||
                  item.status === TrangThaiXuLy.CAP_TREN_TU_CHOI ? (
                  <TimelineDot color="error">
                    <CalendarRemove
                      color="#fff"
                      style={{width: '20px', height: '20px'}}
                      variant="Bulk"
                    />
                  </TimelineDot>
                ) : item.status === TrangThaiXuLy.XU_LY ? (
                  <TimelineDot color="primary">
                    <CalendarEdit
                      color="#fff"
                      style={{width: '20px', height: '20px'}}
                      variant="Bulk"
                    />
                  </TimelineDot>
                ) : item.status === TrangThaiXuLy.THEO_DOI ||
                  item.status === TrangThaiXuLy.MOI_THAM_GIA ||
                  item.status === TrangThaiXuLy.CHO_CAP_TREN_DUYET ? (
                  <TimelineDot color="warning">
                    <Calendar color="#fff" style={{width: '20px', height: '20px'}} variant="Bulk" />
                  </TimelineDot>
                ) : item.status === TrangThaiXuLy.DONG_PYC ? (
                  <TimelineDot color="warning">
                    <ClipboardClose
                      color="#fff"
                      style={{width: '20px', height: '20px'}}
                      variant="Bulk"
                    />
                  </TimelineDot>
                ) : item.status === TrangThaiXuLy.DIEU_PHOI ? (
                  <TimelineDot color="primary">
                    <HierarchySquare2
                      color="#fff"
                      style={{width: '20px', height: '20px'}}
                      variant="Bulk"
                    />
                  </TimelineDot>
                ) : (
                  <TimelineDot color="grey">
                    <MessageQuestion
                      color="#fff"
                      style={{width: '20px', height: '20px'}}
                      variant="Bulk"
                    />
                  </TimelineDot>
                )}
                {index < data.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent className="flex flex-col">
                <Typography variant="caption">{item.time}</Typography>
                <Typography
                  variant="caption"
                  dangerouslySetInnerHTML={{
                    __html: item.taiBuoc,
                  }}
                />
                <Typography variant="caption">
                  <b>{item.email}</b>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardBase>
    </div>
  );
};

export default CardLichSuThaoTac;
