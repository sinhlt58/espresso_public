package com.uet.crawling.social;

import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

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
