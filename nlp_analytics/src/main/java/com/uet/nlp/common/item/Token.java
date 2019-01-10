package com.uet.nlp.common.item;

public class Token extends Item {
    public String orth;
    public String norm;
    public int inDocCount;

    // from ES
    public int count;
    public int docCount;

    public Token() {

    }

    public Token(String txt, int inDocCount) {
        fromText(txt, inDocCount);
    }

    public void fromText(String txt, int inDocCount) {
        orth = txt;
        norm = ""; // for data labeling
        this.inDocCount = inDocCount;

        this.generateId(orth);
        this.createdTime = System.currentTimeMillis();
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }
}