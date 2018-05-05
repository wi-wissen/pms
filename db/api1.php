<?php
require 'HashGenerator.php';
require 'Hashids.php';


$db = new SQLite3('db.db');
$salt = "gc84YTcG";
$hashids = new Hashids\Hashids($salt, 4);

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
	$stmt = $db->prepare('INSERT INTO task("json") VALUES (:json)');
	$stmt->bindValue(':json', $json, SQLITE3_TEXT);
	$result = $stmt->execute();
	//$db->querySingle("INSERT INTO task('json') VALUES ($json)");
	echo json_encode(array('key' => $hashids->encode($db->lastInsertRowid())));
}
?>