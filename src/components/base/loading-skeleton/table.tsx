import {
  Card,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

export interface TableSkeletonProps {
  numberOfRows?: number;
  numberOfColumns?: number;
  widths?: Array<number | string>;
  className?: string;
}

export default function TableSkeleton(props: TableSkeletonProps) {
  const {numberOfColumns = 5, numberOfRows = 10, widths, className = ''} = props;
  const arrRow = Array.from(Array(numberOfRows).keys());
  const arrCol = Array.from(Array(numberOfColumns).keys());

  return (
    <Card className={'boxTable' + className}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="table skeleton" style={{tableLayout: 'fixed'}}>
          <TableHead>
            <TableRow>
              {arrCol.map((col, index) => (
                <TableCell key={col} width={widths && widths[index]}>
                  <Skeleton />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {arrRow.map(row => (
              <TableRow key={row} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                {arrCol.map((col, index) => (
                  <TableCell key={col} width={widths && widths[index]}>
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
