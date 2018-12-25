package com.uet.nlp.common.item;

public class NlpReview extends Review {

    // example
    public String[] tokens;

    public NlpReview() {
        itemType = "nlp_review";
    }

    public void preprocess() {
        try {
            // example
            tokens = this.content.split(" ");
        } catch(Exception e) {

        }
    }
}