﻿define(['plugins/router', 'knockout', 'data','logger'],
    function (router, ko, data, logger) {
        var question = ko.observable();
        var questions = ko.observableArray();
        var login = {
            question: question,
            questions:questions,
            activate: activate,
            openanswer: openanswer,
            router: router,
            backtolist: backtolist,
            searchAnswers:searchAnswers
        };

        return login;

        //#region Internal Methods
        function activate(id) {
            //var questionid = parseInt(id)
            //if (questionid > 0)
            data.getquestions().then(function (data) {
                questions(data.results);
            });
            logger.log('question activated');
        }

        function openanswer(selected) {
            question(selected);
        }

        function backtolist() {
            question(undefined);
        }

        function searchAnswers (q) {
            data.searchQuestion(q).then (function (data) {
                answers(data.results);
            })
        }

        function askQuestion(clazz, question, okFunc, errFunc) {
            setTimeout(okFunc, 3000);
        };
        //#endregion
    });