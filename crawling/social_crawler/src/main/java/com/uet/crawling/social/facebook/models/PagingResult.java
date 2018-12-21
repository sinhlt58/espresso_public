package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;

public class PagingResult {

    @Facebook
    private CursorsResult cursors;

    @Facebook
    private String next;

    @Facebook
    private String previous;

    public CursorsResult getCursors() {
        return cursors;
    }

    public void setCursors(CursorsResult cursors) {
        this.cursors = cursors;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public String getPrevious() {
        return previous;
    }

    public void setPrevious(String previous) {
        this.previous = previous;
    }
}
