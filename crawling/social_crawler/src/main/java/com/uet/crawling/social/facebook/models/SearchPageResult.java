package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;
import com.restfb.types.Page;

import java.util.List;

public class SearchPageResult extends Result{

    @Facebook
    private List<Page> data;

    public List<Page> getData(){
        return data;
    }

    public void setData(List<Page> data){
        this.data = data;
    }

}
