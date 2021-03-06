
package com.uet.crawling.social.persistence;

public enum Status {
    DISCOVERED, FETCHED, FETCH_ERROR, ERROR, ACCESS_TOKEN_ERROR, API_UNKNOW,
    SERVICE_ERROR, RATE_LIMIT,PERMISSION_ERROR, BLOCKED;

    public static Status fromApiResponseCode(Integer code) {
        if (code == null)
            return Status.FETCHED;
        else if (code.intValue() == 102)
            return Status.ACCESS_TOKEN_ERROR;
        else if (code.intValue() == 1)
            return Status.API_UNKNOW;
        else if (code.intValue() == 2)
            return Status.SERVICE_ERROR;
        else if (code.intValue() == 4 || code.intValue() == 7
            || code.intValue() == 32 || code.intValue() == 613)
            return Status.RATE_LIMIT;
        else if (code.intValue() == 10 || (code.intValue() >= 200 && code.intValue() <=299))
            return Status.PERMISSION_ERROR;
        else if (code.intValue() == 368)
            return Status.BLOCKED; 
        else
            return Status.ERROR;
    }

}
