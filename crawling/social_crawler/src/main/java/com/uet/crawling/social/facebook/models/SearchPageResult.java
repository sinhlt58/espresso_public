package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;

import java.util.List;

public class SearchPageResult extends Result{

    @Facebook
    private List<PageResult> data;

    public List<PageResult> getData(){
        return data;
    }

    public void setData(List<PageResult> data){
        this.data = data;
    }

}
