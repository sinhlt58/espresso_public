package com.uet.nlp.common.item;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TTNItem extends Item {

    @JsonProperty("tieu_de")
    public String title;

    @JsonProperty("gia")
    public String price;

    @JsonProperty("mieu_ta")
    public String description;

    @JsonProperty("thuong_hieu")
    public String brand;

    @JsonProperty("nguoi_dang")
    public String author;

    @JsonProperty("gui_tu")
    public String deliverFrom;

    public String uploadTime;

    public TTNItem() {
        itemType = "product";
    }

    public void normalize() {
        
    }
}