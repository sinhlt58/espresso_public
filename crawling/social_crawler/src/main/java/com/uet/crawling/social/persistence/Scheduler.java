
package com.uet.crawling.social.persistence;

import java.util.Date;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.util.ConfUtils;

public abstract class Scheduler {

    /**
     * Class to use for Scheduler. Must extend the class Scheduler.
     */
    public static final String schedulerClassParamName = "scheduler.class";

    @SuppressWarnings("rawtypes")
    /** Configuration of the scheduler based on the config. Should be called by Scheduler.getInstance() **/
    protected abstract void init(Map stormConf);

    /**
     * Returns a Date indicating when the document should be refetched next,
     * based on its status.
     **/
    public abstract Date schedule(Status status, Metadata metadata);

    /** Returns a Scheduler instance based on the configuration **/
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static Scheduler getInstance(Map stormConf) {
        Scheduler scheduler;

        String className = ConfUtils.getString(stormConf,
                schedulerClassParamName);

        if (StringUtils.isBlank(className)) {
            throw new RuntimeException("Missing value for config  "
                    + schedulerClassParamName);
        }

        try {
            Class<?> schedulerc = Class.forName(className);
            boolean interfaceOK = Scheduler.class.isAssignableFrom(schedulerc);
            if (!interfaceOK) {
                throw new RuntimeException("Class " + className
                        + " must extend Scheduler");
            }
            scheduler = (Scheduler) schedulerc.newInstance();
        } catch (Exception e) {
            throw new RuntimeException("Can't instanciate " + className);
        }

        scheduler.init(stormConf);
        return scheduler;
    }
}
