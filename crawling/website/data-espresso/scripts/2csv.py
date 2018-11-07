import json
import pandas as pd
import datetime

class ConvertManager:

    fields = [
        "tieu_de",
        "gia",
        "dien_tich",
        "dia_chi",
        "loai_tin",
        "loai_bds",
        "chieu_ngang",
        "chieu_dai",
        "thuoc_du_an",
        "chu_dau_tu",
        "quy_mo",
        "huong",
        "so_tang",
        "duong_truoc_nha",
        "phap_ly",
        "so_lau",
        "so_toilet",
        "so_phong_ngu",
        "so_phong_tam",
        "phong_an",
        "nha_bep",
        "san_thuong",
        "cho_de_xe_hoi",
        "chinh_chu",
        "lh_ten",
        "lh_dia_chi",
        "lh_sdt",
        "lh_email",
        "mieu_ta",
        "ngay_dang",
        "ngay_cap_nhat",
        "ngay_het_han",
        "url"
    ]
    headers = [
        "Tiêu đề",
        "Giá",
        "Diện tích",
        "Địa chỉ",
        "Loại tin",
        "Loại bđs",
        "Chiều ngang",
        "Chiều dài",
        "Thuộc dự án",
        "Chủ đầu tư",
        "Quy mô",
        "Hướng",
        "Số tầng",
        "Đường trước nhà",
        "Pháp lý",
        "Số lầu",
        "Số toilet",
        "Số phòng ngủ",
        "Số phòng tắm",
        "Phòng ăn",
        "Phòng bếp",
        "Sân thượng",
        "Chỗ để xe hơi",
        "Chính chủ",
        "Liện hệ tên",
        "Liên hệ địa chỉ",
        "Liên hệ sđt",
        "Liên hệ email",
        "Miêu tả",
        "Ngày đăng",
        "Ngày cập nhật",
        "Ngày hết hạn",
        "Từ URL"
    ]

    mua_file = 'Cần_mua_thuê'
    ban_file = 'Cho_bán_thuê'

    @classmethod
    def json_to_exel(cls, file_path, file_format='csv'):

        data_set = []
        data_set_mua = []
        data_set_ban = []

        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f.readlines():
                line = line.strip()
                log_object_dict = json.loads(line)
                rows = cls.log_object_dict_to_rows(log_object_dict)
                data_set += rows
                if len(rows) > 0:
                    if (cls.is_mua(rows[0])):
                        data_set_mua.append(rows[0])
                    else:
                        data_set_ban.append(rows[0])

        print ("Len fields: ", len(cls.fields))
        print ("Len headers: ", len(cls.headers))

        cls.wirte_to_xls(file_path.split('.')[0], data_set, file_format)
        cls.wirte_to_xls(cls.mua_file, data_set_mua, file_format)
        cls.wirte_to_xls(cls.ban_file, data_set_ban, file_format)

    @classmethod
    def wirte_to_xls(cls, file_name, data, file_format):
        str_datetime = '_{0:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())
        out_file_name = file_name + str_datetime

        df = pd.DataFrame(data=data, columns=cls.headers)

        if file_format == 'csv':
            df.to_csv(out_file_name + '.csv', sep='\t', encoding='utf-8')
        elif file_format == 'xls':
            writer = pd.ExcelWriter(out_file_name + '.xls', engine='xlsxwriter')
            df.to_excel(writer, sheet_name='Sheet1', index=False, header=True)

        print ('Len data for file {} is {}'.format(file_name, len(data)))
        print ('Done write to file {}'.format(out_file_name))
        
    @classmethod
    def is_mua(cls, row):
        contain_keywords = ['/can-thue', '/mua-']
        for keyword in contain_keywords:
            if keyword in row[-1] and '/ban-' not in row[-1]:
                return True
        return False

    @classmethod
    def log_object_dict_to_rows(cls, dict_obj): # 1 row now
        fields_dict = dict_obj.get('fields')
        row = []

        is_at_least_no_empty = False
        for field in cls.fields:
            es_field = "bds_{}".format(field)
            
            if field == "tieu_de":
                es_field = "title"

            if field == "url":
                es_field = "url"
            
            field_data = fields_dict.get(es_field, [])

            if len(field_data) > 0:
                if es_field[:3] == 'bds':
                    is_at_least_no_empty = True
                row_data = field_data[0]
                if es_field == 'bds_mieu_ta':
                    row_data = ''
                    for m in field_data:
                        row_data += m + ' '
                    row_data = row_data.strip()
                row.append(row_data)
            else:
                row.append('')

        if is_at_least_no_empty:
            return [row]
        else:
            return []

if __name__ == '__main__':
    ConvertManager.json_to_exel('index.json', 'xls')