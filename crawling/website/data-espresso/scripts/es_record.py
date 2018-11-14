import utils
import re

class EsRecord:

    domain_data = {
        'bds': {
            'important_fields': ['bds_lh_sdt', 'bds_gia', 'bds_dien_tich', 'bds_ngay_dang']
        },
        'ttn': {
            'important_fields': ['ttn_tieu_de', 'ttn_bl_diem']
        }
    }

    csv_fields = [
        ['stt', 'STT', 'cc,nd,dn'],
        ['ngay_dang', 'Thời gian đăng', 'cc,nd,dn'],
        ['dia_chi', 'Địa chỉ', 'dn'],
        ['cc_phong', 'Phòng', 'cc'],
        ['cc_tang', 'Tầng', 'cc'],
        ['cc_toa_nha', 'Tòa Nhà', 'cc'],
        ['dc_so_nha', 'Số Nhà', 'nd'],
        ['dc_ngo', 'Ngõ', 'nd,dn'],
        ['dc_pho_duong', 'Phố', 'cc,nd,dn'],
        ['dc_quan_huyen', 'Quận', 'cc,nd,dn'],
        ['dien_tich', 'Diện Tích', 'cc,nd,dn'],
        ['gia_chuan_hoa', 'Giá/m2', 'cc,nd,dn'],
        ['loai_dat', 'Loại Đất', 'dn'],
        ['huong', 'Hướng cửa vào', 'cc'],
        ['huong', 'Hướng', 'nd,dn'],
        ['duong_vao', 'Đường vào', 'nd,dn'],
        ['mat_tien', 'Mặt tiền', 'nd,dn'],
        ['co_cua_hau_khong', 'Có cửa hậu không', 'nd'],
        ['oto_dau_cua', 'Ô tô đậu cửa', 'nd,dn'],
        ['nha_xay_lau_chua', 'Nhà xây lâu chưa', 'nd'],
        ['so_tang', 'Số tầng', 'nd'],
        ['so_phong', 'Số phòng', 'nd'],
        ['thuoc_du_an', 'Dự án', 'cc,dn'],
        ['chu_dau_tu', 'Chủ đầu tư', 'cc'],
        ['huong_ban_cong', 'Hướng ban công', 'cc'],
        ['huong_vao_cua', 'Hướng cửa vào', 'cc'],
        ['vi_tri_can_ho', 'Vị trí căn hộ', 'cc'],
        ['cho_de_xe', 'Chỗ đỗ xe', 'cc'],
        ['noi_that', 'Nội thất', 'cc,nd'],
        ['cc_mini', 'CC Mini', 'cc'],
        ['so_phong_ngu', 'Phòng ngủ', 'cc'],
        ['so_toilet', 'Số nhà WC', 'cc'],
        ['lh_sdt', 'Điện thoại', 'cc,nd,dn'],
        ['lh_ten', 'Tên người đăng', 'cc,nd,dn'],

        ['gia', '', ''],
        ['dc_thanh_pho', '', ''],
        ['vi_tri', '', ''], # d/c duong, pho cho trang nhadat24h 
        ['chieu_ngang', '', ''],
        ['chieu_dai', '', ''],
        ['quy_mo', '', ''],
        ['duong_truoc_nha', '', ''],
        ['phap_ly', '', ''],
        ['so_lau', '', ''],
        ['so_phong_tam', '', ''],
        ['phong_an', '', ''],
        ['nha_bep', '', ''],
        ['san_thuong', '', ''],
        ['chinh_chu', '', ''],
        ['lh_dia_chi', '', ''],
        ['lh_email', '', ''],
        ['tieu_de', '', ''],
        ['mieu_ta', '', ''],
        ['loai_tin', '', ''],
        ['loai_bds', '', ''],
        ['ngay_cap_nhat', '', ''],
        ['ngay_het_han', '', ''],
        ['url', 'Từ URL', 'cc,nd,dn'],
    ]

    bds_csv_fields_by_house_type = {}
    bds_house_type_data = {
        'cc': {
            'name': 'Chung Cư',
            'url_rules': [r'/ban-can-ho-chung-cu']
        },
        'nd': {
            'name': 'Nhà đất thổ cư',
            'url_rules': []
        },
        'dn': {
            'name': 'Đất Nền',
            'url_rules': [r'/ban-dat']
        }
    }

    @classmethod
    def init(cls):
        for field in cls.csv_fields:
            house_types = field[2].split(',')
            for house_type in house_types:
                if house_type not in cls.bds_csv_fields_by_house_type:
                    cls.bds_csv_fields_by_house_type[house_type] = {
                        'headers': [],
                        'es_fields': []
                    }
                cls.bds_csv_fields_by_house_type[house_type]['headers'].append(field[1])
                cls.bds_csv_fields_by_house_type[house_type]['es_fields'].append(field[0])

    def __init__(self, data):
        self.data = data
        self.domain = None
        self.is_keep = True
        self.bds_house_type = None
        self.dc_pho_duong = None
        self.dc_quan_huyen = None

        dia_chi = self.get_first_value('bds_dia_chi')
        self.dia_chi_parts = None
        if dia_chi and len(dia_chi) > 0:
            self.dia_chi_parts = [part.strip() for part in dia_chi.split(',')]

    def __hash__(self):
        return hash(('title', self.get_title()))

    def __eq__(self, other):
        return self.get_title().lower() == \
               other.get_title().lower()

    def process(self):
        domain = self.get_domain()
        return getattr(self, 'process_domain_{}'.format(domain))()

    def process_domain_bds(self):
        res = {
            'domain_type': 'bds'
        }

        # get bds loai tin
        bds_type = EsRecord.get_bds_type(self)
        res['bds_type'] = bds_type

        # get loại nhà (trung cử, nhà đất, đất nền)
        bds_house_type = EsRecord.get_bds_house_type(self)
        res['bds_house_type'] = bds_house_type
        self.bds_house_type = bds_house_type

        # normalize dien tich

        # get as a row in csv file
        res['bds_row'] = EsRecord.get_bds_row(self, bds_type, bds_house_type)

        # decid to keep this record or not
        res['is_keep'] = self.is_keep

        return res

    def process_domain_ttn(self):
        res = {
            'domain_type': 'ttn'
        }

        for field in self.data['fields'].keys():
            if field[:3] == 'ttn' or field == 'url':
                field_data = self.get(field, [])
                if field == 'ttn_mieu_ta':
                    field_data = utils.strs_to_str(field_data)
                elif field not in ['ttn_bl_noi_dung', 'ttn_bl_diem']:
                    field_data = field_data[0]
                res[field] = field_data

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
    def get_bds_house_type(cls, record):
        # For now default is trung cư, later will might use kywords, ml
        default_when_not_found = 'nd'
        url = record.get_first_value('url')

        if url:
            for bds_house_type, data in cls.bds_house_type_data.items():
                for url_rule in data['url_rules']:
                    match = re.search(url_rule, url)
                    if match:
                        return bds_house_type

        return default_when_not_found

    @classmethod
    def get_bds_row(cls, record, bds_type, bds_house_type):
        row = []

        is_at_least_no_empty = False
        for field in cls.bds_csv_fields_by_house_type[bds_house_type]['es_fields']:
            es_field = 'bds_{}'.format(field)
            
            if field == 'tieu_de':
                bds_title = record.get_first_value(es_field, None)
                if bds_title is None:
                    es_field = 'title'

            if field == 'url':
                es_field = 'url'

            field_data = record.get(es_field, [])
            
            if field == 'gia_chuan_hoa':
                normalized_price_arr = EsRecord.normalize_bds_price(record)
                if len(normalized_price_arr[0]) == 0:
                    record.is_keep = False
                    break

                field_data = normalized_price_arr

            if len(field_data) == 0:
                if field == 'dc_quan_huyen':
                    dc_quan_huyen = EsRecord.get_quan_huyen(record)
                    record.dc_quan_huyen = dc_quan_huyen
                    field_data = [dc_quan_huyen]
                if field == 'dc_pho_duong':
                    dc_pho_duong = EsRecord.get_pho_duong(record)
                    record.dc_pho_duong = dc_pho_duong
                    field_data = [dc_pho_duong]
                if field == 'cc_toa_nha':
                    cc_toa_nha = EsRecord.get_cc_toa_nha(record)
                    field_data = [cc_toa_nha]

            if len(field_data) > 0:
                if es_field[:3] == 'bds':
                    is_at_least_no_empty = True
                
                row_data = field_data[0]

                if es_field == 'bds_dia_chi' and\
                    record.bds_house_type == 'dn' and row_data:
                    row_data = row_data.lower()
                    row_data = row_data.replace('dự án', '').strip().title()
                
                if es_field == 'bds_mieu_ta':
                    row_data = utils.strs_to_str(field_data)

                if es_field == 'bds_dien_tich':
                    row_data = EsRecord.normalize_s(row_data)

                if es_field == 'bds_so_phong_ngu':
                    row_data = EsRecord.normalize_so_phong(row_data)
                
                if es_field == 'bds_ngay_dang':
                    row_data = EsRecord.normalize_date(row_data)

                if row_data in ['_']:
                    row_data = ''

                if row_data is None:
                    record.is_keep = False
                    break
                
                row.append(row_data)
            else:
                row.append('')

        return row

    @classmethod
    def get_cc_toa_nha(cls, record):
        if record.bds_house_type == 'cc':
            dc_quan_huyen = EsRecord.get_quan_huyen(record)
            dc_pho_duong = EsRecord.get_pho_duong(record)
            dc_parts = record.dia_chi_parts
            if len(dc_parts) > 0:
                cc_toa_nha = dc_parts[0].lower()
                cc_toa_nha = cc_toa_nha.replace('dự án', '', 1)
                cc_toa_nha = cc_toa_nha.strip()

            cc_toa_nha_lower = cc_toa_nha.lower()
            
            if dc_pho_duong.lower() not in cc_toa_nha_lower and\
                   dc_quan_huyen.lower() not in cc_toa_nha_lower:
                cc_toa_nha = cc_toa_nha.title()
                return cc_toa_nha

        return ''

    @classmethod
    def get_pho_duong(cls, record):
        if not record.dc_quan_huyen is None:
            return record.dc_quan_huyen

        dia_chi_parts = record.dia_chi_parts
        for part in dia_chi_parts:
            if 'đường' in part.lower():
                for to_replace in ['đường', 'Đường']:
                    part = part.replace(to_replace, '', 1)
                part = part.strip()
                part =  ' '.join(part.split()).title()
                return part
        if len(dia_chi_parts) > 0:
            if 'dự án' not in dia_chi_parts[0].lower():
                return dia_chi_parts[0]
        return ''

    @classmethod
    def get_quan_huyen(cls, record):
        if not record.dc_quan_huyen is None:
            return record.dc_quan_huyen

        dia_chi_parts = record.dia_chi_parts
        if dia_chi_parts and len(dia_chi_parts) > 1:
            quan_huyen = dia_chi_parts[-2]
            thanh_pho_huyen_str = ['thành phố', 'huyện']
            for s in thanh_pho_huyen_str:
                if s in quan_huyen.lower():
                    quan_huyen = quan_huyen[len(s):]
                    break
            return quan_huyen
        return ''

    @classmethod
    def normalize_so_phong(cls, s):
        so_phong_rule = r'\d{1,}'
        match = re.search(so_phong_rule, s)
        if match:
            return match.group()

        return '' # we dont ignore this field

    @classmethod
    def normalize_s(cls, s_str):
        # TODO: we will remove later for not duplicate code
        dien_tich_rule = r'(([0-9]*[.])?[0-9]+)'
        match_s = re.search(dien_tich_rule, s_str)
        if match_s:
            return match_s.group()

        return None

    @classmethod
    def normalize_date(cls, date_str):
        # With hôm nay date we will use created_time later
        # for now just ignore the record

        date_rule = r'\d{1,}[\-\/]\d{1,}[\-\/]\d{4,}'
        match_date = re.search(date_rule, date_str)
        if match_date:
            found_date = match_date.group() # just get the first match
            found_date = found_date.replace('-', '/')
            parts = found_date.split('/')
            parts[0] = cls.normalize_day_month(parts[0]) # 1/1/2018 -> 01/01/2018
            parts[1] = cls.normalize_day_month(parts[1]) # 1/1/2018 -> 01/01/2018
            found_date = '/'.join(parts)
            return found_date

        return None

    @classmethod
    def normalize_day_month(cls, str_d):
        res = '0' + str_d if len(str_d) == 1 else str_d
        return res

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
            
        return [' - '.join(normalized_price)]

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
        return '%.1f' % normalized_price

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