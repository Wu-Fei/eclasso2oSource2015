﻿define(['plugins/router', 'knockout', 'data', 'logger'],
    function (router, ko, data, logger) {
        var announcement = ko.observable();
        var announcements = ko.observableArray();
        var myannouncements = ko.observableArray();
        //var usermsg = ko.observableArray();

        var login = {
            announcement: announcement,
            announcements: announcements,
            activate: activate,
            openmsg: openmsg,
            router: router,
            backtolist: backtolist,
            newmsg: newmsg,
           // usermsg:usermsg
        };
        shouter.subscribe(function (newValue) {
            activate();
            logger.log('reload announcement');
        }, this, "refresh_viewmodels/announcement");

        b_shouter.subscribe(function (newValue) {
            backtolist();
        }, this, "back_viewmodels/announcement");

        return login;

        //#region Internal Methods
        function activate() {
            //var questionid = parseInt(id)
            //if (questionid > 0)

            /*
            var uid = data.user().Id(); // get current user id
            var usermsg = ko.observableArray();

            data.getuserannouncements(uid).then(function (data) {
                usermsg(data.results);
            });
            */

            data.getsentannouncements().then(function (data) {
                announcements(data.results);
            });

            $("#goback").css({ display: "none" });
            $("#refresh").css({ display: "inline" });
            logger.log('announcements activated');
        }

        function detached() {
            backtolist();
        }

        function openmsg(selected) {
            announcement(selected);
            $("#goback").css({ display: "block" });
            $("#refresh").css({ display: "none" });
        }

        function backtolist() {
            announcement(undefined);
            $("#goback").css({ display: "none" });
            $("#refresh").css({ display: "inline" });
        }

        function newmsg() {
            router.navigate('/#newmsg');
        }
        //#endregion
    });