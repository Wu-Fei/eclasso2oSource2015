﻿require.config({
    paths: {
        'text': '../scripts/text',
        'durandal': '../scripts/durandal',
        'plugins': '../scripts/durandal/plugins',
        'transitions': '../scripts/durandal/transitions',
        'moment': '../scripts/moment',
        'jqueryUI': '../scripts/jquery-ui.min-1.11.1',
        'tinymce':'../scripts/tinymce',
        'logger':'./logger'
    }
});

define('jquery', function () { return jQuery; });
define('knockout', function () { return ko; });
define('q', function () { return Q; });
define('breeze', function () { return breeze; });
define('tinymce', function () { return tinymce; });


define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'plugins/router'], boot);

function boot(app, viewLocator, system, router) {

    // Enable debug message to show in the console 
    system.debug(true);

    app.title = 'eClassO2O Student';

    app.configurePlugins({
        router: true,
        widget: true
    });

    app.start().then(function () {
        viewLocator.useConvention();
        app.setRoot('viewmodels/shell', 'entrance');
    });
};