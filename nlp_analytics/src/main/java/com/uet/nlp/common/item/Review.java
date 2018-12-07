package com.uet.nlp.common.item;

public class Review extends Item {
    public String parentId;

    // Duplicate these fields
    // trade off here for faster query
    public String brand;
    public String parentAuthor;
    public String parentItemType;

    
    public String author;
    public String rate;
    public String content;
    public String date;

    public Review() {
        itemType = "review";
    }

    public void normalize() {

    }
}