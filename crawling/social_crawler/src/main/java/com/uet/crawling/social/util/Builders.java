
package com.uet.crawling.social.util;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.LoggerFactory;

public class Builders {

    static final org.slf4j.Logger LOG = LoggerFactory.getLogger(Builders.class);

    private Builders() {
    }

    public static String buildId(String node){
        return DigestUtils.sha256Hex(node);
    }

    public static String buildNode(String node, String type){
        String nodeBuild = "node";
        if(StringUtils.isNotBlank(node)){
            nodeBuild = node;
        }
        if(StringUtils.isNotBlank(type)){
            nodeBuild += "_" + type;
        }
        return nodeBuild;
    }
}
