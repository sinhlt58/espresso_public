<?php
/**
 * Created by PhpStorm.
 * User: Manos Schinas
 *
 * Date: 11/19/15
 * Time: 6:01 PM
 */

class MongoDAO {

    private static $ITEMS = 'Item';
    private static $MEDIA_ITEMS = 'MediaItem';
    private static $STREAM_USERS = 'StreamUser';
    private static $COLLECTIONS = 'Collection';

    private static $ITEM_FIELDS = array('_id'=>1, 'shares'=>1, 'likes'=>1, 'title'=>1, 'tags'=>1, 'user'=>1, 'uid'=>1 ,'source'=>1, 'language'=>1, 'pageUrl'=>1, 'publicationTime'=>1, 'reference'=>1, 'type'=>1, 'location'=>1, 'location.name'=>1, 'location.country'=>1, 'mediaIds'=>1, 'comments'=>1);
    private static $MEDIA_FIELDS = array('_id'=>1, 'shares'=>1, 'likes'=>1, 'views'=>1, 'uid'=>1, 'url'=>1, 'thumbnail'=>1, 'pageUrl'=>1, 'source'=>1, 'publicationTime'=>1, 'indexed'=>1, 'status'=>1, 'reference'=>1, 'title'=>1, 'tags'=>1, 'type'=>1, 'width'=>1, 'height'=>1, 'location'=>1);
    private static $USER_FIELDS = array( '_id'=>1,'username'=>1,'name'=>1, 'items'=>1,'friends'=>1,'followers'=>1,'pageUrl'=>1,'profileImage'=>1, 'mentions'=>1, 'shares'=>1);

    function __construct($host, $db, $username=null, $password=null) {
        if($username != null && $password != null) {
            $auth = array('username' => $username, 'password' => $password, 'db'=>$db);
            $this->mongo = new MongoClient($host, $auth);
        }
        else {
            $this->mongo = new MongoClient($host);
        }
        $this->db = $this->mongo->selectDB($db);
    }

    public function getItem($id) {
        $collection = $this->db->selectCollection( MongoDAO::$ITEMS );
        $item = $collection->findOne(array('_id'=>$id), MongoDAO::$ITEM_FIELDS);
        if($item != null) {
            $item['id'] = $item['_id'];
            unset($item['_id']);

            if(!isset($item['uid'])) {
                return null;
            }

            $uid = $item['uid'];
            $user = $this->getUser($uid);
            if($user == null) {
                return null;
            }
            $item['user'] = $user;

            if (isset($item['mediaIds']) && count($item['mediaIds']) > 0) {
                $item['type'] = 'mediaItem';
                foreach($item['mediaIds'] as $mId) {
                    $mediaItem = $this->getMediaItem($mId);
                    if($mediaItem != null) {
                        $item['mediaUrl'] = $mediaItem['url'];
                        $item['thumbnail'] = $mediaItem['thumbnail'];
                        $item['views'] = $mediaItem['views'];
                        $item['mediaType'] = $mediaItem['type'];
                        break;
                    }
                }
            }
            else {
                $item['type'] = 'item';
            }
            unset($item['mediaIds']);
        }
        return $item;
    }


    public function getMediaItem($id) {
        $collection = $this->db->selectCollection( MongoDAO::$MEDIA_ITEMS );
        $mItem = $collection->findOne(array('_id'=>$id), MongoDAO::$MEDIA_FIELDS);

        return $mItem;
    }

    public function getUser($id) {
        $collection = $this->db->selectCollection(MongoDAO::$STREAM_USERS);
        $user = $collection->findOne(array('_id' => $id), MongoDAO::$USER_FIELDS);
        if ($user != null) {
            $user['id'] = $user['_id'];
            unset($user['_id']);
        }
        return $user;
    }

    public function getUserByUsername($username) {
        $collection = $this->db->selectCollection(MongoDAO::$STREAM_USERS);
        $user = $collection->findOne(array('_id' => $id), MongoDAO::$USER_FIELDS);
        if ($user != null) {
            $user['id'] = $user['_id'];
            unset($user['_id']);
        }
        return $user;
    }


    public function getItems($since, $until, $pageNumber, $nPerPage, $source=null, $language=null, $sort=null, $label=null, $onlyGeoTagged=false) {

        $collection = $this->db->selectCollection( MongoDAO::$ITEMS );

        $query = array();

        // time constraint
        if(isset($since) && is_numeric($since)) {
            $query['publicationTime']['$gt'] = intval($since);
        }
        if(isset($until) && is_numeric($until)) {
            $query['publicationTime']['$lt'] = intval($until);
        }

        if(isset($source)) {
            $sources = explode(',', $source);
            $query['source'] = array('$in' => $sources);
        }

        if($language != null && $language !== 'all' && $language !== 'All') {
            $languages = explode(',', $language);
            $query['language'] = array('$in' => $languages);
        }

        if(isset($label)) {
            $query['labels'] = $label;
        }

        if($onlyGeoTagged) {
            $query['location.coordinates'] = array('$exists' => true);
        }

        $sortBy['publicationTime'] = -1;
        if($sort === 'popularity') {
            $sortBy = array('likes'=>-1);
        }
        else if($sort === 'relevance') {
            // TODO: Use significance score for relevance
            $sortBy = array('likes'=>-1);
        }

        $cursor = $collection->find($query, MongoDAO::$ITEM_FIELDS)
            ->sort($sortBy)
            ->skip(($pageNumber-1)*$nPerPage)
            ->limit($nPerPage);


        $items = iterator_to_array($cursor, false);
        foreach($items as $item) {
            $item['id'] = $item['_id'];
            unset($item['_id']);

            $uid = $item['uid'];
            unset($item['uid']);

            $user = $this->getUser($uid);
            $item['user'] = $user;

            if(isset($item['mediaIds']) && count($item['mediaIds'])>0) {
                $item['type'] = 'mediaItem';
                foreach($item['mediaIds'] as $mId) {
                    $mediaItem = $this->getMediaItem($mId);
                    if($mediaItem != null) {
                        $item['mediaUrl'] = $mediaItem['url'];
                        $item['thumbnail'] = $mediaItem['thumbnail'];
                        $item['views'] = $mediaItem['views'];
                        $item['mediaType'] = $mediaItem['type'];
                        break;
                    }
                }
            }
            else {
                $item['type'] = 'item';
            }
            unset($item['mediaIds']);

        }

        return $items;
    }


    public function getUserCollections($uid, $pageNumber=null, $nPerPage=null) {
        $mongoCollection = $this->db->selectCollection(MongoDAO::$COLLECTIONS);

        $query = array("ownerId" => $uid);

        $cursor = $mongoCollection->find($query)->sort(array("creationDate"=>-1));
		if($pageNumber != null && $nPerPage != null) {
            $cursor->skip(($pageNumber - 1) * $nPerPage)->limit($nPerPage);
        }

        $collections = iterator_to_array($cursor, false);

        return $collections;
    }

    public function getCollection($cid) {
        $mongoCollection = $this->db->selectCollection(MongoDAO::$COLLECTIONS);

        $query = array("_id" => $cid);
        $collection = $mongoCollection->findOne($query);

        return $collection;
    }

    public function insertCollection($collection) {
        $mongoCollection = $this->db->selectCollection(MongoDAO::$COLLECTIONS);
        $mongoCollection->insert($collection);
    }

    public function updateCollection($cid, $collection) {
        $mongoCollection = $this->db->selectCollection(MongoDAO::$COLLECTIONS);

        $criteria = array("_id" => $cid);
        $mongoCollection->update($criteria, $collection);
    }

    public function updateCollectionFields($cid, $fieldsToUpdate) {
        $mongoCollection = $this->db->selectCollection(MongoDAO::$COLLECTIONS);

        $criteria = array("_id" => $cid);
        $ops = array('$set' => $fieldsToUpdate);
        $mongoCollection->update($criteria, $ops);
    }

    public function deleteCollection($cid) {
        $mongoCollection = $this->db->selectCollection(MongoDAO::$COLLECTIONS);

        $criteria = array("_id" => $cid);
        $status = $mongoCollection->remove($criteria);

        return $status;
    }
}
