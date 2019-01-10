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

import java.util.Map;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichBolt;
import org.apache.storm.tuple.Fields;

import com.uet.crawling.social.Constants;
import com.uet.crawling.social.facebook.ResultServices;

/**
 * Provides common functionalities for Bolts which emit tuples to the status
 * stream, e.g. Fetcher.
 **/
public abstract class StatusEmitterBolt extends BaseRichBolt {

    protected OutputCollector collector;

    protected ResultServices resultServices;

    @Override
    public void prepare(Map stormConf, TopologyContext context,
            OutputCollector collector) {
        resultServices = ResultServices.fromConf(stormConf);
        this.collector = collector;
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declareStream(
            Constants.StatusStreamName,
            new Fields("node", "metadata", "status")
        );
    }

}
