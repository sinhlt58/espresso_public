package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;

public class Result {

    @Facebook
    private ErrorResult error;

    @Facebook
    private PagingResult paging;

    public ErrorResult getError(){
        return error;
    }

    public void  setError(ErrorResult error){
        this.error = error;
    }

    public PagingResult getPaging() {
        return paging;
    }

    public void setPaging(PagingResult paging) {
        this.paging = paging;
    }

}
