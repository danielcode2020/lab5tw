<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once 'db/database.php';
include_once 'objects/book.php';

$database = new Database();
$db = $database->getConnection();

$book = new Book($db);

$book->id = isset($_GET['id']) ? $_GET['id'] : die();

$book->readOne();

if($book->title!=null){
    $book_arr = array(
        "id" => $book->id,
        "title" => $book->title,
        "author" => $book->author,
        "price" => $book->price
    );
    // set response code - 200 OK
    http_response_code(200);
  
    // make it json format
    echo json_encode($book_arr);
}
else{
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user product does not exist
    echo json_encode(array("message" => "book does not exist."));
}
?>