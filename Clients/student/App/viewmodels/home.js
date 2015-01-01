﻿define(['durandal/system', 'plugins/router', 'logger', 'knockout', 'global'],
    function (system, router, logger, ko, global) {
        var server = global.data;
        var home = {
            activate: activate,
            router: router,
            canActivate: canActivate,
        };

        return home;

        //#region Internal Methods
        function canActivate() {
            if (!server.getAccessToken()) {
                router.navigate('/#signin');
                return false;
            }
            else {
                server.configureBreeze();
                return server.getUser().then(function () { return true; });
            }
        }

        function activate() {
            logger.log('Home View Activated', null, 'Home', false);
        }
        //#endregion
    });