package com.uet.nlp.common.item;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TTNItem extends Item {
    public String title;
    public String price;
    public String description;
    public String brand;
    public String author;
    public String deliverFrom;

    // calculated fields
    public double uploadTime;

    public TTNItem() {
        itemType = "product";
    }

    public void normalize() {
        uploadTime = crawlTime;
    }

    public void generateId() {
        super.generateId(url + domain);
    }

    @JsonProperty("title")
    public String _getTitle() {
        return this.title;
    }

    @JsonProperty("price")
    public String _getPrice() {
        return this.price;
    }

    @JsonProperty("description")
    public String _getDescription() {
        return this.description;
    }

    @JsonProperty("brand")
    public String _getBrand() {
        return this.brand;
    }

    @JsonProperty("author")
    public String _getAuthor() {
        return this.author;
    }

    @JsonProperty("deliverFrom")
    public String _getDeliverFrom() {
        return this.deliverFrom;
    }

    // setters
    @JsonProperty("tieu_de")
    public void _setTitle(String v) {
        this.title = v;
    }

    @JsonProperty("gia")
    public void _setPrice(String v) {
        this.price = v;
    }

    @JsonProperty("mieu_ta")
    public void _setDescription(String v) {
        this.description = v;
    }

    @JsonProperty("thuong_hieu")
    public void _setBrand(String v) {
        this.brand = v;
    }

    @JsonProperty("nguoi_dang")
    public void _setAuthor(String v) {
        this.author = v;
    }

    @JsonProperty("gui_tu")
    public void _setDeliverFrom(String v) {
        this.deliverFrom = v;
    }
}