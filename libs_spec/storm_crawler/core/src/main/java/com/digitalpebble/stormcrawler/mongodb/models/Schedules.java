package com.digitalpebble.stormcrawler.mongodb.models;

import xyz.morphia.annotations.Embedded;

@Embedded
public class Schedules {

    private String regex;
    private int nextFecthDate;

    public String getRegex() {
        return regex;
    }

    public void setRegex(String regex) {
        this.regex = regex;
    }

    public int getNextFecthDate() {
        return nextFecthDate;
    }
    
    public void setNextFecthDate(int nextFecthDate) {
        this.nextFecthDate = nextFecthDate;
    }

}