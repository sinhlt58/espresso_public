package com.uet.crawling.social.facebook.models;

import com.restfb.Facebook;

public class ErrorResult {

    @Facebook
    private String message;

    @Facebook
    private String type;

    @Facebook
    private Integer code;

    @Facebook
    private String fbtrace_id;

    // "message": "Message describing the error", 
    // "type": "OAuthException", 
    // "code": 190,
    // "error_subcode": 460,
    // "error_user_title": "A title",
    // "error_user_msg": "A message",
    // "fbtrace_id": "EJplcsCHuLu"


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getFbtrace_id() {
        return fbtrace_id;
    }

    public void setFbtrace_id(String fbtrace_id) {
        this.fbtrace_id = fbtrace_id;
    }

}