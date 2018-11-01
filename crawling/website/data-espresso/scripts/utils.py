import io
from os import path
import json
import yaml

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
