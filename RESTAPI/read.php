<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// baza de date si obiectul cu care vom lucra
include_once 'db/database.php';
include_once 'objects/book.php';

// initializam baza de date
$database = new Database();
$db = $database->getConnection();

// initializam obiectul
$book = new Book($db);

// queriul propriu zis
$stmt = $book->read();

$num = $stmt->rowCount();

if($num > 0){

    $books_arr = array();
    $books_arr["records"] = array();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $book_item = array(
            "id" => $id,
            "title" => $title,
            "author" => $author,
            "price" => $price
        );

        array_push($books_arr["records"],$book_item);
    }

    http_response_code(200);

    echo json_encode($books_arr);
}
else {

    http_response_code(404);

    echo json_encode(
        array("message" => "No books found.")
    );
}

?>