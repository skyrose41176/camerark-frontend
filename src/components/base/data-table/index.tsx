import {ArrowDropDownRounded, ArrowDropUpRounded} from '@mui/icons-material';
import {
  Box,
  Card,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, {FC, useEffect, useRef, useState} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {ColumnTableProps} from 'src/components/types';
import TableRowItem from './table-row-item';
interface Row {
  children?: {
    columns: Array<ColumnTableProps>;
    rows: Array<Row>;
    width?: number | string;
  };
  [key: string]: any;
}
interface Sort {
  column: string;
  order: 'asc' | 'desc';
}
interface Props {
  columns: Array<ColumnTableProps>;
  rows: Array<Row>;
  height?: number;
  maxHeight?: number;
  fixedColumn?: boolean;
  textAlign?: string;
  pagination?: {
    rowsPerPage: number;
    page: number;
    onPageChange?: (page: number) => void; //page
    onRowsPerPageChange?: (value: any) => void; //value
    totalCount: number;
    show: boolean;
  };
  onSortChange?: (sort: Sort) => void;
  loading?: boolean;
  onRowClick?: (item: any, index: number) => void;
  collapsed?: boolean;
  caption?: React.ReactNode;
}

const DataTable: FC<Props> = props => {
  const [sort, setSort] = useState<Sort>({
    column: '',
    order: 'asc',
  });
  const [hover, setHover] = useState('');
  const {
    columns,
    rows = [],
    height = 'auto',
    maxHeight = 'auto',

    fixedColumn = false,
    pagination = {
      show: false,
      page: 0,
      rowsPerPage: 10,
      totalCount: 0,
    },
    loading = false,
    onRowClick,
    onSortChange,
    collapsed = false,
    caption,
  } = props;

  const [heightRow, setHeightRow] = useState(0);

  const heightRowRef = useRef<any>(null);

  useEffect(() => {
    setHeightRow(heightRowRef.current?.clientHeight || 0);
  });

  const emptyRows = pagination.page > 0 ? Math.max(0, pagination.rowsPerPage - rows.length) : 0;
  return (
    <Card className="boxTable">
      {loading && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'absolute',
            zIndex: 5,
            height: '100%',
            width: '100%',
          }}
        >
          <CircularProgress />
        </Stack>
      )}
      <PerfectScrollbar>
        <TableContainer className="w-full data-hover" style={{height, maxHeight}}>
          <Table stickyHeader style={{tableLayout: fixedColumn ? 'fixed' : 'auto'}}>
            {caption && (
              <caption
                style={{
                  padding: '0.5rem',
                }}
              >
                {caption}
              </caption>
            )}

            <TableHead>
              <TableRow>
                {rows.findIndex(item => item.children) > -1 && <TableCell width={10} />}
                {columns.map((item: ColumnTableProps, index) => (
                  <TableCell
                    className={`${item.field === 'thaoTac' ? 'sticky right-0' : ''}${
                      item.isSortable ? 'cursor-pointer' : ''
                    }`}
                    width={item.field === 'thaoTac' ? item.width ?? 100 : item.width}
                    sx={{
                      backgroundColor: 'white',
                      minWidth: item.minWidth,
                    }}
                    align={item.center ? 'center' : item.type === 'number' ? 'right' : 'left'}
                    key={index.toString()}
                    onClick={() => {
                      const sortChange: Sort = {
                        order: sort.order === 'asc' && item.field === sort.column ? 'desc' : 'asc',
                        column: item.field,
                      };
                      if (item.isSortable) {
                        setSort(sortChange);
                        onSortChange && onSortChange(sortChange);
                      }
                    }}
                    onMouseEnter={() => {
                      setHover(item.field);
                    }}
                    onMouseLeave={() => {
                      setHover('');
                    }}
                  >
                    <Box className="relative">
                      {item.headerName}
                      {item.isSortable && (sort.column === item.field || hover === item.field) && (
                        <Stack className="absolute top-0 right-8px">
                          {sort.order === 'asc' ? (
                            <ArrowDropUpRounded sx={{fontSize: '24px'}} />
                          ) : (
                            <ArrowDropDownRounded sx={{fontSize: '24px'}} />
                          )}
                        </Stack>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        color: '#999',
                      }}
                    >
                      Không có dữ liệu
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {rows.map((row, index) => (
                <TableRowItem
                  key={index}
                  row={row}
                  index={index}
                  columns={columns}
                  heightRowRef={index === 0 ? heightRowRef : null}
                  onRowClick={onRowClick}
                  collapsed={collapsed}
                />
              ))}
              {emptyRows > 0 && (
                <TableRow style={{height: heightRow * emptyRows}}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
      {pagination.show && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500, 1000]}
          component="div"
          count={pagination.totalCount}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          labelDisplayedRows={({from, to, count}) =>
            `${from}-${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`
          }
          labelRowsPerPage="Số hàng mỗi trang"
          onPageChange={(e, page) => pagination.onPageChange?.(page)}
          onRowsPerPageChange={({target: {value}}) => pagination.onRowsPerPageChange?.(value)}
          showLastButton
          showFirstButton
        />
      )}
    </Card>
  );
};

export default React.memo(DataTable);
