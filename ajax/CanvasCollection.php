<?php
// error_log('server: '.print_r($_SERVER,1).' '.__FILE__.' '.__LINE__,0);

$db = new PDO('mysql:host=127.0.0.1;dbname=bbjqmcanvasdb','root','');

$table = 'canvas';

// method
$method = $_SERVER['REQUEST_METHOD'];
// error_log('method: '.print_r($method,1).' '.__FILE__.' '.__LINE__,0);

// headers
$headers = getallheaders();
// error_log('headers: '.print_r($headers,1).' '.__FILE__.' '.__LINE__,0);

// data raw
$data = file_get_contents('php://input','rb');
// error_log('raw data: '.print_r($data,1).' '.__FILE__.' '.__LINE__,0);

if ($method === 'GET')
{
    // error_log(print_r($_SERVER['REQUEST_URI'],1).' '.__FILE__.' '.__LINE__,0);
    // error_log(print_r($_GET,1).' '.__FILE__.' '.__LINE__,0);

    $limit = (int) $_GET['limit'];

    $sql = "
        SELECT
            *
        FROM $table
        LIMIT $limit
    ";
    try {
        $s = $db->prepare($sql);
        $s->execute();
        $data = array();
        if ($s->rowCount()){
            while($o = $s->fetch(PDO::FETCH_OBJ)){
                $data[] = json_decode($o->field);
            }
        }
    }
    catch(Exception $e){
        error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
    }
    // error_log(print_r($data,1).' '.__FILE__.' '.__LINE__,0);

    echo json_encode($data);
}
