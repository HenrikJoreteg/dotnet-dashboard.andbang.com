/*
Shipped Tasks

The collection that contains our shipped task objects
*/
var Backbone = require('backbone'),
    _ = require('underscore'),
    Task = require('models/task');


module.exports = Backbone.Collection.extend({
    model: Task,
    initialize: function () {
        // whenever this collection is reset we want to calculate
        // and store how many items we've shipped.
        this.on('reset', this.calculateShippedThisWeek, this);
    },
    // We're overriding backbone's default fetch function with one
    // that requests all the team's shipped tasks from the API via
    // andbang.js
    fetch: function () {
        var self = this;
        app.api.getTeamShippedTasks(app.team.id, function (err, tasks) {
            _.each((tasks || []).reverse(), function (task) {
                // We do a bit of date math here, because we want to consider
                // 4am to be the turning point of what is considered to be the
                // samde day or not.
                var now = Date.create(),
                    shippedDate = Date.create(Number(task.shippedAt)),
                    startOfToday = (now.getHours() < 4) ? Date.create('4am yesterday') : Date.create('4am today'),
                    endOfToday = startOfToday.clone().addHours(24);

                // here we check to see if this is still "today", which we consider to
                // be 4:00am for the sake of what we actually consider to be part of
                // the same workday.
                if (shippedDate.isBetween(startOfToday, endOfToday)) {
                    self.add(task);   
                }
            });
        });
    }
});
