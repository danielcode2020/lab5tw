
<?php 
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true ");

include_once 'db/database.php';
include_once 'objects/book.php';

$database = new Database();
$db = $database->getConnection();

$book = new Book($db);

// luam data din post
$data = json_decode(file_get_contents("php://input"));

// verificam datele sa fie complete (not empty)

if (
    !empty($data->title) &&
    !empty($data->author) &&
    !empty($data->price)
){
    // setam valorile la proprietati
    $book->title = $data->title;
    $book->author = $data->author;
    $book->price = $data->price;

    // cream produsul

    if ($book->create()){
        http_response_code(201); // creat cu succes

        echo json_encode(array("message" => "Book was created"));
    }
    else{
        // set response code - 503 service unavailable
        http_response_code(503);
  
        // tell the user
        echo json_encode(array("message" => "Unable to create book."));
    }
}
else{ // data not complete
     // set response code - 400 bad request
     http_response_code(400);
  
     // tell the user
     echo json_encode(array("message" => "Unable to create book. Data is incomplete."));
}
?>
