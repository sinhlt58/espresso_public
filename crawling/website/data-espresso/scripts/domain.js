let domainEntities=[{"esname":"book","hostname":"loigiaihay.com","rules":[{"label":"ten_sach","rule":"div#container h1 > a > span"},{"label":"bai","rule":"div#container ul.list-posts a"},{"label":"lv2","rule":"div#container .cat_event_lv2"},{"label":"lv1","rule":"div#container .cat_event_lv1"},{"label":"muc_luc_sach","rule":"rule_inner_html div#container div.box.clearfix %remove% div.content_box %remove% img %remove% div.Tabs.clearfix"},{"label":"muc_luc_sach_json","rule":"rule_nested_ul div#container div.subject"},{"label":"sach","rule":"div#container div.n-top-title > a > span"},{"label":"tieu_de","rule":"div#container div.n-top-title strong, div#container div.content_box h1 > a > strong"},{"label":"tieu_de_con","rule":"div#container div.detail_new > h2 > strong"},{"label":"ly_thuyet_or_bai_tap","rule":"rule_inner_html div#container div.detail_new %remove% h2 > strong %remove% div.box_gray %remove% div.center %remove% div.choose-fast %remove% div[style^='text-align: center;margin-top: 10px;margin-bottom: 10px'] %remove% div[id='fb_like_fb_new'] %remove% script"}],"schedules":[]}];db.domain.drop();db.domain.insert(domainEntities);