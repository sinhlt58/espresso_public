package com.digitalpebble.stormcrawler.mongodb.models;

import xyz.morphia.annotations.Embedded;
import xyz.morphia.annotations.Entity;

import java.util.ArrayList;

@Entity("domain")
public class DomainEntity extends BaseEntity {

    private String name;
    private String hostname;
    private String esname;

    @Embedded
    private ArrayList<Rules> rules = new ArrayList<>();

    @Embedded
    private ArrayList<Schedules> schedules = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public String getEsname() {
        return esname;
    }

    public void setEsname(String esname) {
        this.esname = esname;
    }

    public ArrayList<Rules> getRules() {
        return rules;
    }

    public void setRules(ArrayList<Rules> rules) {
        this.rules = rules;
    }

    public ArrayList<Schedules> getSchedules() {
        return schedules;
    }

    public void setSchedule(ArrayList<Schedules> schedules) {
        this.schedules = schedules;
    }

}
