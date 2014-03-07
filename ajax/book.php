<?php

// method
$method = $_SERVER['REQUEST_METHOD'];
// error_log('method: '.print_r($method,1).' '.__FILE__.' '.__LINE__,0);

// headers
$headers = getallheaders();
// error_log('headers: '.print_r($headers,1).' '.__FILE__.' '.__LINE__,0);

// data raw
$data = file_get_contents('php://input','rb');
// error_log('data: '.print_r($data,1).' '.__FILE__.' '.__LINE__,0);

// pdo
$db = new PDO('mysql:host=127.0.0.1;dbname=bbjsdb','root','');
// error_log('server: '.print_r($_SERVER,1).' '.__FILE__.' '.__LINE__,0);

/**
 * Get
 */
if ($method === 'GET')
{
    if (!empty($_GET)){
        // error_log(print_r($_GET,1).' '.__FILE__.' '.__LINE__,0);
        $id = (int) $_GET['id'];
    }
    else {
        // error_log(print_r($_SERVER['REQUEST_URI'],1).' '.__FILE__.' '.__LINE__,0);
        $uri_parts = explode('/', $_SERVER['REQUEST_URI']);
        $id = (int) array_pop($uri_parts);
    }

    $sql = '
        SELECT
            id,
            name,
            author,
            year
        FROM books
        WHERE id = :id
        LIMIT 1
    ';

    try {
        $s = $db->prepare($sql);
        $s->bindParam(':id', $id, PDO::PARAM_INT);
        $s->execute();
        if ($s->rowCount()){
            $data = $s->fetchAll(PDO::FETCH_OBJ);
        }
    }
    catch(Exception $e){
        error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
    }

    $json = json_encode($data);
    // error_log(print_r($data,1).' '.__FILE__.' '.__LINE__,0);
    // error_log(print_r($json,1).' '.__FILE__.' '.__LINE__,0);

    echo $json;
}

if ($method === 'POST')
{
    // content type
    // $content_type = $headers['Content-Type'];
    // error_log('content type: '.print_r($content_type,1).' '.__FILE__.' '.__LINE__,0);

    $data = json_decode($data);
    // error_log(print_r($data,1).' '.__FILE__.' '.__LINE__,0);

    $sql = '
        INSERT INTO books
        (
            name,
            author,
            year
        )
        VALUES (
            :name,
            :author,
            :year
        )
    ';

    try {
        $s = $db->prepare($sql);
        $s->bindParam(':name', $data->name, PDO::PARAM_STR);
        $s->bindParam(':author', $data->author, PDO::PARAM_STR);
        $s->bindParam(':year', date('Y-m-d', strtotime($data->year)), PDO::PARAM_STR);
        $s->execute();
        $data->id = $db->lastInsertId();
    }
    catch(Exception $e){
        error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
    }

    echo json_encode($data);
}

if ($method === 'DELETE')
{
    $uri_parts = explode('/', $_SERVER['REQUEST_URI']);
    $id = (int) array_pop($uri_parts);
    $sql = '
        DELETE FROM books
        WHERE id = :id
        LIMIT 1
    ';
    try {
        $s = $db->prepare($sql);
        $s->bindParam(':id', $id, PDO::PARAM_INT);
        $s->execute();
        if ($s->rowCount()){
            echo json_encode(array());
        }
    }
    catch(Exception $e){
        error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
    }
}
