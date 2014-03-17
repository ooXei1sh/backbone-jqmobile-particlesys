<?php
// error_log('server: '.print_r($_SERVER,1).' '.__FILE__.' '.__LINE__,0);

$db = new PDO('mysql:host=127.0.0.1;dbname=bbjqmcanvasdb','root','');

$table = 'canvas';

// method
$method = $_SERVER['REQUEST_METHOD'];
$method = isset($_GET['method']) ? $_GET['method'] : $method;
// error_log('method: '.print_r($method,1).' '.__FILE__.' '.__LINE__,0);

// headers
$headers = getallheaders();
// error_log('headers: '.print_r($headers,1).' '.__FILE__.' '.__LINE__,0);

// data raw
$data = file_get_contents('php://input','rb');
// error_log('raw data: '.print_r($data,1).' '.__FILE__.' '.__LINE__,0);



if ($method === 'GET')
{
    // error_log(print_r($_GET,1).' '.__FILE__.' '.__LINE__,0);
    $type = (string) $_GET['type'];
    // error_log(print_r($type,1).' '.__FILE__.' '.__LINE__,0);

    $sql = "
        SELECT
        *
        FROM $table
        WHERE type = :type
        LIMIT 1
    ";
    try {
        $s = $db->prepare($sql);
        $s->bindParam(':type', $type, PDO::PARAM_STR);
        $s->execute();
        if ($s->rowCount()){
            $o = $s->fetchObject();
            $data = json_decode($o->field);
        }
    }
    catch(Exception $e){
        error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
    }
    // error_log(print_r($data,1).' '.__FILE__.' '.__LINE__,0);

    echo json_encode($data);
}

if ($method === 'POST')
{
    $data = json_decode($data);
    // error_log(print_r($data,1).' '.__FILE__.' '.__LINE__,0); exit();

    switch ($data->action) {

        case 'update':

            $sql = "
                UPDATE $table
                SET
                    field = :field
                WHERE
                    type = :type
                LIMIT 1
            ";
            try {
                $s = $db->prepare($sql);
                $s->bindParam(':type', $data->type, PDO::PARAM_STR);
                $s->bindParam(':field', json_encode($data->field), PDO::PARAM_STR);
                $s->execute();
                $data->id = $db->lastInsertId();
            }
            catch(Exception $e){
                error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
            }

            break;

        case 'insert':

            $sql = "
                INSERT INTO $table
                (
                    type,
                    field
                )
                VALUES (
                    :type,
                    :field
                )
            ";
            try {
                $s = $db->prepare($sql);
                $s->bindParam(':type', $data->type, PDO::PARAM_STR);
                $s->bindParam(':field', json_encode($data->field), PDO::PARAM_STR);
                $s->execute();
                $data->id = $db->lastInsertId();
            }
            catch(Exception $e){
                error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
            }

            break;

        default:
            $data = json_encode(array());
            break;

    }

    echo json_encode($data);
}

error_log(print_r($_GET,1).' '.__FILE__.' '.__LINE__,0);
if ($method === 'DELETE')
{
    error_log(print_r('delete',1).' '.__FILE__.' '.__LINE__,0);
    $uri_parts = explode('/', $_SERVER['REQUEST_URI']);
    $id = (int) array_pop($uri_parts);
    $sql = "
        DELETE FROM $table
        WHERE id = :id
        LIMIT 1
    ";
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
