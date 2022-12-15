import { Stack} from '@mui/material';
import {ArrowLeft, ArrowRight} from 'iconsax-react';
import React, {FC, useEffect, useState} from 'react';
import {COLORS} from '../../../constants';
import {ButtonGroupProps} from '../../types';
import ButtonBase from '../button-base';

interface Props {
  init: number;
  data: ButtonGroupProps[];
  onActive?: (button: ButtonGroupProps, index: number) => void;
  reset?: boolean;
  minWidth?: number;
}

const ButtonGroup: FC<Props> = props => {
  const {init = 0, data = [], onActive, reset, minWidth} = props;
  const [active, setActive] = useState(init);

  const handleActive = (item: ButtonGroupProps, index: number) => {
    setActive(index);
    onActive && onActive(item, index);
  };
  useEffect(() => {
    setActive(init || 0);
  }, [reset, init]);

  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" className="BoxTopTab">
      {data.map((item, index) => {
        const {
          startIcon: StartIcon = ArrowLeft,
          endIcon: EndIcon = ArrowRight,
          color = 'primary',
          count,
          countPosition = 'end',
        } = item;
        return (
          <div
            key={item.id.toString()}
            className={index === data.length - 1 ? 'm-1' : 'm-1'}
            style={{minWidth}}
          >
            <ButtonBase
              variant={active === index ? 'contained' : 'outlined'}
              color={item.color}
              onClick={() => handleActive(item, index)}
              uppercase
              startIcon={
                item.startIcon ? (
                  <StartIcon color={active === index ? '#fff' : COLORS[color]} />
                ) : count !== undefined ? (
                  count >= 0 &&
                  countPosition === 'start' && (
                    <div
                      className={`px-1`}
                      style={{
                        fontSize: 12,
                        borderColor: COLORS[`${color}-dark`],
                        borderWidth: 1,
                        borderStyle: 'solid',
                        backgroundColor: active === index ? '#fff' : COLORS[color],
                        borderRadius: 4,
                        color: active !== index ? '#fff' : COLORS[color],
                      }}
                    >
                      {count}
                    </div>
                  )
                ) : null
              }
              endIcon={
                item.endIcon ? (
                  <EndIcon color={active === index ? '#fff' : COLORS[color]} />
                ) : count !== undefined ? (
                  count >= 0 &&
                  countPosition === 'end' && (
                    <div
                      className={`px-1`}
                      style={{
                        fontSize: 12,
                        borderColor: COLORS[`${color}-dark`],
                        borderWidth: 1,
                        borderStyle: 'solid',
                        backgroundColor: active === index ? '#fff' : COLORS[color],
                        borderRadius: 4,
                        color: active !== index ? '#fff' : COLORS[color],
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

export default ButtonGroup;
