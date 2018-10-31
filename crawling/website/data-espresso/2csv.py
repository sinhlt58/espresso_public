import json
import pandas as pd
import datetime

class ConvertManager:

    fields = ['tieu_de', 'quan_huyen', 'gia', 'mieu_ta', 'ngay_dang', 'ngay_cap_nhat']
    headers = ["Tiêu đề", "Quận huyện", "Giá", "Miêu tả", "Ngày đăng", "Ngày cập nhật", 'Từ url']

    @classmethod
    def json_to_exel(cls, file_path, file_format='csv'):

        data_set = []

        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f.readlines():
                line = line.strip()
                log_object_dict = json.loads(line)
                rows = cls.log_object_dict_to_rows(log_object_dict)
                data_set += rows

        str_datetime = '_{0:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())
        out_file_name = file_path.split('.')[0] + str_datetime

        df = pd.DataFrame(data=data_set, columns=cls.headers)

        if file_format == 'csv':
            df.to_csv(out_file_name + '.csv', sep='\t', encoding='utf-8')
        elif file_format == 'xls':
            writer = pd.ExcelWriter(out_file_name + '.xls', engine='xlsxwriter')
            df.to_excel(writer, sheet_name='Sheet1', index=False, header=True)

        print ('Done write to file {}'.format(out_file_name))

    @classmethod
    def log_object_dict_to_rows(cls, dict_obj):
        fields_data = []
        fields_dict = dict_obj.get('fields')
        max_num_rows = 0
        for field in cls.fields:
            field_data = fields_dict.get(field, [])
            fields_data.append(field_data)
            n = len(field_data)
            if n > max_num_rows:
                max_num_rows = n

        rows = []
        if max_num_rows > 1:
            for i in range(0, max_num_rows):
                row = []
                for field_data in fields_data:
                    if i < len(field_data):
                        row.append(field_data[i])
                    else:
                        row.append("")
                row.append(fields_dict.get('url')[0])
                rows.append(row)

        return rows

if __name__ == '__main__':
    ConvertManager.json_to_exel('index.json', 'xls')