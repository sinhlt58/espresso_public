import utils
import re

class EsRecord:

    domain_data = {
        'bds': {
            'important_fields': ['bds_lh_sdt']
        },
        'ttn': {
            'important_fields': ['ttn_tieu_de']
        }
    }

    csv_fields = [
        ["ngay_dang", "Ngày đăng"],
        ["tieu_de", "Tiêu đề"],
        ["gia", "Giá"],
        ["dien_tich", "Diện tích"],
        ["gia_chuan_hoa", "Giá chuẩn hóa (triệu/m2)"],
        ["dia_chi", "Địa chỉ"],
        ["lh_ten", "Liện hệ tên"],
        ["lh_dia_chi", "Liên hệ địa chỉ"],
        ["lh_sdt", "Liên hệ sđt"],
        ["lh_email", "Liên hệ email"],
        ["loai_tin", "Loại tin"],
        ["loai_bds", "Loại bđs"],
        ["chieu_ngang", "Chiều ngang"],
        ["chieu_dai", "Chiều dài"],
        ["thuoc_du_an", "Thuộc dự án"],
        ["chu_dau_tu", "Chủ đầu tư"],
        ["quy_mo", "Quy mô"],
        ["huong", "Hướng"],
        ["so_tang", "Số tầng"],
        ["duong_truoc_nha", "Đường trước nhà"],
        ["phap_ly", "Pháp lý"],
        ["so_lau", "Số lầu"],
        ["so_toilet", "Số toilet"],
        ["so_phong_ngu", "Số phòng ngủ"],
        ["so_phong_tam", "Số phòng tắm"],
        ["phong_an", "Phòng ăn"],
        ["nha_bep", "Phòng bếp"],
        ["san_thuong", "Sân thượng"],
        ["cho_de_xe_hoi", "Chỗ để xe hơi"],
        ["chinh_chu", "Chính chủ"],
        ["mieu_ta", "Miêu tả"],
        ["ngay_cap_nhat", "Ngày cập nhật"],
        ["ngay_het_han", "Ngày hết hạn"],
        ["url", "Từ URL"],
    ]

    def __init__(self, data):
        self.data = data
        self.domain = None

    def __hash__(self):
        return hash(('title', self.get_title()))

    def __eq__(self, other):
        return self.get_title().lower() == \
               other.get_title().lower()

    def process(self):
        domain = self.get_domain()
        return getattr(self, 'process_{}_domain'.format(domain))()

    def process_bds_domain(self):
        res = {
            'domain_type': 'bds'
        }

        # get bds loai tin
        bds_type = EsRecord.get_bds_type(self)
        res['bds_type'] = bds_type

        # normalize dien tich

        # get as a row in csv file
        res['bds_row'] = EsRecord.get_bds_row(self)

        return res

    @classmethod
    def get_bds_type(cls, record):
        url = record.get_first_value('url').lower()
        title = record.get_first_value('title').lower()

        if ('/can-mua' in url or 'cần mua' in title)\
            and 'bán' not in title:
            return 'bds_mua'
        if '/can-thue' in url or 'cần thuê'in title\
            and 'bán' not in title:
            return 'bds_can_thue'
        if '/cho-thue' in url or 'cho thuê' in title:
            return 'bds_cho_thue'
        return 'bds_ban'

    @classmethod
    def get_bds_row(cls, record):
        row = []

        is_at_least_no_empty = False
        for field in cls.csv_fields:
            es_field = "bds_{}".format(field[0])
            
            if field[0] == "tieu_de":
                bds_title = record.get_first_value(es_field, None)
                if bds_title is None:
                    es_field = "title"

            if field[0] == "url":
                es_field = "url"
            
            if field[0] == "gia_chuan_hoa":
                field_data = EsRecord.normalize_bds_price(record)
            else:
                field_data = record.get(es_field, [])

            if len(field_data) > 0:
                if es_field[:3] == 'bds':
                    is_at_least_no_empty = True
                
                row_data = field_data[0]
                
                if es_field == 'bds_mieu_ta':
                    row_data = utils.strs_to_str(field_data)
                
                row.append(row_data)
            else:
                row.append('')

        return row

    @classmethod
    def normalize_bds_price(cls, record):
        gia_rule = r'(([0-9]*[.])?[0-9]+ triệu)|(([0-9]*[.])?[0-9]+ tỷ)'
        dien_tich_rule = r'(([0-9]*[.])?[0-9]+)'
        gia = record.get_first_value('bds_gia')
        dien_tich = record.get_first_value('bds_dien_tich')

        normalized_price = []

        if gia and dien_tich and\
            len(gia) > 0 and len(dien_tich) > 0:
            if '/m²' in gia:
                return [gia.split()[0]]

            gia = gia.lower()
            gia = gia.replace(',', '.')
            dien_tich = dien_tich.lower()

            match_gia_group = re.findall(gia_rule, gia)
            match_gia = []
            for m in match_gia_group:
                if len(m[0]) > 0:
                    match_gia.append(m[0])
                elif len(m[2]) > 0:
                    match_gia.append(m[2])

            match_dien_tich_group = re.findall(dien_tich_rule, dien_tich)
            match_dien_tich = []
            for m in match_dien_tich_group:
                if len(m[0]) > 0:
                    match_dien_tich.append(m[0])

            len_match_gia = len(match_gia)
            len_match_dien_tich = len(match_dien_tich)

            if len_match_gia == len_match_dien_tich\
                and len_match_gia > 0:
                for i in range(0, len_match_gia):
                    normalized_price.append(EsRecord.get_normalized_gia(match_gia[i], match_dien_tich[i]))
            
        return [" - ".join(normalized_price)]

    @classmethod
    def get_normalized_gia(cls, gia_str, dien_tich_str):
        gia_tokens = gia_str.split(' ')
        num_gia = float(gia_tokens[0])
        
        if gia_tokens[1] == 'tỷ':
            num_gia *= 1000
        num_dien_tich = float(dien_tich_str)
        if num_dien_tich == 0:
            num_dien_tich = 1
        normalized_price = num_gia / num_dien_tich
        return "%.3f" % normalized_price

    def process_ttn_domain(self):
        return {}
    
    def get_title(self):
        if not 'title' in self.data['fields']:
            return ''
        return self.data['fields']['title'][0]

    def get_domain(self):
        if not self.domain:
            for k, domain_data in self.domain_data.items():
                if self.is_all_not_empty(domain_data.get('important_fields')):
                    self.domain = k
                    break
            if not self.domain:
                self.domain = 'unknow'
        return self.domain

    def is_all_not_empty(self, fields):
        for field in fields:
            if self.get(field, None) is None:
                return False
        return True

    def get_first_value(self, field, default=None):
        res = self.get(field, default)
        if res and type(res) == list:
            return res[0]
        return default

    def get(self, field, default):
        return self.data['fields'].get(field, default)

    @classmethod
    def remove_untitle_record(cls, records):
        return list(filter(lambda r: 'title' in r.data['fields'], records))

    @classmethod
    def find_indices_by_title(cls, records, title):
        res = []
        for i, record in enumerate(records):
            if 'title' in record.data['fields']:
                if title.lower() == record.get_title().lower():
                    res.append(i)
        return res

    @classmethod
    def remove_duplicate(cls, records):
        return list(set(records))

    @classmethod
    def to_json(cls, records):
        res = []
        for r in records:
            res.append(r.data)
        return res