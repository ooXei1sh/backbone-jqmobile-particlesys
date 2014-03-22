<?php
require_once 'init.php';

if ($method === 'GET')
{
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
                $data[] = array(
                    'id' => $o->id,
                    'name' => $o->name,
                    'field' => json_decode($o->field),
                );
            }
        }
    }
    catch(Exception $e){
        error_log(print_r($e->getMessage(),1).' '.__FILE__.' '.__LINE__,0);
    }
    // error_log(print_r($data,1).' '.__FILE__.' '.__LINE__,0);

    // sanitize($data);

    echo json_encode($data);
}
