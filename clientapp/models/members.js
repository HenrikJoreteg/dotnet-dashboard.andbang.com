var Backbone = require('backbone'),
    Member = require('models/member');


module.exports = Backbone.Collection.extend({
    type: 'members',
    model: Member,
    fetch: function () {
        var self = this;
        //we just grab the first team for demo purposes
        app.api.getMembers(app.team.id, function (err, members) {
            // Inflate our backbone models and collections
            self.reset(members);
        });
    }
});