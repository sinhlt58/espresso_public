export const getDomain = (enumValue) => {
  switch (enumValue) {
    case 'SHOPEE':
      return 'shopee.vn';
    case 'TIKI':
      return 'tiki.vn';
    case 'LAZADA':
      return 'lazada.vn';
    default:
      return '';
  }
};
