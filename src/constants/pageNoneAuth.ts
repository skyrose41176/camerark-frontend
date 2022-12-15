export const pageNoneAuth = ({
  roles,
  currentPath,
}: {
  roles?: string[];
  currentPath?: string;
}): boolean => {
  const listPage = [
    '/thong-tin-ca-nhan',
    '/danh-sach-phieu-yeu-cau',
    '/chi-tiet-ho-so',
    '/tim-kiem',
  ];

  if (currentPath && listPage.includes('/' + currentPath.split('/')[1])) {
    return !!listPage?.find(page => currentPath.includes(page));
  }

  if (roles) {
    return !!roles?.find(role => ['1'].includes(role));
  }
  return false;
};
