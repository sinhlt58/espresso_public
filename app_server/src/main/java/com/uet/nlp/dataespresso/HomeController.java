package com.uet.nlp.dataespresso;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Date;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.QueryResults;

import gr.iti.mklab.framework.client.mongo.DAOFactory;
import gr.iti.mklab.framework.common.domain.collections.Collection;
import gr.iti.mklab.framework.common.domain.collections.Collection.Keyword;
import gr.iti.mklab.framework.common.domain.config.Configuration;
import gr.iti.mklab.framework.common.domain.feeds.Feed;

@RestController
public class HomeController {
	public final Logger logger = LogManager.getLogger(HomeController.class);


    private BasicDAO<Collection, String> collectionsDao;

    public HomeController() {
        connect();
    }

    public void connect() {
        try {
            logger.info("Connect to mongodb...");

            DAOFactory daoFactory = new DAOFactory();
            collectionsDao = daoFactory.getDAO("127.0.0.1", "data_espresso", Collection.class);
        }
        catch(Exception e) {
            logger.error(e);
        }
    }

    @RequestMapping("/")
    public String index() {
        Collection testCollection = new Collection();
		testCollection.setId("randomid_userid_timestamp");
    	testCollection.setCreationDate(new Date());
    	testCollection.setSinceDate(System.currentTimeMillis() - (7 * 24 * 3600 * 1000l));

		testCollection.setOwnerId("1234567890");
    	testCollection.setTitle("Cửa hàng giày");

		String[] sources = {"Facebook"};
    	
    	List<Keyword> k = new ArrayList<Keyword>();
    	k.add(new Keyword("giày", sources));
    	k.add(new Keyword("áo", sources));
    	k.add(new Keyword("sơn tùng", sources));
    	k.add(new Keyword("cháy", sources));
    	k.add(new Keyword("trà", sources));
    	
    	testCollection.setKeywords(k);

		collectionsDao.save(testCollection);
        
        return "Greetings from Spring Boot!";
    }

}