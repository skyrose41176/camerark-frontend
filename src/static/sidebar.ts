import {SearchNormal, TableDocument} from 'iconsax-react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
export interface Sidebar {
  href: string;
  icon?: any;
  title: string;
  children?: Sidebar[];
}
export const sidebars = (): Sidebar[] => {
  return [
    {
      href: '/danh-sach-phieu-yeu-cau',
      icon: TableDocument,
      title: 'Danh sách sản phẩm',
    },
    {
      href: '/danh-sach-phieu-yeu-cau',
      icon: TableDocument,
      title: 'Danh sách sản phẩm',
    },
    {
      href: '/danh-sach-phieu-yeu-cau',
      icon: TableDocument,
      title: 'Danh sách giao dịch',
    },
    {
      href: '/tim-kiem',
      icon: SearchNormal,
      title: 'Tìm kiếm',
    },
    {
      href: '/quan-ly',
      icon: ManageAccountsIcon,
      title: 'Quản lý',
      children: [
        {
          href: '/quan-ly/loai-nghiep-vu',
          title: 'Loại nghiệp vụ',
        },
        {
          href: '/quan-ly/loai-yeu-cau',
          title: 'Loại yêu cầu',
        },
        {
          href: '/quan-ly/bo-phan',
          title: 'Bộ phận',
        },
        {
          href: '/quan-ly/danh-sach-nhan-su',
          title: 'Danh sách nhân sự',
        },
      ],
    },
  ];
};
export default sidebars;
