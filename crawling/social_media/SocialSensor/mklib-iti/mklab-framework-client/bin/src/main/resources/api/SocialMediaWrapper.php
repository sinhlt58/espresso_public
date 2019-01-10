<?php
/**
 * Created by PhpStorm.
 * User: manosetro
 * Date: 12/16/15
 * Time: 11:51 AM
 */

require "vendor/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;
use MetzWeb\Instagram\Instagram;

class SocialMediaWrapper {
    function __construct() {

        $ini = parse_ini_file('credentials.ini', true);

        if(isset($ini['Google'])) {
            $this->googleClient = new Google_Client();
            $this->googleClient->setApplicationName($ini['Google']['applicationName']);
            $this->googleClient->setDeveloperKey($ini['Google']['developerKey']);

            $this->plus = new Google_Service_Plus($this->googleClient);
            $this->youtube = new Google_Service_YouTube($this->googleClient);
        }

        if(isset($ini['Facebook'])) {
            $this->fb = new Facebook\Facebook(
                [
                    'app_id' => $ini['Facebook']['app_id'],
                    'app_secret' => $ini['Facebook']['app_secret'],
                    'access_token' => $ini['Facebook']['access_token'],
                    'default_graph_version' => 'v2.5'
                ]
            );
        }

        if(isset($ini['Instagram'])) {
            $this->instagram = new Instagram(
                [
                    'apiKey' => $ini['Instagram']['apiKey'],
                    'apiSecret' => $ini['Instagram']['apiSecret'],
                    'apiCallback' => 'YOUR_APP_CALLBACK'
                ]
            );
        }

        if(isset($ini['Twitter'])) {
            $this->twitter = new TwitterOAuth(
                $ini['Twitter']['apikey'],
                $ini['Twitter']['apiSecret'],
                $ini['Twitter']['accessToken'],
                $ini['Twitter']['accessTokenSecret']);
        }

    }

    public function search($username, $source) {
        if($source == 'Twitter') {
            return $this->searchTwitter($username);
        }

        if($source == 'GooglePlus') {
            return $this->searchGooglePlus($username);
        }

        if($source == 'Youtube') {
            return $this->searchYoutube($username);
        }

        if($source == 'Facebook') {
            return $this->searchFacebook($username);
        }

        if($source == 'Instagram') {
            return $this->searchInstagram($username);
        }

        return array();

    }

    private function searchTwitter($username) {
        $users = array();

        if($this->twitter == null) {
            return $users;
        }

        $params = array("q"=>$username);
        $response = $this->twitter->get("users/search", $params);

        if(isset($response->errors)) {
            return $response;
        }

        foreach($response as $userFound) {
            $users[] = array(
                "id" => $userFound->id_str,
                "username" => $userFound->screen_name,
                "name" => $userFound->name,
                "description" => $userFound->description,
                "followers_count" => $userFound->followers_count,
                "friends_count" => $userFound->friends_count,
                "favourites_count" => $userFound->favourites_count,
                "statuses_count" => $userFound->statuses_count,
                "favourites_count" => $userFound->favourites_count,
                "profileImage" => $userFound->profile_image_url_https,
                "coverImage" => $userFound->profile_background_image_url_https,
                "source" => "Twitter"
            );
        }
        return $users;
    }

    private function searchInstagram($username) {

        if($this->instagram == null) {
            return array();
        }

        $response = $this->instagram->searchUser($username, 20);
        $data = array_map(
            function($entry) {
                return array(
                    'id' =>  $entry->id,
                    'username' =>  $entry->username,
                    'name' => $entry->full_name,
                    'profileImage' => $entry->profile_picture,
                    'source' => 'Instagram'
                );
            }, $response->data
        );

        return $data;
    }

    private function searchFacebook($username) {
        try {
            if($this->fb == null) {
                return array();
            }

            $fields = 'id,name,username,cover,link,picture,description,engagement';
            $response = $this->fb->get("/search?q=$username&fields=$fields&type=page&limit=20", '260504214011769|964663756aa84795ad1b37c2c3d86bf9');
            $body = $response->getDecodedBody();
            $data = $body['data'];

            $data = array_map(
                function($page) {
                    $page['source'] = 'Facebook';
                    if(isset( $page['cover'])) {
                        $page['coverImage'] = $page['cover']['source'];
                        unset($page['cover']);
                    }
                    $page['profileImage'] = $page['picture']['data']['url'];
                    unset($page['picture']);

                    $page['likes'] = $page['engagement']['count'];
                    unset($page['engagement']);

                    if(!isset( $page['description'])) {
                        $page['description'] = "";
                    }

                    if(!isset( $page['username'])) {
                        $page['username'] = "";
                    }

                    return $page;
                }, $data);

            return $data;

        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            return array();
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            return array();
        }
    }

    private function searchYoutube($username) {
        if($this->youtube == null) {
            return array();
        }

        $searchResponse = $this->youtube->search->listSearch('id,snippet',
            array(
                'type' => 'channel',
                'q' => $username,
                'maxResults' => 20
            )
        );

        $channels = array();
        foreach ($searchResponse['items'] as $searchResult) {
            $channels[]= array(
                'id' => $searchResult['id']['channelId'],
                'name' => $searchResult['snippet']['title'],
                'description' => $searchResult['snippet']['description'],
                'url' => "https://www.youtube.com/channel/" . $searchResult['id']['channelId'],
                'source' => 'Youtube',
                'profileImage' => $searchResult['snippet']['thumbnails']['default']['url']
            );
        }
        return $channels;
    }

    private function searchGooglePlus($username) {
        if($this->plus == null) {
            return array();
        }

        $optParams = array('maxResults' => 20);
        $results = $this->plus->people->search($username, $optParams);

        $users = array();
        foreach ( $results['items'] as $result ) {
            $url = $result['url'];
            $uName = str_replace("https://plus.google.com/+", "", $url);
            if(0 === strpos($uName, 'http')) {
                $uName = "";
            }

            $users[]= array(
                'id' => $result['id'],
                'username' => $uName,
                'name' => $result['displayName'],
                'url' => $url,
                'source' => 'GooglePlus',
                'profileImage' => $result['image']['url']
            );
        }

        return $users;
    }
}
