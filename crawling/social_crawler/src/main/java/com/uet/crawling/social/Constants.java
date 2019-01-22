
package com.uet.crawling.social;

public class Constants {

    public static final String FB_ACCESS_TOKEN_ParamName = "fb.access.token";
    public static final String FB_ACCESS_TOKEN = "264533924376104|4xZUVgjCM0hQvNLkFQ-bxH9qtNU";
    public static final String cacheRateLimitConfigParamName = "fetcher.fb.ratelimit.cache.spec";

    // public static final String PARTITION_MODEParamName = "partition.url.mode";

    // public static final String PARTITION_MODE_HOST = "byHost";
    // public static final String PARTITION_MODE_DOMAIN = "byDomain";
    // public static final String PARTITION_MODE_IP = "byIP";

    public static final String STATUS_ERROR_MESSAGE = "error.message";
    public static final String STATUS_ERROR_SOURCE = "error.source";
    public static final String STATUS_ERROR_CAUSE = "error.cause";

    public static final String StatusStreamName = "status";

    public static final String DELETION_STREAM_NAME = "deletion";

    // public static final String AllowRedirParamName = "redirections.allowed";

    // when to retry a Node with a fetch error
    public static final String fetchErrorFetchIntervalParamName = "fetchInterval.fetch.error";

    // when to retry a Node with an error, i.e. something very wrong with it
    // set a very large value so that it does not get refetched soon
    public static final String errorFetchIntervalParamName = "fetchInterval.error";

    // when to retry a successful Node by default
    public static final String defaultFetchIntervalParamName = "fetchInterval.default";

    public static final String fetchErrorCountParamName = "fetch.error.count";

    private Constants() {
    }
}
