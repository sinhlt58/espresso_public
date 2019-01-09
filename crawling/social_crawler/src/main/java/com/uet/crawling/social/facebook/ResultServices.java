package com.uet.crawling.social.facebook;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restfb.FacebookClient;
import com.uet.crawling.social.JSONResource;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.util.ConfUtils;
import com.uet.crawling.social.util.Configurable;

import org.apache.commons.lang.StringUtils;
import org.slf4j.LoggerFactory;

public class ResultServices extends ResultService implements JSONResource{

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(ResultServices.class);

    public static final ResultServices emptyResultService = new ResultServices();

    private ResultService[] resultServices;

    private ResultServices() {
        resultServices = new ResultService[0];
    }

    // chua thay doi dc ten file
    private String configFile = "resultServices.config.file";

    private Map stormConf;

    /**
     * Loads and configure the ResultServices based on the storm config if there
     * is one otherwise returns an emptyResultService.
     **/
    @SuppressWarnings("rawtypes")
    public static ResultServices fromConf(Map stormConf) {
        String resultConfigfile = ConfUtils.getString(stormConf,
                "resultServices.config.file");
        if (StringUtils.isNotBlank(resultConfigfile)) {
            try {
                return new ResultServices(stormConf, resultConfigfile);
            } catch (IOException e) {
                String message = "Exception caught while loading the ResultServices from "
                        + resultConfigfile;
                LOG.error(message);
                throw new RuntimeException(message, e);
            }
        }
        return ResultServices.emptyResultService;
    }

    /**
     * loads the Services from a JSON configuration file
     * 
     * @throws IOException
     */
    @SuppressWarnings("rawtypes")
    public ResultServices(Map stormConf, String configFile) throws IOException {
        this.configFile = configFile;
        this.stormConf = stormConf;
        try {
            loadJSONResources();
        } catch (Exception e) {
            throw new IOException("Unable to build JSON object from file", e);
        }
    }

    @Override
    public String getResourceFile() {
        return this.configFile;
    }

    @Override
    public void loadJSONResources(InputStream inputStream)
            throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode confNode = mapper.readValue(inputStream, JsonNode.class);
        configure(stormConf, confNode);
    }

    @SuppressWarnings("rawtypes")
    @Override
    public void configure(Map stormConf, JsonNode filtersConf) {
        List<ResultService> list = Configurable.configure(stormConf, filtersConf,
            ResultService.class, this.getClass().getName());
        resultServices = list.toArray(new ResultService[list.size()]);
    }

    @Override
    public void getResult(FacebookClient client, String node, 
        Metadata md, ArrayList<Metadata> listMdResult) {
        String type = md.getFirstValue("type");
        for (ResultService resultService : resultServices) {
            if(resultService.getTypeResult().equals(type)){
                long start = System.currentTimeMillis();
                resultService.getResult(client, node, md, listMdResult);
                long end = System.currentTimeMillis();
                LOG.debug("ResultService {} took {} msec getResult", 
                    resultService.getClass().getName(), end - start);
                return;
            }
        }
    }

}