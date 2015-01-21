﻿define(['knockout','data'], function (ko,data) {
    function routes() {
        var routes = [
                    { route: '', moduleId: 'home', title: 'Class List', nav: 1 },
                    { route: 'signin', moduleId: 'signin', title: 'Sign In', nav: 2 },
                    { route: 'signup', moduleId: 'signup', title: 'Register', nav: 3 },
                    { route: 'term', moduleId: 'term', title: 'Legal Term', nav: 4 },
                    { route: 'questions', moduleId: 'question', title: 'Q&A', nav: 5 },
                    { route: 'announcements', moduleId: 'announcement', title: 'Announcements', nav: 6 },
                    { route: 'exersizes', moduleId: 'exersize', title:'Exersizes', nav:7}
                    ];
        return routes
    }
    return {
        data:data,
        routes: new routes()
    }
});