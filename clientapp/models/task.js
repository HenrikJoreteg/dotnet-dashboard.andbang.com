/*
Task model holds all data related to a single shipped task.
*/
var Backbone = require('backbone');


module.exports = Backbone.Model.extend({
    // We want to be able to retrieve the member object representing
    // the person who finished this task. So we define it as an method
    // on the task model for convenience.
    member: function () {
        return app.team.members.get(this.get('shippedBy') || this.get('assignee'));
    },
    // Convenience method for retrieving a nicely foratted version of the shipped date
    shippedAt: function () {
        return Date.create(parseInt(this.get('shippedAt'), 10)).format('{h}:{ss} {tt}');
    }
});
