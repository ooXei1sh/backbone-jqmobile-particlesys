<?php
require_once 'init.php';

if ($method === 'GET')
{
    $id = (int) array_pop(explode('/', $_SERVER['REQUEST_URI']));

    $sql = "
        SELECT
        *
        FROM $table
        WHERE id = :id
        LIMIT 1
    ";
    try {
        $s = $db->prepare($sql);
        $s->bindParam(':id', $id, PDO::PARAM_INT);
        $s->execute();
        if ($s->rowCount()){
            $o = $s->fetchObject();
            $data = array(
                'id' => $o->id,
                'name' => $o->name,
                'field' => (array) json_decode($o->field),
            );
        }
    }
    catch(Exception $e){
        error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
    }
    // error_log(print_r($data,1).' '.__FILE__.' '.__LINE__,0);

    // sanitize($data);

    echo json_encode($data);
}

if ($method === 'PUT')
{
    $data = file_get_contents('php://input','rb');
    // error_log(print_r($data,1).' '.__FILE__.' '.__LINE__,0);

    $data = json_decode($data);

    switch ($data->action) {

        case 'update':

            $sql = "
                UPDATE $table
                SET
                    name = :name,
                    field = :field
                WHERE
                    id = :id
                LIMIT 1
            ";
            try {
                $s = $db->prepare($sql);
                $s->bindParam(':id', $data->id, PDO::PARAM_INT);
                $s->bindParam(':name', $data->name, PDO::PARAM_STR);
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
                    name,
                    field
                )
                VALUES (
                    :name,
                    :field
                )
            ";
            try {
                $s = $db->prepare($sql);
                $s->bindParam(':name', $data->name, PDO::PARAM_STR);
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

if ($method === 'DELETE')
{
    $id = (int) array_pop(explode('/', $_SERVER['REQUEST_URI']));

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
