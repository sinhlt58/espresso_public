package com.uet.nlp.common.item;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TTNItem extends CrawledItem {
    // private fields
    @JsonDeserialize(using = ArrayOrStringDeserializer.class)
    private String tieu_de;

    public String title;
    public double price;
    public String description;
    public String brand;
    public String author;
    public String deliverFrom;
    public String productId;
    @JsonProperty
    public String breadcrumb;

    static Pattern pattern = Pattern.compile("\\d+");

    // calculated fields
    public double uploadTime;

    public TTNItem() {
        itemType = "product";
    }

    public void normalize() {
        uploadTime = crawlTime;
        title = tieu_de;
    }

    public void generateId() {
        super.generateId(domain + ":" + productId);
    }

    @JsonProperty("title")
    public String _getTitle() {
        return this.tieu_de;
    }

    @JsonProperty("price")
    public double _getPrice() {
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
    @JsonProperty("gia")
    public void _setPrice(String priceStr) {
        priceStr = priceStr.replace(".", "");
        priceStr = priceStr.replace(",", "");
        Matcher match = pattern.matcher(priceStr);
        match.find();
        try {
            this.price = Double.parseDouble(match.group(0));
        } catch(Exception e) {
            System.out.println(e.getMessage());
            this.price = 0;
        }
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

    @JsonProperty("id_san_pham")
    public void _setProductId(String v) {
        this.productId = v;
    }
}