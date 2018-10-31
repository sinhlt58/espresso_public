<?php
/**
 * Created by PhpStorm.
 * User: Manos Schinas
 * Date: 11/19/15
 * Time: 6:59 PM
 */

class TextIndex {
    function __construct($host, $collection, $port=8983) {
        $config = array(
            'endpoint' => array(
                'items' => array(
                    'host' => $host,
                    'port' => $port,
                    'path' => "/solr/$collection"
                )
            )
        );

        $this->client = new Solarium\Client($config);
    }


    public function searchItems($q, $pageNumber=1, $nPerPage=20, $filters=null, $sort=null) {

        // to be used
        //$helper = $query->getHelper();

        $query = $this->client->createSelect();
        if($q != null) {
            $query->setQuery($q);
        }

        $hlUsed = false;

        if($filters != null && isset($filters['allText'])) {
            $fq = $filters['allText'];
            $hl = $query->getHighlighting();
            $hl->setFields(array('title'));
            $hl->setSimplePrefix('<span class="highlight">');
            $hl->setSimplePostfix('</span>');
            $hl->setQuery("title:$fq OR allText:$fq");
            $hlUsed = true;
        }

        // sort by
        if($sort != null && $sort != 'recency') {

            if($sort === 'relevance') {
                $query->addSort('score', Solarium\QueryType\Select\Query\Query::SORT_DESC);
                $query->addSort('sum(product(0.7,likes),product(0.3,shares))', Solarium\QueryType\Select\Query\Query::SORT_DESC);
            }
            else if($sort === 'popularity') {
                $query->addSort('sum(product(0.7,likes),product(0.3,shares))', Solarium\QueryType\Select\Query\Query::SORT_DESC);
                $query->addSort('publicationTime', Solarium\QueryType\Select\Query\Query::SORT_DESC);
            }
            else {
                $query->addSort('publicationTime', Solarium\QueryType\Select\Query\Query::SORT_DESC);
            }
        }
        else {
            $query->addSort('publicationTime', Solarium\QueryType\Select\Query\Query::SORT_DESC);
        }

        // filters
        if($filters != null) {
            foreach($filters as $filterKey=>$filterValue) {
                $query->createFilterQuery($filterKey)->setQuery("$filterKey:($filterValue)");
            }
        }

        // paging
        $query->setStart(($pageNumber-1)*$nPerPage);
        $query->setRows($nPerPage);

        $query->setFields(['id', 'score']);

        $ids = array();
        try {
            $resultSet = $this->client->execute($query);
            $highlighting = $resultSet->getHighlighting();

            foreach ($resultSet as $document) {
                $doc = array(
                    'id' => $document['id'],
                    'score' => $document['score']
                );

                if($hlUsed) {
                    $highlightedDoc = $highlighting->getResult($document['id']);
                    if ($highlightedDoc) {
                        $title_hl = $highlightedDoc->getField('title');
                        if ($title_hl != null && count($title_hl) > 0) {
                            $doc['title_hl'] = $title_hl[0];
                        }
                    }
                }

                $ids[] = $doc;
            }
        }
        catch(Exception $e) {
            return $e->getMessage();
        }

        return $ids;
    }

    public function countItems($q, $filters=null) {
        $query = $this->client->createSelect();
        if($query != null) {
            $query->setQuery($q);
        }

        if($filters != null) {
            foreach($filters as $filterKey=>$filterValue) {
                $query->createFilterQuery($filterKey)->setQuery("$filterKey:($filterValue)");
            }
        }

        $count = 0;
        try {
            $resultSet = $this->client->execute($query);
            $count = $resultSet->getNumFound();
        }
        catch(Exception $e) {}

        return $count;
    }

    public function statistics($fields, $q, $filters=null) {
        $query = $this->client->createSelect();
        if($query != null) {
            $query->setQuery($q);
        }

        if($filters != null) {
            foreach($filters as $filterKey=>$filterValue) {
                $query->createFilterQuery($filterKey)->setQuery("$filterKey:($filterValue)");
            }
        }

        $stats = $query->getStats();
        $fields = explode(',', $fields);
        foreach($fields as $field) {
            $stats->createField($field);
        }

        $statistics = array();
        try {
            $resultSet = $this->client->execute($query);
            $count = $resultSet->getNumFound();

            $statsResult = $resultSet->getStats();
            foreach ($statsResult as $field) {
                $statistics[$field->getName()] = array(
                    'sum' => $field->getSum(),
                    'max' => $field->getMax(),
                    'min' => $field->getMin(),
                    'avg' => $field->getMean(),
                    'stddev' => $field->getStddev()
                );
            }

            $statistics['total'] = $count;
        }
        catch(Exception $e) { return $e; }

        return $statistics;
    }

    public function fieldsCount($fields, $q, $filters=null) {

        $query = $this->client->createSelect();
        if($query != null) {
            $query->setQuery($q);
        }

        if($filters != null) {
            foreach($filters as $filterKey => $filterValue) {
                $query->createFilterQuery($filterKey)->setQuery("$filterKey:($filterValue)");
            }
        }

        $stats = $query->getStats();
        $fields = explode(',', $fields);
        foreach($fields as $fieldName) {
            $stats->createField("{!countDistinct=false cardinality=0.5 min=true}$fieldName");
        }

        $statistics = array();
        try {
            $resultSet = $this->client->execute($query);
			
			$data = $resultSet->getData();
            $stats = $data['stats']['stats_fields'];
            foreach ($stats as $field=>$fieldStats) {
                $statistics[$field] = array(
                    'cardinality' => $fieldStats['cardinality'],
                );
            }

			/*
            $statsResult = $resultSet->getStats();
            foreach ($statsResult as $fieldStats) {
                $statistics[$fieldStats->getName()] = array(
                    'cardinality' => $fieldStats->getCardinality()
                );
            }
			*/

        }
        catch(Exception $e) { return $e; }

        return $statistics;
    }

    public function getFacet($facetField, $q, $filters = array(), $n = 10, $includeAll=true, $prefix=null) {

        // get a select query instance
        $query = $this->client->createSelect();
        $query->setQuery($q);

        // set filter queries
        if($filters != null) {
            foreach($filters as $filterKey => $filterValue) {
                $fq = $filterKey . ':(' . $filterValue . ')';
                $query->createFilterQuery($filterKey)->setQuery($fq);
            }
        }

        // get the facet set component
        $facetSet = $query->getFacetSet();
        $facetSet->setMinCount(1);
        $facetSet->setLimit($n);

        // create a facet field instance and set options
        $ff = $facetSet->createFacetField($facetField);
        $ff->setField($facetField)->setMissing(false);
        if($prefix != null) {
            $ff->setPrefix($prefix);
        }

        // this executes the query and returns the result
        $resultSet = $this->client->execute($query);
        $facet = $resultSet->getFacetSet()->getFacet($facetField);

        $facets = array();
        if($includeAll) {
            $facets[] = array('field' => 'all', 'count' => $resultSet->getNumFound());
        }
        foreach ($facet as $value => $count) {
            $facets[] = array('field' => $value, 'count'=>$count);
        }

        return $facets;
    }

    public function getFacetAndCount($facetField, $q, $filters = array(), $n = 10, $includeAll=true, $prefix=null) {

        // get a select query instance
        $query = $this->client->createSelect();
        $query->setQuery($q);

        // set filter queries
        if($filters != null) {
            foreach($filters as $filterKey => $filterValue) {
                $fq = $filterKey . ':(' . $filterValue . ')';
                $query->createFilterQuery($filterKey)->setQuery($fq);
            }
        }

        // get the facet set component
        $facetSet = $query->getFacetSet();
        $facetSet->setMinCount(1);
        $facetSet->setLimit($n);

        // create a facet field instance and set options
        $ff = $facetSet->createFacetField($facetField);
        $ff->setField($facetField)->setMissing(false);
        if($prefix != null) {
            $ff->setPrefix($prefix);
        }

        // this executes the query and returns the result
        $resultSet = $this->client->execute($query);
        $facet = $resultSet->getFacetSet()->getFacet($facetField);

        $facets = array();
        if($includeAll) {
            $facets[] = array('field' => 'all', 'count' => $resultSet->getNumFound());
        }
        foreach ($facet as $value => $count) {
            $facets[] = array('field' => $value, 'count'=>$count);
        }

        return array('facet'=>$facets, 'count'=>$resultSet->getNumFound());
    }

    public function get2DFacet($facetField, $q, $filters = array(), $minLat=-90, $maxLat=90, $minLong=-180, $maxLong=180) {

        // get a select query instance
        $query = $this->client->createSelect();
        $query->setQuery($q);

        // set filter queries
        if($filters != null) {
            foreach($filters as $filterKey => $filterValue) {
                $fq = $filterKey . ':(' . $filterValue . ')';
                $query->createFilterQuery($filterKey)->setQuery($fq);
            }
        }

        // get the facet set component
        $facetSet = $query->getFacetSet();
        $facetSet->setMinCount(1);

        // create a facet field instance and set options
        $ff = $facetSet->createFacetField($facetField);
        $ff->setField($facetField)->setMissing(false);

        $query->addParam('facet.heatmap', $facetField);

        $bottomPoint = "$minLong $minLat";
        $upperPoint = "$maxLong $maxLat";
        $query->addParam('facet.heatmap.geom', '["' . $bottomPoint . '" TO "' . $upperPoint . '"]');

        // grid level is unused as this value is computed via distErrPct
        //$query->addParam('facet.heatmap.gridLevel', 3);
        $query->addParam('facet.heatmap.distErrPct', '0.15');   // change this for better accuracy
        $query->addParam('facet.heatmap.format', 'ints2D');

        // this executes the query and returns the result
        $resultSet = $this->client->execute($query);
        $data = $resultSet->getData();

        $data = $data['facet_counts']['facet_heatmaps'][$facetField];
        $data = array_chunk($data, 2, false);
        $data = array_map(function($e) { return array($e[0]=>$e[1]); }, $data);
        $results = array();
        foreach($data as $r) {
            $results = array_merge($results, $r);
        }

        $points = array();
        $total = 0;

        $counts_ints2D = $results['counts_ints2D'];
        // X
        $minX = $results['minX'];
        $maxX = $results['maxX'];
        $columns = $results['columns'];
        $stepX = ($maxX - $minX) / $columns;

        // Y
        $minY = $results['minY'];
        $maxY = $results['maxY'];
        $rows = $results['rows'];
        $stepY = ($maxY - $minY) / $rows;

        for($i = 0; $i < $rows; $i++) {
            $row = $counts_ints2D[$i];
            if($row != null) {
                $y = $maxY - ($i * $stepY);
                for($j = 0; $j < $columns; $j++) {
                    $x = $minX + ($j * $stepX);
                    if($row[$j] > 0) {
                        $total = $total + $row[$j];
                        $points[] = array(
                            'longitude' => $x,
                            'latitude' => $y,
                            'count' => $row[$j]
                        );
                    }
                }
            }
        }

        $temp = array();
        $temp['total'] = $total;
        $temp['rows'] = $rows;
        $temp['columns'] = $columns;
        $temp['latitudeStep'] = $stepY;
        $temp['longitudeStep'] = $stepX;
        $temp['minLatitude'] = $minY;
        $temp['maxLatitude'] = $maxY;
        $temp['minLongitude'] = $minX;
        $temp['maxLongitude'] = $maxX;

        $temp['gridLevel'] = $results['gridLevel'];


        $temp['points'] = $points;

        return $temp;
    }

    public function getRangeFacet($facetField, $q, $filters, $gap, $start, $end) {

        // get a select query instance
        $query = $this->client->createSelect();
        $query->setQuery($q);

        // set filter queries
        if($filters != null) {
            foreach($filters as $filterKey => $filterValue) {
                $fq = $filterKey . ':(' . $filterValue . ')';
                $query->createFilterQuery($filterKey)->setQuery($fq);
            }
        }

        // get the facet set component
        $facetSet = $query->getFacetSet();
        $facetSet->createFacetRange($facetField)
            ->setField($facetField)
            ->setStart($start)
            ->setEnd($end)
            ->setGap($gap);

        // this executes the query and returns the result
        try {
            $resultSet = $this->client->execute($query);
        }
        catch(Exception $e) {
            return $e;
        }


        $facets = array();

        $facet = $resultSet->getFacetSet()->getFacet($facetField);
        foreach ($facet as $range => $count) {
            $facets[] = array('field' => $range, 'count'=>$count);
        }

        return $facets;
    }

    public function getClusters($q, $filters = null, $rows=1000) {
        // get a select query instance
        $query = $this->client->createSelect();
        $query->setQuery($q);
        $query->setHandler('clustering');
        $query->addParam('clustering.engine', 'lingo');

        $query->addSort('score', Solarium\QueryType\Select\Query\Query::SORT_DESC);
        //$query->addSort('sum(product(0.9,sqrt(likes)),product(0.1,sqrt(shares)))', Solarium\QueryType\Select\Query\Query::SORT_DESC);

        // set filter queries
        if($filters != null) {
            foreach($filters as $filterKey => $filterValue) {
                $fq = $filterKey . ':(' . $filterValue . ')';
                $query->createFilterQuery($filterKey)->setQuery($fq);
            }
        }

        $query->setRows($rows);

        $resultSet = $this->client->execute($query);

        $data = $resultSet->getData();
        return $data['clusters'];

    }
}
