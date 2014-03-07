<?php
// error_log('server: '.print_r($_SERVER,1).' '.__FILE__.' '.__LINE__,0);

// method
$method = $_SERVER['REQUEST_METHOD'];
// error_log('method: '.print_r($method,1).' '.__FILE__.' '.__LINE__,0);

// headers
$headers = getallheaders();
// error_log('headers: '.print_r($headers,1).' '.__FILE__.' '.__LINE__,0);

$data = file_get_contents('php://input','rb');
// error_log('raw data: '.print_r($data,1).' '.__FILE__.' '.__LINE__,0);

$db = new PDO('mysql:host=127.0.0.1;dbname=bbjsdb','root','');

if ($method === 'GET')
{
    // error_log(print_r($_SERVER['REQUEST_URI'],1).' '.__FILE__.' '.__LINE__,0);
    $uri_parts = explode('/', $_SERVER['REQUEST_URI']);
    $id = (int) array_pop($uri_parts);
    $sql = '
        SELECT
            id,
            name,
            author,
            year
        FROM books
    ';
    try {
        $s = $db->prepare($sql);
        $s->execute();
        if ($s->rowCount()){
            $data = $s->fetchAll(PDO::FETCH_OBJ);
        }
    }
    catch(Exception $e){
        error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
    }

    echo json_encode($data);
}
