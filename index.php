<?php
define('CONFIG_BASEURL', 'http://'.$_SERVER['HTTP_HOST'].'/backbone-jqmobile-particlesys');
// $db = new \PDO('mysql:host=127.0.0.1;dbname=test','','');
// $sql = 'SELECT * FROM test';
// $s = $db->prepare($sql);
// $s->execute();
// $objs = $s->fetchAll(\PDO::FETCH_OBJ);
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

<div data-role="page">
    <div data-role="header">
        <h1>Particle System</h1>
    </div>
    <div data-role="content">
        <div class="ui-grid-a ui-content ui-responsive">
            <div class="ui-block-a">
                <div id="canvas-listview" data-role="collapsible-set" data-inset="true"></div>
            </div>
            <div class="ui-block-b">
                <div id="canvas-view" class="ui-btn ui-corner-all ui-not-btn"></div>
            </div>
        </div>
    </div>

    <div data-role="footer" data-position="fixed">
        <h4></h4>
    </div>
</div>

<!-- templates -->
<script type="text/x-handlebars-template" id="canvas-listview-template">
    {{#each collection}}
        <div data-role="collapsible" data-collapsed="true">
            <h1 id="hl-{{ type }}" data-canvastype="{{ type }}" class="ajax-hl">{{ type }}</h1>
            <div data-role="fieldcontain">
                <button id="btn-start-{{ type }}" class="ui-btn ui-corner-all ui-btn-inline ui-icon-carat-r ui-btn-icon-left ui-shadow-icon ui-btn-c ui-disabled">Start</button>
                <button id="btn-stop-{{ type }}" class="ui-btn ui-corner-all ui-btn-inline ui-icon-forbidden ui-btn-icon-left ui-shadow-icon ui-btn-c">Stop</button>
            </div>
            <div data-role="fieldcontain">
                <fieldset data-role="controlgroup" data-type="horizontal">
                    {{#each fields.controlgroup}}
                        <legend>Options:</legend>
                        <label for="inp-{{ name }}-{{ type }}">
                            <input type="checkbox" name="inp-{{ name }}-{{ type }}" id="inp-{{ name }}-{{ type }}" value="{{ value }}" {{ checked }}>
                                {{ label }}
                        </label>
                    {{/each}}
                </fieldset>
            </div>
            <div data-role="fieldcontain">
                {{#each fields.select}}
                    <label for="inp-{{ name }}-{{ type }}">{{ label }}:</label>
                    <select name="inp-{{ name }}-{{ type }}" id="inp-{{ name}}-{{ type }}">
                        {{#each options}}
                            <option value="{{ value }}" {{ selected }}>{{ label }}</option>
                        {{/each}}
                    </select>
                {{/each}}
            </div>
            <div data-role="fieldcontain">
                 {{#each fields.rangeslider}}
                    <div data-role="rangeslider">
                        <label for="inp-{{ name }}-{{ type }}">{{ label }}:</label>
                        <input type="range" name="inp-{{ inputmin.name }}-{{ type }}" id="inp-{{ inputmin.name }}-{{ type }}" min="{{ attr.min }}" max="{{ attr.max }}" value="{{ inputmin.value }}">
                        <input type="range" name="inp-{{ inputmax.name }}-{{ type }}" id="inp-{{ inputmax.name }}-{{ type }}" min="{{ attr.min }}" max="{{ attr.max }}" value="{{ inputmax.value }}">
                    </div>
                {{/each}}
            </div>
            <div data-role="fieldcontain">
                {{#each fields.range}}
                    <label for="inp-{{ name }}-{{ type }}">{{ label }}:</label>
                    <input type="range" name="inp-{{ name }}-{{ type }}" id="inp-{{ name }}-{{ type }}" min="{{ attr.min }}" max="{{ attr.max }}" value="{{ attr.value }}">
                {{/each}}
            </div>

        </div>
    {{/each }}
</script>

<script type="text/x-handlebars-template" id="canvas-view-template">
    {{!-- attributes: tabindex, title, class, accesskey, dir, draggable, hidden, etc... --}}
    {{!-- <canvas id="canvas" width="{{ item.width }}" height="{{ item.height }}"> --}}
    <canvas id="canvas">
      Your browser does not support HTML5 Canvas.
    </canvas>
</script>

<script src="<?php echo CONFIG_BASEURL; ?>/js/vendor/requirejs-master/require.js" data-main="<?php echo CONFIG_BASEURL; ?>/js/config"></script>
</body>
</html>
