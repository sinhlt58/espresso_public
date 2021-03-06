
package com.uet.crawling.social;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

/** Wrapper around Map &lt;String,String[]&gt; **/

public class Metadata {

    // TODO customize the behaviour of Kryo via annotations
    // @BindMap(valueSerializer = IntArraySerializer.class, keySerializer =
    // StringSerializer.class, valueClass = String[].class, keyClass =
    // String.class, keysCanBeNull = false)
    private Map<String, String[]> md;

    public final static Metadata empty = new Metadata(
            Collections.<String, String[]> emptyMap());

    public Metadata() {
        md = new HashMap<>();
    }

    /**
     * Wraps an existing HashMap into a Metadata object - does not clone the
     * content
     **/
    public Metadata(Map<String, String[]> metadata) {
        if (metadata == null)
            throw new NullPointerException();
        md = metadata;
    }

    /** Puts all the metadata into the current instance **/
    public void putAll(Metadata m) {
        md.putAll(m.md);
    }

    /** @return the first value for the key or null if it does not exist **/
    public String getFirstValue(String key) {
        String[] values = md.get(key);
        if (values == null)
            return null;
        if (values.length == 0)
            return null;
        return values[0];
    }

    public String[] getValues(String key) {
        String[] values = md.get(key);
        if (values == null)
            return null;
        if (values.length == 0)
            return null;
        return values;
    }

    /** Set the value for a given key. The value can be null. */
    public void setValue(String key, String value) {
        md.put(key, new String[] { value });
    }

    public void setValues(String key, String[] values) {
        if (values == null || values.length == 0)
            return;
        md.put(key, values);
    }

    public void addValue(String key, String value) {
        if (StringUtils.isBlank(value))
            return;

        String[] existingvals = md.get(key);
        if (existingvals == null || existingvals.length == 0) {
            setValue(key, value);
            return;
        }

        int currentLength = existingvals.length;
        String[] newvals = new String[currentLength + 1];
        newvals[currentLength] = value;
        System.arraycopy(existingvals, 0, newvals, 0, currentLength);
        md.put(key, newvals);
    }

    public void addValues(String key, Collection<String> values) {
        if (values == null || values.size() == 0)
            return;
        String[] existingvals = md.get(key);
        if (existingvals == null) {
            md.put(key, values.toArray(new String[values.size()]));
            return;
        }

        ArrayList<String> existing = new ArrayList<>(existingvals.length
                + values.size());
        for (String v : existingvals)
            existing.add(v);

        existing.addAll(values);
        md.put(key, existing.toArray(new String[existing.size()]));
    }

    /**
     * @return the previous value(s) associated with <tt>key</tt>
     **/
    public String[] remove(String key) {
        return md.remove(key);
    }

    public String toString() {
        return toString("");
    }

    /**
     * Returns a String representation of the metadata with one K/V per line
     **/
    public String toString(String prefix) {
        StringBuffer sb = new StringBuffer();
        if (prefix == null)
            prefix = "";
        Iterator<Entry<String, String[]>> iter = md.entrySet().iterator();
        while (iter.hasNext()) {
            Entry<String, String[]> entry = iter.next();
            for (String val : entry.getValue()) {
                sb.append(prefix).append(entry.getKey()).append(": ")
                        .append(val).append("\n");
            }
        }
        return sb.toString();
    }

    public int size() {
        return md.size();
    }

    public Set<String> keySet() {
        return md.keySet();
    }

    /**
     * Returns the first non empty value found for the keys or null if none
     * found.
     **/
    public static String getFirstValue(Metadata md, String... keys) {
        for (String key : keys) {
            String val = md.getFirstValue(key);
            if (StringUtils.isBlank(val))
                continue;
            return val;
        }
        return null;
    }

    /** Returns the underlying Map **/
    public Map<String, String[]> asMap() {
        return md;
    }

}
