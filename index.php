<?php
define('CONFIG_BASEURL', 'http://'.$_SERVER['HTTP_HOST'].'/jq-mobile-bbjs/canvas');
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
        <h1>Canvas</h1>
    </div>
    <div data-role="content">
        <div class="ui-grid-a ui-content ui-responsive">
            <div class="ui-block-a">
                <div id="canvas-listview" data-role="collapsible-set" data-inset="true"></div>
            </div>
            <div class="ui-block-b">
                <div id="canvas-view" class="ui-btn ui-corner-all"></div>
            </div>
        </div>
    </div>
</div>

<!-- templates -->
<script type="text/x-handlebars-template" id="canvas-listview-template">
    {{#each collection}}
        <div data-role="collapsible" data-collapsed="true">
            <h1 id="hl-{{ type }}" data-canvastype="{{ type }}" class="ajax-hl">{{ type }}</h1>
            <p>
                <button id="btn-start-{{ type }}" class="ui-btn ui-corner-all ui-btn-inline ui-icon-power ui-btn-icon-left ui-shadow-icon ui-btn-c">Start</button>
                <button id="btn-stop-{{ type }}" class="ui-btn ui-corner-all ui-btn-inline ui-icon-forbidden ui-btn-icon-left ui-shadow-icon ui-btn-c">Stop</button>
            </p>
        </div>
    {{/each }}
</script>

<script type="text/x-handlebars-template" id="canvas-view-template">
    {{!-- attributes: tabindex, title, class, accesskey, dir, draggable, hidden, etc... --}}
    <canvas id="canvas" width="480" height="320">
      Your browser does not support HTML5 Canvas.
    </canvas>
</script>

<script src="<?php echo CONFIG_BASEURL; ?>/js/vendor/requirejs-master/require.js" data-main="<?php echo CONFIG_BASEURL; ?>/js/config"></script>
</body>
</html>
