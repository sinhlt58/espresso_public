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
    def generate_configs(cls, file_path):
        domain_configs_dict = get_json_data(file_path)
        # print (domain_configs_dict)

        # generate mp mapping fields in crawler-conf.yaml file
        crawler_config_dict = get_yaml_data(cls.cralwer_config_file)
        mdfields = cls.get_md_fields(domain_configs_dict)
        crawler_config_dict['config']['indexer.md.mapping'] = mdfields
        write_yaml_data(cls.cralwer_config_file, crawler_config_dict)
        print ("done gen for crawler-conf.yaml")

        # generate for parsefilters.json file
        # xpath class
        parse_filters_dict = get_json_data(cls.parse_filter_file)
        old_xpath_params = parse_filters_dict['com.digitalpebble.stormcrawler.parse.ParseFilters']\
                       [1]['params']
        new_xpath_params = cls.gen_new_param_parse_filters(old_xpath_params, domain_configs_dict)
        parse_filters_dict['com.digitalpebble.stormcrawler.parse.ParseFilters']\
                       [1]['params'] = new_xpath_params
        write_json_data(cls.parse_filter_file, parse_filters_dict)
        print ("done gen for parsefilters.json")

        # generate mapping es for index
        old_es_dict = get_json_data(cls.es_index_mapping_file)
        old_es_props = old_es_dict['mappings']['doc']['properties']
        not_default_props = []
        for k, _ in old_es_props.items():
            if not k in cls.default_es_preperties:
                not_default_props.append(k)
        for p in not_default_props:
            del old_es_props[p]

        es_props = cls.get_es_property_fields(domain_configs_dict)
        for es_field in es_props:
            old_es_props[es_field] = {
                "type": "text",
				"index": "true",
				"store": True
            }
        write_json_data(cls.es_index_mapping_file, old_es_dict)
        print ("done gen for es_index_mapping.json")

    @classmethod
    def get_md_fields(cls, domain_configs_dict):
        res = []
        for domain_config in domain_configs_dict:
            name = domain_config.get('name')
            for field in domain_config.get('fields'):
                res.append("{}.{}={}_{}".format(name, field, name, field))
        
        res = res + cls.default_md_fields

        return res

    @classmethod
    def gen_new_param_parse_filters(cls, old_params, domain_configs_dict):
        template_params = cls.get_param_fields_template_dict(domain_configs_dict)
        for param_field, _ in template_params.items():
            
            if param_field in cls.default_parse_fields:
                template_params[param_field] = old_params[param_field]
            else:
                if param_field in old_params:
                    if type(old_params[param_field]) is dict:
                        for k, v in old_params[param_field].items():
                            if k in template_params[param_field]:
                                template_params[param_field][k] = v
                    else:
                        template_params[param_field] = old_params[param_field]
        return template_params
    
    @classmethod
    def get_param_fields_template_dict(cls, domain_configs_dict):
        res = {}
        for domain_config in domain_configs_dict:
            name = domain_config.get('name')
            for group_url in domain_config.get('group_urls'):
                for field in domain_config.get('fields'):
                    param_field = "{}.{}".format(name, field)
                    groups = res.get(param_field, {})
                    res[param_field] = groups

                    rules = groups.get(group_url, [])
                    res[param_field][group_url] = rules

        # add default fields
        for default_field in cls.default_parse_fields:
            res[default_field] = []

        return res

    @classmethod
    def get_es_property_fields(cls, domain_configs_dict):
        res = []
        for domain_config in domain_configs_dict:
            name = domain_config.get('name')
            for field in domain_config.get('fields'):
                res.append("{}_{}".format(name, field))
        return res

if __name__ == '__main__':
    Generator.generate_configs('domain_configs.json')