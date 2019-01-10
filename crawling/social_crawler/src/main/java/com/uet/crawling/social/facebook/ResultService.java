
package com.uet.crawling.social.facebook;

import java.util.ArrayList;

import com.restfb.FacebookClient;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.util.Configurable;

public abstract class ResultService implements Configurable {

    protected int limit = 10;

    protected String typeResult = "get";

    protected String typeBuildToIndex = "get";

    protected String typeBuildToStatus = "get";

    protected boolean index = false;

    protected boolean indexStatus = false;

    public abstract void getResult(FacebookClient client, String node, 
        Metadata md, ArrayList<Metadata> listMdResult);

    public String getTypeResult() {
        return typeResult;
    }

    public String getTypeBuildToIndex() {
        return typeBuildToIndex;
    }

    public String getTypeBuildToStatus() {
        return typeBuildToStatus;
    }

}