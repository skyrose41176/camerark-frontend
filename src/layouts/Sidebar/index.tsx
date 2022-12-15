import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import {SidebarLeft, SidebarRight} from 'iconsax-react';
import {FC, useEffect, useMemo, useState} from 'react';
import {matchPath, useLocation, useNavigate} from 'react-router-dom';
import {IconButtonBase, SearchBar} from 'src/components/base';
import {selectInfoUser, setInfoUser} from 'src/redux/slice/authSlice';
// import {nguoiDungService} from 'src/services/saturn';
import sidebars, {Sidebar as ISidebar} from 'src/static/sidebar';
import {avatar} from 'src/utils';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import NavItem from './NavItem';
import './anim.css';
import {pageNoneAuth} from 'src/constants/pageNoneAuth';
import {useGetOneNhanSu} from 'src/apis';
interface Props {
  onMobileClose?: () => void;
  openMobile?: boolean;
  onCollapse?: (collapse: boolean) => void;
}
const filterByRole = (sidebar: ISidebar[], roles: string[]) => {
  return sidebar.filter(item => {
    return (
      roles.some(role => {
        // console.log(role + '/*', {href: item.href});
        return !!matchPath(
          {
            path: item.href + '/*',
            caseSensitive: true,
            // end: true,
          },
          role
        );
      }) ||
      pageNoneAuth({
        roles,
        currentPath: item.href + '/*',
      })
    );
  });
};
const Sidebar: FC<Props> = ({onMobileClose, openMobile, onCollapse}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const [hover, setHover] = useState(true);
  const infoUser = useAppSelector(selectInfoUser);
  const {name, phone} = infoUser;
  console.log(infoUser);

  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const {isLoading} = useGetOneNhanSu(Id, data => {
    dispatch(
      setInfoUser({
        ...infoUser,
        ...data,
        // roles: Array.isArray(data.roles) ? data.roles : data.roles ? [data.roles] : [],
      })
    );
  });

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = useMemo(
    () => (
      <Box className="sidebar flex flex-1" sx={{p: '10px', pt: 0, overflowY: 'auto'}}>
        <List className="w-full">
          {filterByRole(sidebars(), infoUser.roles)
            .filter(item => {
              const lengthChild =
                item.children?.filter(obj => obj.title.toLowerCase().includes(search.toLowerCase()))
                  ?.length ?? 0;
              return item.title.toLowerCase().includes(search.toLowerCase()) || lengthChild > 0;
            })
            .map(item => (
              <NavItem
                key={item.title}
                item={item}
                collapse={collapse}
                hover={hover}
                search={search}
              />
            ))}
        </List>
      </Box>
    ),
    [infoUser.roles, search, collapse, hover]
  );

  const handleCollapse = () => {
    if (hover) {
      setHover(false);
    }
    onCollapse && onCollapse(!collapse);
    setCollapse(!collapse);
  };

  return (
    <>
      <Hidden>
        <Drawer
          onMouseEnter={() => {
            collapse && setHover(true);
          }}
          onMouseLeave={() => {
            collapse && setHover(false);
          }}
          anchor="left"
          open={collapse}
          variant="permanent"
          PaperProps={{
            sx: {
              width: collapse ? (hover ? 210 : 60) : 210,
              transition: 'width 0.2s ease',
              background: '#133886',
              overflowX: 'hidden',
            },
          }}
          sx={{position: 'relative'}}
        >
          <Stack display="flex" alignItems="center" style={{padding: 10}}>
            {true ? (
              <Avatar
                onClick={() => navigate('/thong-tin-ca-nhan')}
                sx={{backgroundColor: avatar.getColor(TenNhanVien)}}
                className={`border-2 border-solid border-[#ececec] font-bold text-base cursor-pointer`}
                src={anhDaiDien}
              >
                {avatar.generateName(TenNhanVien)}
              </Avatar>
            ) : (
              <Skeleton
                sx={{bgcolor: 'white.700'}}
                variant="circular"
                width={40}
                height={40}
                animation="wave"
              />
            )}
            {(hover || !collapse) && (
              <>
                {TenNhanVien ? (
                  <Typography variant="body2" color="#fff" marginTop={1} textAlign="center">
                    {TenNhanVien}
                  </Typography>
                ) : (
                  <Skeleton
                    sx={{bgcolor: 'white.700'}}
                    variant="text"
                    width={150}
                    height={30}
                    animation="wave"
                  />
                )}
                {ChucVu ? (
                  <Typography
                    variant="caption"
                    component="p"
                    color="#fff"
                    marginTop={1}
                    textAlign="center"
                  >
                    {ChucVu}
                  </Typography>
                ) : (
                  <Skeleton
                    sx={{bgcolor: 'white.700'}}
                    variant="text"
                    width={200}
                    height={40}
                    color="inherit"
                    animation="wave"
                  />
                )}
              </>
            )}
          </Stack>

          <Divider className="bg-primary" />
          <div className="p-2">
            <SearchBar onSubmit={setSearch} width="auto" placeholder="Nhập tên menu" />
          </div>
          {content}
          <Divider className="bg-primary" />

          <div
            className={`${
              collapse ? 'collapseAnim' : 'expandAnim'
            } flex flex-col items-center justify-center my-4`}
          >
            <IconButtonBase
              iconName={collapse ? SidebarRight : SidebarLeft}
              color="inherit"
              hasBackground
              tooltip={collapse ? 'Ghim' : 'Thu nhỏ'}
              onClick={handleCollapse}
            />
          </div>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
