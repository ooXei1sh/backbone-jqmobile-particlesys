<?php
define('CONFIG_BASEURL', 'http://'.$_SERVER['HTTP_HOST'].'/jq-mobile-bbjs/server');
$db = new \PDO('mysql:host=127.0.0.1;dbname=bbjsdb','root','');
$sql = 'SELECT * FROM books';
$s = $db->prepare($sql);
$s->execute();
$objs = $s->fetchAll(\PDO::FETCH_OBJ);
?>
<!doctype html>
<!--[if IEMobile 7 ]>    <html class="no-js iem7"> <![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="js/vendor/jquery.mobile-1.4.0.min.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

<div id="books" data-role="page" data-title="Books">

      <div data-role="header">
            <h1>Books</h1>
      </div>

      <div role="main" class="ui-content">
            <h2>Books</h2>

            <ul id="book-listview" data-role="listview" data-inset="true">
                <?php foreach ($objs as $o){ ?>
                <li>
                    <a href="book/<?php echo $o->id; ?>" id="<?php echo $o->id; ?>" class="ajax-list-item"><?php echo $o->name; ?></a>
                </li>
                <?php } ?>
            </ul>
      </div><!-- /content -->

</div>

<div id="page-book" data-role="page" data-title="Book">

    <div data-role="header">
        <h1>Book</h1>
        <a href="#" data-rel="back">Back</a>
    </div>

    <div role="main" class="ui-content">
        <div id="book-view" class="ui-bar ui-corner-all ui-overlay-shadow"></div>
    </div>
</div>

<!-- book-listview-template tpl -->
<script type="text/x-handlebars-template" id="book-listview-template">
    {{#each item }}
        <li>
            {{item.name}}
        </li>
    {{/each}}
</script>

<!-- book-view-template tpl -->
<script type="text/x-handlebars-template" id="book-view-template">
    <p>Title: {{ item.name }}</p>
    <p>Author: {{ item.author }}</p>
    <p>Year: {{ item.year }}</p>
    <button data-role="button" id="book-btn-delete" value="{{ item.id }}">Delete</button>
    <a href="#" data-role="button" id="book-lnk-edit">Edit</a>
</script>

<script src="<?php echo CONFIG_BASEURL; ?>/js/vendor/requirejs-master/require.js" data-main="<?php echo CONFIG_BASEURL; ?>/js/config"></script>
</body>
</html>
