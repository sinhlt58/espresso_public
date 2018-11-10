import io
from os import path
import json
import yaml
import datetime
import pandas as pd

from random import randint

def to_json(self):
    res = {}
    for attr, value in self.__dict__.items():
        res[attr] = '' if value is None else value
    return res

def get_abs_path(*args):
    return path.abspath(path.join(path.dirname(args[0]), args[1]))

def get_json_data(path):
    return json.load(open(path, encoding="utf-8"))

def write_json_data(path, data):
    with io.open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def get_yaml_data(path):
    with open(path, 'r') as stream:
        data_loaded = yaml.load(stream)
    return data_loaded

def write_yaml_data(path, data):
    with io.open(path, 'w', encoding='utf8') as outfile:
        yaml.dump(data, outfile, default_flow_style=False, allow_unicode=True)

def wirte_to_xls(headers, file_name, data, file_format='xls'):
    str_datetime = '_{0:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())
    out_file_name = file_name + str_datetime

    df = pd.DataFrame(data=data, columns=headers)

    if file_format == 'csv':
        df.to_csv(out_file_name + '.csv', sep='\t', encoding='utf-8')
    elif file_format == 'xls':
        writer = pd.ExcelWriter(out_file_name + '.xls', engine='xlsxwriter')
        df.to_excel(writer, sheet_name='Sheet1', index=False, header=True)
        writer.close()

    print ('Len data for file {} is {}'.format(file_name, len(data)))
    print ('Done write to file {}'.format(out_file_name))

def strs_to_str(strs):
    return ' '.join(strs)