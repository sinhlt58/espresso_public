package com.uet.crawling.social;

import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

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

/**
 * Defines a generic behaviour for ResultServiecs to load resources
 * from a JSON file.
 **/
public interface JSONResource {

    /**
     * @return filename of the JSON resource
     **/

    public String getResourceFile();

    /**
     * Load the resources from an input stream
     * 
     * @throws Exception
     **/
    public void loadJSONResources(InputStream inputStream)
            throws JsonParseException, JsonMappingException, IOException;

    /**
     * Load the resources from the JSON file in the uber jar
     * 
     * @throws Exception
     **/
    public default void loadJSONResources() throws Exception {
        InputStream inputStream = null;
        try {
            inputStream = getClass().getClassLoader()
                    .getResourceAsStream(getResourceFile());
            loadJSONResources(inputStream);
        } finally {
            try {
                inputStream.close();
            } catch (IOException e) {
                // closing silently
            }
        }
    }

}
