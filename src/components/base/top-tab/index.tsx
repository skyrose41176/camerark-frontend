import {useTheme} from '@emotion/react';
import {Box} from '@mui/material';
import React, {FC, useEffect} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {ButtonGroupProps} from '../../types';
import TabBar from './tab-bar';
import TabPanel from './tab-panel';

interface Props {
  init: number;
  tabs: ButtonGroupProps[];
  panels: React.ReactNode[];
  buttonMinWidth?: number;
  tabRightComponent?: React.ReactNode;
  onChange: (tab: ButtonGroupProps) => void;
}

const TopTab: FC<Props> = props => {
  const {init = 0, tabs, buttonMinWidth, panels = [], tabRightComponent, onChange} = props;
  const theme: any = useTheme();
  const [value, setValue] = React.useState(init);

  const handleChangeIndex = (index: number) => {
    setValue(index);
    onChange && onChange(tabs[index]);
  };
  useEffect(() => {
    setValue(init || 0);
  }, [tabs, init]);

  return (
    <div>
      <Box
        className="box-main-tab"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <TabBar minWidth={buttonMinWidth} items={tabs} value={value} onChange={handleChangeIndex} />
        {tabRightComponent}
      </Box>

      <SwipeableViews
        enableMouseEvents={false}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{
          overflowX: 'hidden',
        }}
      >
        {panels.map((item, index) => (
          <TabPanel key={index.toString()} value={value} index={index}>
            {item}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};

export {TabBar, TabPanel};
export default TopTab;
