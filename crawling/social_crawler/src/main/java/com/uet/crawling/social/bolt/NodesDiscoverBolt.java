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
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichBolt;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;

import com.uet.crawling.social.facebook.models.GetCommentsResult;
import com.uet.crawling.social.facebook.models.GetPostResult;
import com.uet.crawling.social.facebook.models.PageResult;
import com.uet.crawling.social.facebook.models.Result;
import com.uet.crawling.social.facebook.models.SearchPageResult;
import com.uet.crawling.social.Constants;
import com.uet.crawling.social.Metadata;
import com.uet.crawling.social.persistence.Status;

import com.restfb.types.Post;
import com.restfb.types.Comment;


public class NodesDiscoverBolt extends StatusEmitterBolt {

    @Override
    public void execute(Tuple tuple) {
        Metadata metadata = (Metadata) tuple.getValueByField("metadata");
        String node = tuple.getStringByField("node");
        Result result = (Result) tuple.getValueByField("result");
        String type = metadata.getFirstValue("type");
        // conganh comment: need to split a new file if you want to generalize 
        Metadata childMetadata = new Metadata();
        switch (type) {
            case Constants.NodeTypeSearchPages:
                childMetadata.setValue("type", Constants.NodeTypeGetPosts);
                SearchPageResult searchPageResult = (SearchPageResult)result;
                List<PageResult> dataPage = searchPageResult.getData();
                for (PageResult pageResult : dataPage) {
                    // childMetadata.setValue("name_page", pageResult.getName());
                    Values tupleToSend = new Values(pageResult.getId(), childMetadata, Status.DISCOVERED);
                    collector.emit(Constants.StatusStreamName, tuple, tupleToSend);
                }
                break;
            case Constants.NodeTypeGetPosts:
                childMetadata.setValue("type", Constants.NodeTypeGetComments);
                GetPostResult getPostResult = (GetPostResult)result;
                List<Post> dataPost = getPostResult.getData();
                for (Post post : dataPost) {
                    Values tupleToSend = new Values(post.getId(), childMetadata, Status.DISCOVERED);
                    collector.emit(Constants.StatusStreamName, tuple, tupleToSend);
                }
                collector.emit(tuple, tuple.getValues());
                break;
            case Constants.NodeTypeGetComments:
                childMetadata.setValue("type", Constants.NodeTypeGetComments);
                GetCommentsResult getCommentsResult = (GetCommentsResult)result;
                List<Comment> dataComments = getCommentsResult.getData();
                for (Comment comment : dataComments) {
                    Values tupleToSend = new Values(comment.getId(), childMetadata, Status.DISCOVERED);
                    collector.emit(Constants.StatusStreamName, tuple, tupleToSend);
                }
                collector.emit(tuple, tuple.getValues());
                break;
            default:
                break;
        }
        // gia
        collector.emit(Constants.StatusStreamName, tuple, new Values(node, metadata, Status.FETCHED));
        collector.ack(tuple);
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        super.declareOutputFields(declarer);
        declarer.declare(new Fields("node", "metadata", "result"));
    }

}
