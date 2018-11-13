import io
from os import path
import json
import yaml
import datetime
import pandas as pd

from random import randint

def get_current_as_str():
    str_datetime = '_{0:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())
    return str_datetime

def to_json(self):
    res = {}
    for attr, value in self.__dict__.items():
        res[attr] = '' if value is None else value
    return res

def get_abs_path(*args):
    return path.abspath(path.join(path.dirname(args[0]), args[1]))

def get_json_data(path):
    return json.load(open(path, encoding="utf-8"))

def write_json_data(path, data, indent=4, append_date=False):
    if append_date:
        path = path + get_current_as_str()

    with io.open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=indent)

def get_yaml_data(path):
    with open(path, 'r') as stream:
        data_loaded = yaml.load(stream)
    return data_loaded

def write_yaml_data(path, data):
    with io.open(path, 'w', encoding='utf8') as outfile:
        yaml.dump(data, outfile, default_flow_style=False, allow_unicode=True)

def write_to_xls(file_name, dfs_data, is_append_date=False):
    if is_append_date:
        file_name = file_name + get_current_as_str()

    writer = pd.ExcelWriter(file_name + '.xls', engine='xlsxwriter', options={'strings_to_urls': False})

    for df_data in dfs_data:
        df = pd.DataFrame(data=df_data['data'], columns=df_data['headers'])
        df.to_excel(writer, sheet_name=df_data['sheet_name'], index=False, header=True)
    writer.save()

    print ('Done write to file {}'.format(file_name))

def strs_to_str(strs):
    return ' '.join(strs)