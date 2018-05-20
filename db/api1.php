<?php
require 'HashGenerator.php';
require 'Hashids.php';

include 'salts.php';

$db = new SQLite3('db.db');
$hashtaskids = new Hashids\Hashids($saltTask, 4);
$hashcollectionids = new Hashids\Hashids($saltCollection, 4);
$maxlength = 500000;

if(isset($_GET['type'])) {
	if ($_GET['type'] == "t") {
		//GET
		if(isset($_GET['key'])) {
				if ($_GET['key'] != "") {
				$key = $_GET['key'];
				//get id from key
				$numbers = $hashtaskids->decode($key);
				if (!empty($numbers)) {
					//get json file for id
					$id = $numbers[0];
					$result = $db->querySingle("SELECT json FROM tasks WHERE id = '$id'", true);
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
			$j->description = stripUnwantedTagsAndAttrs($j->description);
			$j->task = stripUnwantedTagsAndAttrs($j->task);
			
			if (strlen($json)<$maxlength) {
				$stmt = $db->prepare('INSERT INTO tasks("json") VALUES (:json)');
				$stmt->bindValue(':json', json_encode($j), SQLITE3_TEXT);
				$result = $stmt->execute();
				//$db->querySingle("INSERT INTO task('json') VALUES ($json)");
				echo json_encode(array('key' => $hashtaskids->encode($db->lastInsertRowid())));
			} else {
				echo json_encode(array('error' => 'to big task'));
			}
		}
	} elseif ($_GET['type'] == "c") {
		//GET
		if(isset($_GET['key'])) {
				if ($_GET['key'] != "") {
				$key = $_GET['key'];
				//get id from key
				$numbers = $hashcollectionids->decode($key);
				if (!empty($numbers)) {
					//get json file for id
					$id = $numbers[0];
					$result = $db->querySingle("SELECT json FROM collections WHERE id = '$id'", true);
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

			$j->landingpage = secureURL($j->landingpage);

			foreach($j->list as $item)
			{
				preg_match('/([a-zA-Z0-9]+)$/', $item->name, $matches);
				$item->name = $matches[0];
			}
			
			if (strlen($json)<$maxlength) {
				$stmt = $db->prepare('INSERT INTO collections("json") VALUES (:json)');
				$stmt->bindValue(':json', json_encode($j), SQLITE3_TEXT);
				$result = $stmt->execute();
				echo json_encode(array('key' => $hashcollectionids->encode($db->lastInsertRowid())));
			} else {
				echo json_encode(array('error' => 'to big collection'));
			}
		}
	}
}
else {
	echo json_encode(array('error' => 'unknown typ'));
}

function stripUnwantedTagsAndAttrs($html_str){
	if ($html_str == "") {
		return "";		
	} 
	else {	
		$xml = new DOMDocument();
		//Suppress warnings: proper error handling is beyond scope of example
		libxml_use_internal_errors(true);
		//List the tags you want to allow here, NOTE you MUST allow html and body otherwise entire string will be cleared
		$allowed_tags = array("a", "b", "strong", "br", "em", "hr", "i", "li", "ol", "p", "s", "span", "table", "tr", "td", "u", "ul", "pre", "code", "img");
		//List the attributes you want to allow here
		$allowed_attrs = array ("class", "id", "style", "src", "href", "spellcheck");
		if (!strlen($html_str)){return "";}
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
}

function secureURL($url) {
	//$url = filter_var($url, FILTER_SANITIZE_STRING);

	if (substr($url, 0, 4) == 'http' && filter_var($url, FILTER_VALIDATE_URL) && filter_var($url, FILTER_SANITIZE_STRING)) {
		return $url;
	} else {
		return "/untrustedurl.html" . "?/" . $bodytag = str_replace("/", "&#47;", htmlspecialchars($url)); ;
	}
}

?>