import {Collapse, TableCell, TableRow} from '@mui/material';
import {ArrowCircleDown, ArrowCircleUp} from 'iconsax-react';
import React, {FC} from 'react';
import {ColumnTableProps} from 'src/components/types';
import IconButtonBase from '../icon-button-base';
import DataTable from './index';

interface Props {
  collapsed?: boolean;
  row: any;
  index: number;
  onRowClick?: (item: any, index: number) => void;
  heightRowRef?: any;
  columns: Array<ColumnTableProps>;
}
const TableRowItem: FC<Props> = ({
  row,
  index,
  onRowClick,
  heightRowRef,
  columns,
  collapsed = false,
}) => {
  const [open, setOpen] = React.useState(collapsed);
  return (
    <>
      <TableRow
        ref={heightRowRef}
        sx={{
          '&:last-child td, &:last-child th': {border: 0},
          cursor: onRowClick ? 'pointer' : 'default',
          backgroundColor: index % 2 !== 0 ? '#F4F5F7' : '#fff',
        }}
        className={'hover:bg-[#E5EFFF]'}
        onClick={() => onRowClick && onRowClick(row, index)}
      >
        {row.children &&
          (row.children?.rows?.length ? (
            <TableCell>
              <IconButtonBase
                iconName={open ? ArrowCircleUp : ArrowCircleDown}
                color="inherit"
                tooltip="Xem chi tiết"
                onClick={() => setOpen(prev => !prev)}
              />
            </TableCell>
          ) : (
            <TableCell />
          ))}
        {columns.map((item: ColumnTableProps) => {
          const arr = item.field.split('.');
          const field =
            arr.length > 1
              ? item.field.split('.').reduce((prev, curr) => {
                  return prev?.[curr];
                }, row)
              : row?.[item.field];
          return (
            <TableCell
              className={`${
                item.field === 'thaoTac' ? 'sticky right-0 bg-white' : ''
              } overflow-ellipsis overflow-hidden`}
              key={item.field}
              align={item.center ? 'center' : item.type === 'number' ? 'right' : 'left'}
            >
              {item.renderCell
                ? item.renderCell(row, index)
                : item.valueGetter
                ? item?.valueGetter(row, index)
                : field}
            </TableCell>
          );
        })}
      </TableRow>
      {row.children?.rows?.length > 0 && (
        <TableRow>
          <TableCell className="m-0 p-0" colSpan={columns?.length + 1}>
            <Collapse in={open}>
              <div className="m-2" style={{width: row.children.width ?? 'auto'}}>
                <DataTable
                  fixedColumn
                  columns={row.children.columns ?? []}
                  rows={row.children.rows ?? []}
                />
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default React.memo(TableRowItem, (prev, next) => {
  return (
    prev.row === next.row &&
    prev.collapsed === next.collapsed &&
    prev.index === next.index &&
    prev.columns === next.columns &&
    prev.heightRowRef === next.heightRowRef &&
    prev.onRowClick === next.onRowClick
  );
});
