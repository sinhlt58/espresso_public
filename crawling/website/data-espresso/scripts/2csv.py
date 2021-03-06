import json
from utils import *
from es_record import EsRecord

class ConvertManager:

    bds_out_files = {
        'bds_mua': 'Mua',
        'bds_ban': 'Bán',
        'bds_can_thue': 'Cần_thuê',
        'bds_cho_thue': 'Cho_thuê'
    }

    ttn_out_file = 'tmp/ttn_data.json'

    def __init__(self):
        self.fields = []
        self.headers = []
        EsRecord.init()

    def json_to_exel(self, file_path, file_format='csv'):
        es_records = self.to_es_record(get_json_data(file_path))
        print ('Number of es records: {}'.format(len(es_records)))

        # remove untitle records
        es_records = EsRecord.remove_untitle_record(es_records)
        print ('Number of es records after removing untitle: {}'.format(len(es_records)))

        # remove duplicate by title
        es_records = EsRecord.remove_duplicate(es_records)
        print ('Number of es records after removing duplicate: {}'.format(len(es_records)))

        # classify records to their domains
        records_by_domain = self.classify_records_to_domain(es_records)
        
        domain_responses = {}
        # process each record for each domain
        for domain, records in records_by_domain.items():
            print ('Domain {} has {} records'.format(domain, len(records)))
            if not domain in ['unknow', 'ttn']:
                domain_responses[domain] = []
                for record in records:
                    domain_responses[domain].append(record.process())

        for domain, responses in domain_responses.items():
            getattr(self, 'out_{}_domain'.format(domain))(responses)

    def count_num_field_bds_record_res(self, record_res):
        res = 0
        for d in record_res['bds_row']:
            if d and len(d) > 0:
                res += 1
        return res

    def out_bds_domain(self, records_res):
        records_rows_by_type = {}

        # sort by the number of existing fields
        records_res.sort(key=lambda record_res: -self.count_num_field_bds_record_res(record_res))

        for record_res in records_res:
            bds_type = record_res['bds_type']
            bds_house_type = record_res['bds_house_type']

            # just skip unwanted records
            if not record_res['is_keep']:
                continue

            if bds_type not in records_rows_by_type:
                records_rows_by_type[bds_type] = {}

            if bds_house_type not in records_rows_by_type[bds_type]:
                records_rows_by_type[bds_type][bds_house_type] = {
                    'sheet_name': EsRecord.bds_house_type_data[bds_house_type]['name'],
                    'headers': EsRecord.bds_csv_fields_by_house_type[bds_house_type]['headers'],
                    'data': []
                }

            record_res['bds_row'][0] = str(len(records_rows_by_type[bds_type][bds_house_type]['data']) + 1)
            records_rows_by_type[bds_type][bds_house_type]['data'].append(record_res['bds_row'])
        
        # write to each xls file for each bds type
        for bds_type, bds_type_data in records_rows_by_type.items():
            dfs_data = []
            for bds_house_type, bds_house_type_data in bds_type_data.items():
                df_data = bds_house_type_data
                dfs_data.append(df_data)
                print ('Bds {}, {} has {} records'.format(bds_type, \
                            EsRecord.bds_house_type_data[bds_house_type]['name'], len(df_data['data'])))
            
            write_to_xls('tmp/' + self.bds_out_files[bds_type], dfs_data, False)

    def out_ttn_domain(self, records_res):
        write_json_data(self.ttn_out_file, records_res, 2, False)

    def classify_records_to_domain(self, records):
        res = {}
        for record in records:
            domain = record.get_domain()
            if domain not in res:
                res[domain] = []
            res[domain].append(record)
        return res

    def preprocess_index(self, file_path, new_file_name):
        data = []
        for line in self.read_big_file_by_line(file_path):
            object_dict = json.loads(line)
            if 'content' in object_dict['fields']:
                del object_dict['fields']['content']
            data.append(object_dict)
        write_json_data(new_file_name, data)

    def read_big_file_by_line(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                yield line

    def merge_2_json_records(self, fp1, fp2, fp_name):
        records1 = EsRecord.remove_untitle_record(self.to_es_record(get_json_data(fp1)))
        records2 = EsRecord.remove_untitle_record(self.to_es_record(get_json_data(fp2)))
        records1 = EsRecord.remove_duplicate(records1)
        records2 = EsRecord.remove_duplicate(records2)

        records = records1 + records2
        write_json_data(fp_name, EsRecord.to_json(records))

    def to_es_record(self, dict_objs):
        res = []
        for dict_obj in dict_objs:
            res.append(EsRecord(dict_obj))
        return res

if __name__ == '__main__':
    conver_manager = ConvertManager()

    # conver_manager.merge_2_json_records('preprocessed_index_o_nha.json', 'preprocessed_index.json', 'index_final.json')
    # conver_manager.preprocess_index('index.json', 'preprocessed_index.json')
    # conver_manager.json_to_exel('index_final.json', 'xls')
    conver_manager.json_to_exel('preprocessed_index.json', 'xls')
