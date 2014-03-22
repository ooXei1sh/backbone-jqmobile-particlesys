<?php
require_once 'conf.php';
require_once 'utils.php';

$db = new PDO('mysql:host='.$dbhost.';dbname='.$dbname, $dbuser, $dbpass);

$method = $_SERVER['REQUEST_METHOD'];
// error_log('method: '.print_r($method,1).' '.__FILE__.' '.__LINE__,0);

$headers = getallheaders();
// error_log('headers: '.print_r($headers,1).' '.__FILE__.' '.__LINE__,0);

// error_log(print_r($_SERVER['REQUEST_URI'],1).' '.__FILE__.' '.__LINE__,0);

// error_log(print_r($_GET,1).' '.__FILE__.' '.__LINE__,0);
