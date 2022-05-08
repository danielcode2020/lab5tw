<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
include_once 'db/database.php';
include_once 'objects/book.php';

$database = new Database();
$db = $database->getConnection();

$book = new Book($db);

// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of product to be edited
$book->id = $data->id;

$book->title = $data->title;
$book->author = $data->author;
$book->price = $data->price;

if ($book->update()){
    http_response_code(200);

    echo json_encode(array("message" => "Book was updated."));
}
else{
  
    // set response code - 503 service unavailable
    http_response_code(503);
  
    // tell the user
    echo json_encode(array("message" => "Unable to update book."));
}

?>