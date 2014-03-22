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
                <button id="btn-add-particle" data-type="add" class="ui-btn ui-corner-all ui-icon-star ui-btn-icon-left ui-shadow-icon ui-btn-c">New Particle</button>
                <div id="particle-listview" data-role="collapsible-set" data-inset="true"></div>
            </div>
            <div class="ui-block-b">
                <div id="particle-view" class="ui-btn ui-corner-all ui-not-btn"></div>
            </div>
        </div>
    </div>
    <div data-role="popup" id="popup-form-name" data-transition="flip" data-theme="a" data-overlay-theme="a" class="ui-content" data-dismissible="true">
        <span class="ui-bar ui-shadow ui-overlay-d ui-corner-all">
            <form>
                <input type="text" name="type" class="input-text" maxlength="255">
                <button>Go</button>
            </form>
        </span>
    </div>

    <div data-role="popup" id="popup-dialog-confirm" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:400px;">
        <div data-role="header" data-theme="a">
        <h1>Delete</h1>
        </div>
        <div role="main" class="ui-content">
            <h3 class="ui-title">Are you sure you want to delete?</h3>
            <p>This action cannot be undone.</p>
            <a href="#" class="btn-confirm-yes ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back" data-transition="flow">Delete</a>
            <a href="#" class="btn-confirm-no ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">Cancel</a>
        </div>
    </div>
</div>

<!-- templates -->
<script type="text/x-handlebars-template" id="particle-view-template">
    {{!-- attributes: tabindex, title, class, accesskey, dir, draggable, hidden, etc... --}}
    {{!-- <canvas id="canvas" width="{{ item.width }}" height="{{ item.height }}"> --}}
    <canvas id="canvas">
      Your browser does not support HTML5 Canvas.
    </canvas>
</script>

<script type="text/x-handlebars-template" id="particle-listview-template">
    {{#each collection}}
        <div data-role="collapsible" data-collapsed="true" id="particle-form-{{ id }}" data-id="{{ id }}">
            <h1>{{ name }}</h1>
            <div data-role="fieldcontain">
                <button class="btn-start ui-btn ui-corner-all ui-btn-inline ui-icon-carat-r ui-btn-icon-left ui-shadow-icon ui-btn-c ui-disabled">Start</button>
                <button class="btn-stop ui-btn ui-corner-all ui-btn-inline ui-icon-forbidden ui-btn-icon-left ui-shadow-icon ui-btn-c">Stop</button>
                <button class="btn-export ui-btn ui-corner-all ui-btn-inline ui-icon-action ui-btn-icon-left ui-shadow-icon ui-btn-c">Update</button>
                <button class="btn-delete ui-btn ui-corner-all ui-btn-inline ui-icon-forbidden ui-btn-icon-left ui-shadow-icon ui-btn-c">Delete</button>
            </div>
            <div data-role="fieldcontain">
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend>Options:</legend>
                    {{#each field.controlgroup}}
                        <label for="inp-{{ name }}">
                            <input type="checkbox" name="inp-{{ name }}" class="inp-{{ name }}" value="{{ value }}" {{ checked }}>
                                {{ label }}
                        </label>
                    {{/each}}
                </fieldset>
            </div>
            <div data-role="fieldcontain">
                {{#each field.select}}
                    <label for="inp-{{ name }}">{{ label }}:</label>
                    <select name="inp-{{ name }}" class="inp-{{ name }}">
                        {{#each options}}
                            <option value="{{ value }}" {{ selected }}>{{ label }}</option>
                        {{/each}}
                    </select>
                {{/each}}
            </div>
            <div data-role="fieldcontain">
                 {{#each field.rangeslider}}
                    <div data-role="rangeslider">
                        <label for="inp-{{ name }}">{{ label }}:</label>
                        <input type="range" name="inp-{{ inputmin.name }}" class="inp-{{ inputmin.name }}" min="{{ attr.min }}" max="{{ attr.max }}" value="{{ inputmin.value }}">
                        <input type="range" name="inp-{{ inputmax.name }}" class="inp-{{ inputmax.name }}" min="{{ attr.min }}" max="{{ attr.max }}" value="{{ inputmax.value }}">
                    </div>
                {{/each}}
            </div>
            <div data-role="fieldcontain">
                {{#each field.range}}
                    <label for="inp-{{ name }}">{{ label }}:</label>
                    <input type="range" name="inp-{{ name }}" class="inp-{{ name }}" min="{{ attr.min }}" max="{{ attr.max }}" value="{{ attr.value }}" data-highlight="{{ attr.data-highlight }}">
                {{/each}}
            </div>
        </div>
    {{/each }}
</script>

<script src="<?php echo CONFIG_BASEURL; ?>/js/vendor/requirejs-master/require.js" data-main="<?php echo CONFIG_BASEURL; ?>/js/config"></script>
</body>
</html>
