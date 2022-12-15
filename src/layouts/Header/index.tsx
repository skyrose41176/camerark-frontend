import {AppBar, AppBarProps, Stack, Toolbar, Typography} from '@mui/material';
import {ArrowLeft2} from 'iconsax-react';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {getTimeFromMins} from 'src/utils/format';
import {IconButtonBase} from '../../components/base';
import {COLORS} from '../../constants';
interface Props extends Omit<AppBarProps, 'title'> {
  title: React.ReactNode | string;
  sla?: number | string;
  actions?: any;
}

const Header = (props: Props) => {
  const {title, sla, actions, ...rest} = props;
  const navigate = useNavigate();
  const handleClickGoBack = () => {
    navigate(-1);
  };

  return (
    <AppBar elevation={3} {...rest} position="sticky">
      <Toolbar variant="dense" className="bg-white flex justify-between min-h-64">
        <Stack direction="row" alignItems="center" className="box-appbar">
          <IconButtonBase
            iconName={ArrowLeft2}
            hasBackground
            rounded={false}
            onClick={handleClickGoBack}
          />
          <Typography className="flex" variant="subtitle2" ml={1} color={COLORS.primary}>
            {title}
          </Typography>
        </Stack>
        {actions}
        {sla && (
          <Typography className="flex" variant="subtitle2" ml={1} color={COLORS.primary}>
            SLA: {getTimeFromMins(+sla)}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
