﻿define(['plugins/router', 'knockout', 'data', 'logger'],
    function (router, ko, data, logger) {
        var exersize = ko.observable();
        var exersizes = ko.observableArray();
        var list_students = ko.observableArray();

        var login = {
            exersize: exersize,
            exersizes: exersizes,
            activate: activate,
            openexersize: openexersize,
            router: router,
            newex: newex,
            assignex: assignex,
            editex: editex,
            backtolist: backtolist,
            studentExercises: ko.computed(function () {
                if (exersize()) {
                    
                    data.getuserexersizes(exersize().Id()).then(function (data) {
                        list_students(data.results);
                    });

                    return list_students;
                }
            })
        };

        return login;

        //#region Internal Methods
        function activate(id) {
            //var questionid = parseInt(id)
            //if (questionid > 0)
            if (!exersize()) {
                data.getallexersizes().then(function (data) {
                    exersizes(data.results);
                });
            }

            $("#goback").css({ display: "block" });

            logger.log('exersizes activated');
        }

        function openexersize(selected) {
            exersize(selected);
        }

        function backtolist() {
            exersize(undefined);
        }

        function newex() {
            router.navigate('/#uploadEx/-1');
        }

        function assignex() {
            if (exersize()) {
                var eid = exersize().Id();
                router.navigate('/#exersizeassign/' + eid);
            }
            else
                router.navigate('/#exersizeassign/-1');
        }

        function editex() {
            router.navigate('/#uploadEx/' + exersize().Id());
        }
        //#endregion
    });