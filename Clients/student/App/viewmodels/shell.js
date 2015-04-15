﻿define(['durandal/app', 'plugins/router', 'knockout', 'global', 'logger'],
    function (app, router, ko, global, logger) {
        var vm = {
            app:app,
            activate: activate,
            router: router,
            title: ko.computed(function () {
                if (router.activeInstruction()) {
                    return router.activeInstruction().config.title;
                }
            })
        };
        return vm;

        function activate() {
            return boot();
        }

        function boot() {
            logger.log('started', '','');
            router.on('router:route:not-found', function (fragment) {
                logger.logError('No Route Found', fragment, true);
            });

            var routes = global.routes;

            var result = router.makeRelative({ moduleId: 'viewmodels' }) // router will look here for viewmodels by convention
                .map(routes)            // Map the routes
                .buildNavigationModel(); // Finds all nav routes and readies them
            return result.activate(); // Activate the route
            
        }
        
    });