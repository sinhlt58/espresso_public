/**
 * Licensed to DigitalPebble Ltd under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * DigitalPebble licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.uet.crawling.social.bolt;

import java.util.ArrayList;

import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.slf4j.LoggerFactory;

import com.uet.crawling.social.Constants;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.persistence.Status;

public class NodesDiscoverBolt extends StatusEmitterBolt {

    private static final org.slf4j.Logger LOG = LoggerFactory
            .getLogger(NodesDiscoverBolt.class);

    @Override
    public void execute(Tuple tuple) {
        Metadata metadata = (Metadata) tuple.getValueByField("metadata");
        String node = tuple.getStringByField("node");
        ArrayList<Metadata> listMdResult = (ArrayList<Metadata>) tuple.getValueByField("listMdResult");

        if("true".equals(metadata.getFirstValue("shouldStatus"))){
            for(Metadata md: listMdResult){
                String nodeChild = md.getFirstValue("node");
                Metadata mdChild = new Metadata();
                mdChild.setValue("type", md.getFirstValue("typeToStatus"));
                collector.emit(Constants.StatusStreamName, tuple, 
                    new Values(nodeChild, mdChild, Status.DISCOVERED));
            }
        }

        if("true".equals(metadata.getFirstValue("shouldIndex"))){
            collector.emit(tuple, tuple.getValues());
        }

        collector.ack(tuple);
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        super.declareOutputFields(declarer);
        declarer.declare(new Fields("node", "metadata", "listMdResult"));
    }

}
