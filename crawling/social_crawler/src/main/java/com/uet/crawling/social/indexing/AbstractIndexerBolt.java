
package com.uet.crawling.social.indexing;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichBolt;
import org.apache.storm.tuple.Fields;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.util.ConfUtils;
// import com.digitalpebble.stormcrawler.util.RobotsTags;

/** Abstract class to simplify writing IndexerBolts **/
@SuppressWarnings("serial")
public abstract class AbstractIndexerBolt extends BaseRichBolt {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    /**
     * Mapping between metadata keys and field names for indexing Can be a list
     * of values separated by a = or a single string
     **/
    public static final String metadata2fieldParamName = "indexer.md.mapping";

    /**
     * list of metadata key + values to be used as a filter. A document will be
     * indexed only if it has such a md. Can be null in which case we don't
     * filter at all.
     **/
    public static final String metadataFilterParamName = "indexer.md.filter";

    /** Field name to use for storing the node **/
    public static final String nodeFieldParamName = "indexer.node.fieldname";

    private String[] filterKeyValue = null;

    private Map<String, String> metadata2field = new HashMap<>();

    private String fieldNameForNode = null;

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Override
    public void prepare(Map conf, TopologyContext context,
            OutputCollector collector) {

        String mdF = ConfUtils.getString(conf, metadataFilterParamName);
        if (StringUtils.isNotBlank(mdF)) {
            // split it in key value
            int equals = mdF.indexOf('=');
            if (equals != -1) {
                String key = mdF.substring(0, equals);
                String value = mdF.substring(equals + 1);
                filterKeyValue = new String[] { key.trim(), value.trim() };
            } else {
                LOG.error("Can't split into key value : {}", mdF);
            }
        }

        fieldNameForNode = ConfUtils.getString(conf, nodeFieldParamName);

        for (String mapping : ConfUtils.loadListFromConf(
                metadata2fieldParamName, conf)) {
            int equals = mapping.indexOf('=');
            if (equals != -1) {
                String key = mapping.substring(0, equals);
                String value = mapping.substring(equals + 1);
                metadata2field.put(key.trim(), value.trim());
            } else {
                LOG.error("Can't split into key value : {}", mapping);
            }
        }
    }

    // /**
    //  * Determine whether a document should be indexed based on the presence of a
    //  * given key/value or the RobotsTags.ROBOTS_NO_INDEX directive.
    //  * 
    //  * @return true if the document should be kept.
    //  **/
    // protected boolean filterDocument(Metadata meta) {
    //     String noindexVal = meta.getFirstValue(RobotsTags.ROBOTS_NO_INDEX);
    //     if ("true".equalsIgnoreCase(noindexVal))
    //         return false;

    //     if (filterKeyValue == null)
    //         return true;
    //     String[] values = meta.getValues(filterKeyValue[0]);
    //     // key not found
    //     if (values == null)
    //         return false;
    //     return ArrayUtils.contains(values, filterKeyValue[1]);
    // }

    /** Returns a mapping field name / values for the metadata to index **/
    protected Map<String, String[]> filterMetadata(Metadata meta) {

        Pattern indexValuePattern = Pattern.compile("\\[(\\d+)\\]");

        Map<String, String[]> fieldVals = new HashMap<>();
        Iterator<Entry<String, String>> iter = metadata2field.entrySet()
                .iterator();
        while (iter.hasNext()) {
            Entry<String, String> entry = iter.next();
            // check whether we want a specific value or all of them?
            int index = -1;
            String key = entry.getKey();
            Matcher match = indexValuePattern.matcher(key);
            if (match.find()) {
                index = Integer.parseInt(match.group(1));
                key = key.substring(0, match.start());
            }
            String[] values = meta.getValues(key);
            // not found
            if (values == null || values.length == 0)
                continue;
            // want a value index that it outside the range given
            if (index >= values.length)
                continue;
            // store all values available
            if (index == -1)
                fieldVals.put(entry.getValue(), values);
            // or only the one we want
            else
                fieldVals.put(entry.getValue(), new String[] { values[index] });
        }

        return fieldVals;
    }

    /**
     * Returns the field name to use for the node or null if the node must not be
     * indexed
     **/
    protected String fieldNameForNode() {
        return fieldNameForNode;
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declareStream(
                com.uet.crawling.social.Constants.StatusStreamName,
                new Fields("node", "metadata", "status"));
    }
}
