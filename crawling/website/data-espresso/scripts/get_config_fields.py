from utils import *

class Generator:

    default_md_fields = [
        "parse.title=title",
        "parse.keywords=keywords",
        "parse.description=description",
        "domain=domain"
    ]
    cralwer_config_file = '../crawler-conf.yaml'
    
    parse_filter_file = '../src/main/resources/parsefilters.json'
    default_parse_fields = [
        "canonical",
        "parse.title",
        "parse.description",
        "parse.keywords"
    ]

    default_es_preperties = [
        "created_time", "host", "title", "url", "description", "tests"
    ]
    es_index_mapping_file = 'es_index_mapping.json'

    @classmethod
    def generate_configs(cls):
        rules_dict = get_json_data(cls.parse_filter_file)['com.digitalpebble.stormcrawler.parse.ParseFilters']
        jsoup_rules_dict = list(filter(lambda d: d['name'] == 'FieldsParseFilter', rules_dict))[0]

        # generate mp mapping fields in crawler-conf.yaml file
        '''
        crawler_config_dict = get_yaml_data(cls.cralwer_config_file)
        mdfields = cls.get_md_fields(jsoup_rules_dict)
        crawler_config_dict['config']['indexer.md.mapping'] = mdfields
        write_yaml_data(cls.cralwer_config_file, crawler_config_dict)
        print ("done gen for crawler-conf.yaml")
        '''

        # generate mapping es for index
        '''
        old_es_dict = get_json_data(cls.es_index_mapping_file)
        old_es_props = old_es_dict['mappings']['doc']['properties']
        not_default_props = []
        for k, _ in old_es_props.items():
            if not k in cls.default_es_preperties:
                not_default_props.append(k)
        for p in not_default_props:
            del old_es_props[p]

        es_props = cls.get_es_property_fields(jsoup_rules_dict)
        old_es_props.update(es_props)
        write_json_data(cls.es_index_mapping_file, old_es_dict)
        print ("done gen for es_index_mapping.json")
        '''

    @classmethod
    def get_md_fields(cls, jsoup_rules_dict):
        res = []
        for domain in jsoup_rules_dict['params'].keys():
            res.append("{}={}".format(domain, domain))
        
        res = res + cls.default_md_fields

        return res

    @classmethod
    def get_es_property_fields(cls, jsoup_rules_dict):
        res = {}
        for domain, domain_data in jsoup_rules_dict['params'].items():
            res[domain] = {
                'type': 'nested',
                'include_in_parent': True,
                'properties': {}
            }
            for field in domain_data.keys():
                res[domain]['properties'][field] = {
                    'type': 'text',
                    'index': 'true',
                    'store': True
                }

        return res

if __name__ == '__main__':
    Generator.generate_configs()