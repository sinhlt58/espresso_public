package com.uet.crawling.social.facebook.models;

import java.util.List;

import com.restfb.Facebook;

public abstract class AbstractResult<T>{

    @Facebook
    private PagingResult paging;

    public PagingResult getPaging() {
        return paging;
    }

    public void setPaging(PagingResult paging) {
        this.paging = paging;
    }

    public abstract List<T> getData();

}
