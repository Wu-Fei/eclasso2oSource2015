﻿define(['plugins/router', 'knockout', 'data', 'logger'],
    function (router, ko, data, logger) {
        var userclazzes = ko.observableArray();
        var clazzes = ko.observableArray();
        var classes_list = ko.observableArray();
        var clazzes_ids = [];

        var vm = {
            clazzes: clazzes,
            userclazzes: userclazzes,
            classes_list: classes_list,
            activate: activate,
            quitclazz: quitclazz,
            router: router,
            clazzes_ids: clazzes_ids,
        };

        b_shouter.subscribe(function (newValue) {
            back();
        }, this, "back_viewmodels/myclazz");

        return vm;

        //#region Internal Methods
        function makeCallBack(index){
            return function (teacher) {
                if (teacher.results.length > 0) {
                    clazzes()[index].teacher(teacher.results[0].Name());
                }
            };
        }

        function activate() {
            var uid = data.user().Id();
            clazzes.removeAll();
            /*
            var now = new Date();
            data.getClasses().then(function (clazz_result) {
                clazzes.removeAll();
                clazzes_ids = [];

                clazz_result.results.forEach(function (cur_clazz) {
                    var dif = (now.getTime() - cur_clazz.End()) / 1000 / 60 / 60 / 24;
                    if (dif < 1) {
                        cur_clazz.teacher = ko.observable();
                        cur_clazz.state = ko.observable("未加入");
                        var cur_index = clazzes().length;
                        clazzes_ids.push(cur_clazz.Id());
                        clazzes.push(cur_clazz);
                        if (typeof cur_clazz.TeacherId != "undefined")
                        {
                            var callback_fun = makeCallBack(cur_index);
                            var tid = cur_clazz.TeacherId();
                            data.getuser(tid).then(callback_fun);
                        }
                    }
                });
                });
                */

                data.getUserClasses(uid).then(function (result) {
                    userclazzes(result.results);

                    for (i = 0; i < userclazzes().length; i++) {
                        var cid = userclazzes()[i].ClassId();
                        data.getClass(cid).then(function (result) {
                            var c = result.results[0];
                            var tid = c.TeacherId();
                            data.getuser(tid).then(function (data) {
                                var s = data.results[0].Name();
                                c.teacher = s;

                                clazzes.push(c);
                            });

                        });
                    }
                    /*
                    result.results.forEach(function (my_clazz) {
                        var index = clazzes_ids.indexOf(my_clazz.ClassId());
                        if(index >= 0)
                            clazzes()[index].state("已加入");
                    });
                    */
                });
            
            
            $("#goback").css({ display: "block" });
            $("#refresh").css({ display: "none" });

            logger.log('my clazzes activated');
        }

        // will we allow students to quit a clazz so he will not see exercises any more? TBD
        function quitclazz(selected) {
            var uid = data.user().Id();
            var cid = selected().Id();

            // TODO: delete this record from UserClasses table
        }

        function join() {
            router.navigate('/#joinclazz');
        }

        function back() {
            router.navigateBack();
        }
        //#endregion
    });