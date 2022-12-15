import {Stack} from '@mui/material';
import {ArrowLeft, ArrowRight} from 'iconsax-react';
import React, {FC} from 'react';
import {COLORS} from '../../../../constants';
import {ButtonGroupProps} from '../../../types';
import ButtonBase from '../../button-base';

interface Props {
  onChange: (index: number) => void;
  items: ButtonGroupProps[];
  value: number | string;
  minWidth?: number | undefined;
}

export interface TabBarProps extends Props {}

const TabBar: FC<Props> = props => {
  const {onChange, value, items = []} = props;

  const handleChange = (index: number) => {
    onChange && onChange(index);
  };

  return (
    <Stack direction="row" className="BoxTopTab">
      {items.map((item, index: number) => {
        const {
          color = 'primary',
          startIcon: StartIcon = ArrowLeft,
          endIcon: EndIcon = ArrowRight,
          count,
          countPosition = 'end',
        } = item;
        return (
          <div className="m-1" key={index}>
            <ButtonBase
              variant={value === index ? 'contained' : 'outlined'}
              color={item.color}
              onClick={() => handleChange(index)}
              startIcon={
                item.startIcon ? (
                  <StartIcon color={value === index ? '#fff' : COLORS[color]} />
                ) : count !== undefined ? (
                  count >= 0 &&
                  countPosition === 'start' && (
                    <div
                      // className={`py-0.5 px-1`}
                      style={{
                        fontSize: 12,
                        borderLeftColor: COLORS[`${color}-dark`],
                        borderLeftWidth: 1,
                        borderLeftStyle: 'solid',
                        paddingLeft: '5px',
                        // backgroundColor: COLORS[color],
                      }}
                    >
                      {count}
                    </div>
                  )
                ) : null
              }
              endIcon={
                item.endIcon ? (
                  <EndIcon color={value === index ? '#fff' : COLORS[color]} />
                ) : count !== undefined ? (
                  count >= 0 &&
                  countPosition === 'end' && (
                    <div
                      // className={`py-0.5 px-1`}
                      style={{
                        fontSize: 12,
                        borderLeftColor: COLORS[`${color}-dark`],
                        borderLeftWidth: 1,
                        borderLeftStyle: 'solid',
                        paddingLeft: '5px',
                        // backgroundColor: COLORS[color],
                      }}
                    >
                      {count}
                    </div>
                  )
                ) : null
              }
              label={item.label}
            />
          </div>
        );
      })}
    </Stack>
  );
};

export default TabBar;
