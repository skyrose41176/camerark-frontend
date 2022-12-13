import {Box, Button, Container, Typography} from '@mui/material';
// material
import {styled} from '@mui/material/styles';
import {Link as RouterLink} from 'react-router-dom';
import Page from '../../layouts/Page';
// components

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({theme}) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <RootStyle>
      <Container>
        <Box sx={{maxWidth: 480, margin: 'auto', textAlign: 'center'}}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{color: 'text.secondary'}}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src="/illustrations/illustration_404.svg"
            sx={{height: 260, mx: 'auto', my: {xs: 5, sm: 10}}}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Về trang chủ
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
