Backbone jQMobile ParticleSys
=============================

Path "/backbone-jqmobile-particlesys" must be set in .htaccess, index.php, js/app/app.js for backbone push state.

Database settings need to be set in the ajax/conf.php file.

**MySQL Schema:**

    CREATE DATABASE bbjqmcanvasdb

    CREATE TABLE `particle` (
      `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
      `name` varchar(255) NOT NULL DEFAULT '',
      `field` blob NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
