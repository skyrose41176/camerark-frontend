import {Camera, Home, Profile2User, Translate} from 'iconsax-react';
export interface Sidebar {
  href: string;
  icon?: any;
  title: string;
  children?: Sidebar[];
}
export const sidebars = (): Sidebar[] => {
  return [
    {
      href: '/danh-sach-san-pham',
      icon: Camera,
      title: 'Sản phẩm',
    },
    {
      href: '/danh-sach-kho-hang',
      icon: Home,
      title: 'Kho',
    },
    {
      href: '/danh-sach-giao-dich',
      icon: Translate,
      title: 'Giao dịch',
    },
    {
      href: '/danh-sach-nguoi-dung',
      icon: Profile2User,
      title: 'Người dùng',
    },
  ];
};
export default sidebars;
