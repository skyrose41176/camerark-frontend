import {Typography} from '@mui/material';
import React from 'react';

interface Props {
  labelWidth?: number;
  contentWidth?: number;
  data: {
    label: React.ReactNode;
    value?: React.ReactNode;
    valueBold?: boolean;
    html?: string;
  }[];
  className?: string;
}
const TableThongTin = ({labelWidth, data = [], className = ''}: Props) => {
  return (
    <table className={'w-full table-data ' + className}>
      {data.map((item, index) => (
        <tr key={index} className="h-22px">
          <td style={{width: labelWidth}}>
            <Typography variant="body2">{item?.label}:</Typography>
          </td>
          <td>
            <Typography variant="body2">
              {item.html ? (
                <div className="ml-4" dangerouslySetInnerHTML={{__html: item?.html ?? ''}} />
              ) : (
                <pre
                  className={`${item?.valueBold ? 'font-bold ml-1' : 'font-normal ml-1'}`}
                  style={{whiteSpace: 'pre-wrap'}}
                >
                  {item?.value}
                </pre>
              )}
            </Typography>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default TableThongTin;
