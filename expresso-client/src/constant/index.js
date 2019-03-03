export const uri = process.env.REACT_APP_GRAPHQL_URI;
export const apiUri = process.env.REACT_APP_API_URI;

export const optionsSort = [
  {
    value: 'ASC',
    label: 'Điểm từ thấp đến cao',
  },
  {
    value: 'DESC',
    label: 'Điểm từ cao đến thấp',
  },
];

export const optionsDomain = [
  {
    value: 'ALL',
    label: 'Tất cả các kênh',
  },
  {
    value: 'TIKI',
    label: 'Tiki.vn',
  },
  {
    value: 'SHOPEE',
    label: 'Shopee.vn',
  },
  {
    value: 'LAZADA',
    label: 'Lazada.vn',
  },
];

export const optionsRange = [
  {
    value: 'date',
    label: 'Theo ngày',
  },
  {
    value: 'month',
    label: 'Theo tháng',
  },
];

export const optionsType = [
  {
    value: 'brand',
    label: 'Theo thương hiệu',
  },
  {
    value: 'shop',
    label: 'Theo cửa hàng',
  },
];

export const optionsStar = [
  {
    value: '0',
    label: 'Tất cả các sao',
  },
  {
    value: '5',
    label: 'Chỉ 5 sao',
  },
  {
    value: '4',
    label: 'Chỉ 4 sao',
  },
  {
    value: '3',
    label: 'Chỉ 3 sao',
  },
  {
    value: '2',
    label: 'Chỉ 2 sao',
  },
  {
    value: '1',
    label: 'Chỉ 1 sao',
  },
];

export const INTERVAL = {
  day: 86400,
  month: 2629743.83,
};
