<?php
require 'HashGenerator.php';
require 'Hashids.php';


$db = new SQLite3('db.db');
$salt = "gc84YTcG";
$hashids = new Hashids\Hashids($salt, 4);
$maxlength = 500000;

//GET
if(isset($_GET['key'])) {
    if ($_GET['key'] != "") {
		$key = $_GET['key'];
		//get id from key
		$numbers = $hashids->decode($key);
		if (!empty($numbers)) {
			//get json file for id
			$id = $numbers[0];
			$result = $db->querySingle("SELECT json FROM task WHERE id = '$id'", true);
			echo $result['json'];
		}
		else {
			echo json_encode(array('error' => 'unknown key'));
		}
	} else {
		echo json_encode(array('error' => 'key is null'));
	}
}

//POST
$json = file_get_contents('php://input');
if(!empty($json)) {

	//secure file
	$j = json_decode($json);
	$j->{'description'} = stripUnwantedTagsAndAttrs($j->{'description'});
	$j->{'task'} = stripUnwantedTagsAndAttrs($j->{'task'});
	
	if (strlen($json)<$maxlength) {
		$stmt = $db->prepare('INSERT INTO task("json") VALUES (:json)');
		$stmt->bindValue(':json', json_encode($j), SQLITE3_TEXT);
		$result = $stmt->execute();
		//$db->querySingle("INSERT INTO task('json') VALUES ($json)");
		echo json_encode(array('key' => $hashids->encode($db->lastInsertRowid())));
	} else {
		echo json_encode(array('error' => 'to big task'));
	}
}

function stripUnwantedTagsAndAttrs($html_str){
	$xml = new DOMDocument();
  	//Suppress warnings: proper error handling is beyond scope of example
	libxml_use_internal_errors(true);
  	//List the tags you want to allow here, NOTE you MUST allow html and body otherwise entire string will be cleared
	$allowed_tags = array("a", "b", "strong", "br", "em", "hr", "i", "li", "ol", "p", "s", "span", "table", "tr", "td", "u", "ul", "pre", "code", "img");
  	//List the attributes you want to allow here
	$allowed_attrs = array ("class", "id", "style", "src", "href");
	if (!strlen($html_str)){return false;}
	//if ($xml->loadHTML($html_str, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD)){
	if ($xml->loadHTML(mb_convert_encoding($html_str, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD)){
	  foreach ($xml->getElementsByTagName("*") as $tag){
		if (!in_array($tag->tagName, $allowed_tags)){
		  $tag->parentNode->removeChild($tag);
		}else{
		  foreach ($tag->attributes as $attr){
			if (!in_array($attr->nodeName, $allowed_attrs)){
			  $tag->removeAttribute($attr->nodeName);
			}
		  }
		}
	  }
	}
	return $xml->saveHTML();
  }
?>