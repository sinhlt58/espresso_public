export const getDomain = (enumValue) => {
  switch (enumValue) {
    case 'SHOPEE':
      return 'shopee.vn';
    case 'TIKI':
      return 'tiki.vn';
    case 'LAZADA':
      return 'lazada.vn';
    case 'YES24':
      return 'yes24.vn';
    case 'VATGIA':
      return 'vatgia.com';
    default:
      return '';
  }
};
