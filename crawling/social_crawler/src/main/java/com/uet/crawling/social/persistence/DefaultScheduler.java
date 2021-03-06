
package com.uet.crawling.social.persistence;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.uet.crawling.social.Constants;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.util.ConfUtils;

/**
 * Schedules a nextFetchDate based on the configuration
 **/
public class DefaultScheduler extends Scheduler {

    /** Date far in the future used for never-refetch items. */
    public static final Date NEVER = new Calendar.Builder()
            .setCalendarType("iso8601").setDate(2099, Calendar.DECEMBER, 31)
            .build().getTime();

    // fetch intervals in minutes
    private int defaultfetchInterval;
    private int fetchErrorFetchInterval;
    private int errorFetchInterval;

    private CustomInterval[] customIntervals;

    /*
     * (non-Javadoc)
     * 
     * @see
     * com.uet.crawling.social.persistence.Scheduler#init(java.util.Map)
     */
    @SuppressWarnings("rawtypes")
    @Override
    public void init(Map stormConf) {
        defaultfetchInterval = ConfUtils.getInt(stormConf,
                Constants.defaultFetchIntervalParamName, 1440);
        fetchErrorFetchInterval = ConfUtils.getInt(stormConf,
                Constants.fetchErrorFetchIntervalParamName, 120);
        errorFetchInterval = ConfUtils.getInt(stormConf,
                Constants.errorFetchIntervalParamName, 44640);
                // conganh comment: need add some fetchInterval??

        // loads any custom key values
        // must be of form fetchInterval(.STATUS)?.keyname=value
        // e.g. fetchInterval.isFeed=true
        // e.g. fetchInterval.FETCH_ERROR.isFeed=true
        Map<String, CustomInterval> intervals = new HashMap<>();
        Pattern pattern = Pattern
                .compile("^fetchInterval(\\..+?)?\\.(.+)=(.+)");
        Iterator<String> keyIter = stormConf.keySet().iterator();
        while (keyIter.hasNext()) {
            String key = keyIter.next();
            Matcher m = pattern.matcher(key);
            if (!m.matches()) {
                continue;
            }
            Status status = null;
            // was a status specified?
            if (m.group(1) != null) {
                status = Status.valueOf(m.group(1).substring(1));
            }
            String mdname = m.group(2);
            String mdvalue = m.group(3);
            int customInterval = ConfUtils.getInt(stormConf, key, -1);
            if (customInterval != -1) {
                CustomInterval interval = intervals.get(mdname + mdvalue);
                if (interval == null) {
                    interval = new CustomInterval(mdname, mdvalue, status,
                            customInterval);
                } else {
                    interval.setDurationForStatus(status, customInterval);
                }
                // specify particular interval for this status
                intervals.put(mdname + mdvalue, interval);
            }
        }
        customIntervals = intervals.values().toArray(
                new CustomInterval[intervals.size()]);
    }

    /*
     * (non-Javadoc)
     * .Metadata
     * @see com.uet.crawling.social.persistence.Scheduler#schedule(
     * com.uet.crawling.social.persistence.Status,
     * com.uet.crawling.social.Metadata)
     */
    @Override
    public Date schedule(Status status, Metadata metadata) {

        int minutesIncrement = 0;

        Optional<Integer> customInterval = checkCustomInterval(metadata, status);

        if (customInterval.isPresent()) {
            minutesIncrement = customInterval.get();
        } else {
            switch (status) {
            case FETCHED:
                minutesIncrement = defaultfetchInterval;
                break;
            case FETCH_ERROR:
                minutesIncrement = fetchErrorFetchInterval;
                break;
            case ERROR:
                minutesIncrement = errorFetchInterval;
                break;
            // conganh comment: if need add some fetchInterval, must fix abstrac update bolt
            // conganh add
            case ACCESS_TOKEN_ERROR:
                minutesIncrement = fetchErrorFetchInterval;
                break;
            case API_UNKNOW:
                minutesIncrement = errorFetchInterval;
                break;
            case SERVICE_ERROR:
                minutesIncrement = fetchErrorFetchInterval;
                break;
            case RATE_LIMIT:
                minutesIncrement = fetchErrorFetchInterval;
                break;
            case PERMISSION_ERROR:
                minutesIncrement = fetchErrorFetchInterval;
                break;
            case BLOCKED:
                minutesIncrement = errorFetchInterval;
                break;
            // end conganh
            default:
                // leave it to now e.g. DISCOVERED
            }
        }

        // a value of -1 means never fetch
        // we use a conventional value
        if (minutesIncrement == -1) {
            return NEVER;
        }

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, minutesIncrement);

        return cal.getTime();
    }

    /**
     * Returns the first matching custom interval
     **/
    protected final Optional<Integer> checkCustomInterval(Metadata metadata,
            Status s) {
        if (customIntervals == null)
            return Optional.empty();

        for (CustomInterval customInterval : customIntervals) {
            String[] values = metadata.getValues(customInterval.key);
            if (values == null) {
                continue;
            }
            for (String v : values) {
                if (v.equals(customInterval.value)) {
                    return customInterval.getDurationForStatus(s);
                }
            }
        }

        return Optional.empty();
    }

    private class CustomInterval {
        private String key;
        private String value;
        private Map<Status, Integer> durationPerStatus;
        private Integer defaultDuration = null;

        private CustomInterval(String key, String value, Status status,
                int minutes) {
            this.key = key;
            this.value = value;
            this.durationPerStatus = new HashMap<>();
            setDurationForStatus(status, minutes);
        }

        private void setDurationForStatus(Status s, int minutes) {
            if (s == null) {
                defaultDuration = minutes;
            } else {
                this.durationPerStatus.put(s, minutes);
            }
        }

        private Optional<Integer> getDurationForStatus(Status s) {
            // do we have a specific value for this status?
            Integer customD = durationPerStatus.get(s);
            if (customD != null) {
                return Optional.of(customD);
            }
            // is there a default one set?
            if (defaultDuration != null) {
                return Optional.of(defaultDuration);
            }
            // no default value or custom one for that status
            return Optional.empty();
        }
    }
}
