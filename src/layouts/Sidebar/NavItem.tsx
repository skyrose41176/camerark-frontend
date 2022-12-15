import { Button, Collapse, ListItem, Stack } from "@mui/material";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import React, { useEffect, useState } from "react";
import {
  matchPath,
  NavLink as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { pageNoneAuth } from "src/constants/pageNoneAuth";
import { useAppSelector } from "src/redux/hooks";
import { selectInfoUser } from "src/redux/slice/authSlice";
import { Sidebar } from "src/static/sidebar";
import { colors } from "../../theme";

interface Props {
  item: Sidebar;
  collapse?: boolean;
  hover?: boolean;
  rest?: any;
  search?: string;
}
const filterByRole = (sidebar: Sidebar[], roles: string[]) => {
  return sidebar.filter((item) => {
    return (
      roles.some((role) => {
        console.log(role + "/*", { href: item.href });
        return !!matchPath(
          {
            path: item.href + "/*",
            caseSensitive: true,
            // end: true,
          },
          role
        );
      }) ||
      pageNoneAuth({
        roles,
      })
    );
  });
};
const NavItem = ({
  item,
  collapse = false,
  hover = true,
  search = "",
  ...rest
}: Props) => {
  const { href, icon: Icon, title, children = [] } = item;
  const location = useLocation();
  const navigate = useNavigate();
  const [childrenActive, setChildrenActive] = useState(false);
  const infoUser = useAppSelector(selectInfoUser);
  const active = href
    ? !!matchPath(
      {
        path: href,
        end: false,
      },
      location.pathname
    )
    : false;
  // const active=
  const handleClickCollapse = () => {
    if (children.length !== 0) {
      setChildrenActive((prev) => !prev);
    } else {
      navigate(href);
    }
  };
  const highLight = (text: string) => {
    if (search) {
      let re = new RegExp(search, "i");
      const indexOfFirst = text.toLowerCase().indexOf(search.toLowerCase());
      const indexOfLast = indexOfFirst + search.length;
      let newText = text.replace(
        re,
        `<mark style="color:#F44336; background-color: transparent"}}>${text.slice(
          indexOfFirst,
          indexOfLast
        )}</mark>`
      );
      return <span dangerouslySetInnerHTML={{ __html: newText }} />;
    } else return <span>{text}</span>;
  };

  useEffect(() => {
    if (search) {
      setChildrenActive(
        children.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        ).length > 0
      );
    } else {
      setChildrenActive(false);
    }
  }, [search]);
  return (
    <>
      <ListItem disableGutters className="py-1 flex" {...rest}>
        <Button
          className="flex justify-between py-1 font-normal text-white hover:bg-primary-dark w-full"
          sx={{
            backgroundColor:
              href === "/tong-quan"
                ? location.pathname.includes("tong-quan")
                  ? colors.primaryDark
                  : null
                : location.pathname.includes(`/${href?.split("/")[1]}/`)
                  ? colors.primaryDark
                  : null,
            // ...(active && {
            //   backgroundColor: colors.primaryDark,
            // }),
            "& svg": {
              mr: 1,
            },
          }}
          onClick={handleClickCollapse}
        >
          <Stack direction="row">
            {Icon && <Icon size={20} color="#fff" />}
            {(!collapse || hover) && highLight(title)}
          </Stack>
          {(!collapse || hover) &&
            // filterByRole(children, infoUser?.roles ?? []).length !== 0 &&
            children.length !== 0 && (childrenActive ? (
              <ArrowUp2 size={16} color="#fff" />
            ) : (
              <ArrowDown2 size={16} color="#fff" />
            ))}
        </Button>
      </ListItem>
      {(!collapse || hover) &&
        // filterByRole(children, infoUser?.roles ?? []).length !== 0 && (
        <Collapse in={childrenActive}>
          {
            // filterByRole(children, infoUser?.roles ?? [])
            //   .filter((item) =>
            //     item.title.toLowerCase().includes(search.toLowerCase())
            //   )
            children.map((item) => (
              <ListItem
                key={item.href}
                disableGutters
                sx={{
                  display: "flex",
                  py: 0.5,
                }}
                {...rest}
              >
                <Button
                  component={RouterLink}
                  className="flex flex-row justify-start py-1 pl-10 font-normal text-white hover:bg-primary-dark w-full"
                  sx={{
                    backgroundColor: location.pathname.includes(item.href)
                      ? colors.primaryDark
                      : null,
                    "& svg": {
                      mr: 1,
                    },
                  }}
                  to={item.href}
                >
                  {(!collapse || hover) && highLight(item.title)}
                </Button>
              </ListItem>
            ))}
        </Collapse>
        // )
      }
    </>
  );
};

export default NavItem;
