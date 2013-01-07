/*
The Team Model manages all the data related to the team.

It also serves as a container for it's child collections:
 - Members
 - Shipped Tasks
*/
var Backbone = require('backbone'),
    _ = require('underscore'),
    Members = require('models/members'),
    ShippedTasks = require('models/shippedTasks');


module.exports = Backbone.Model.extend({
    initialize: function () {
        // init our members collection and attach it to the
        // team object. This doesn't really matter in the case
        // of a single team. We could just attached the collection
        // to the "app" object, but this is a bit more semantic
        this.members = new Members();
        
        // If we reset the collection, or if presence of activeTaskTitle changes
        // we want to update our order property.
        this.members.on('change:presence change:activeTaskTitle reset add remove', this.updateOrder, this);
        
        // create and store a collection of Shipped Tasks
        this.shippedTasks = new ShippedTasks();
        this.shippedTasks.on('add reset', this.updateShippedTotals, this);

        // set the current weekday as an attribute of the team
        // just for convenience
        this.updateDay();

        // Every minute, check to see if it's a new day
        setInterval(_.bind(this.updateDay, this), 60000);

        // handle the case when the day is different
        this.on('change:day', this.handleChangedDay, this);
    },
    // Here we create a scoring mechanism for which member shows up
    // at the top of the list.
    updateOrder: function () {
        var sorted = this.members.sortBy(function (member) {
                var online = member.get('presence') === 'online' ? 2 : 0,
                    working = !!member.get('activeTask') ? 1 : 0;
                return -(online + working);
            });

        sorted.forEach(function (member, index) {
            member.set('order', index);
        });
    },
    // Here we update the count of shipped tasks for each user
    updateShippedTotals: function () {
        // countBy() is a handy underscore method for counting
        // how many of each item is in a givven group.
        // The following code will return an object that looks 
        // something like this:
        // {
        //    '1': 4,
        //    '4': 3
        // }
        // Where the "key" is the string id of the member who
        // shipped the task, and the total is how many occurences.
        var totals = _.countBy(this.shippedTasks.models, function (task) {
                return task.get('shippedBy');
            });

        // We then loop through every member and update the shipCount
        // if we don't have a count we set it to zero.
        app.team.members.each(function (member) {
            member.set('shippedCount', totals[member.id] || 0);
        });
    },
    // This is just one possible way to determine whether or not
    // it's the same day or not. But, by just setting the string 
    // representation of the weekday (i.e. 'wednesday') as a property
    // of the model we can then listen to "change:day" events and
    // know that we need to reset all of our counts, etc.
    // In this particular case we're making use of sugar.js's Date
    // modules. It can be downloaded seperate from the other stuff
    // and makes working with dates a million times easier.
    // http://sugarjs.com/dates
    updateDay: function () {
        // To more closely match what we consider to be part of the same
        // workday, we'll count 4am as the change over period.
        this.set('day', Date.create().addHours(-4).format('{weekday}'));
    },
    // If it's the next workday and we've left our dashboard open
    // we want to clear it out. So we reset the shipped collection.
    handleChangedDay: function () {
        this.shippedTasks.reset();
    }
});