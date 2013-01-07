/*global window app */
var MainView = require('views/main'),
    TeamModel = require('models/team'),
    logger = require('andlog'),
    Backbone = require('backbone'),
    cookies = require('cookieReader'),
    _ = require('underscore'),
    API = require('andbang');


module.exports = {
    // this is the the whole app initter
    blastoff: function (spec) {
        var self = this;
        
        // our API connection
        this.api = new API();
        this.team = new TeamModel();

        // init our main application view, it draws itself
        // when the DOM is ready
        this.view = new MainView({model: this.team});
        
        // set up all our api event handlers
        this.api.on('*', _.bind(this.handleApiEvent, this));

        // Read in the api token from the cookie we
        // just set on the server side and use it to 
        // log into our socket.io connection that connects
        // directly to the andbang API.
        this.token = cookies('apiToken');
        this.api.validateToken(self.token);

        // if the token is valid, the api object will emit a 'ready' event
        // then we can grab our team data and draw the main view
        this.api.once('ready', function (user) {
            self.team.set('id', user.teams[0]);
            self.team.members.fetch();
            self.team.shippedTasks.fetch();
        });

        return this;
    },
    // lookup for collections by "type"
    findCollection: function (type) {
        var objectMap = {
            member: app.team.members,
            task: app.team.shippedTasks
        };
        return objectMap[type];
    },
    // lookup for models by type and ID.
    findModel: function (type, id) {
        var coll = this.findCollection(type);

        // will return 'undefined' if either the collection or 
        // model is not found.
        return coll && coll.get(id);
    },
    // The trick with handling these incoming events is we have to know what we're looking for
    // and how that event data is structured.
    handleApiEvent: function (eventtype, payload) {
        // For our purposes we only care about events from a single team. And we only care about events
        // that update data. Meaning they have a "crud" attribute.
        if (payload && payload.crud && payload.category === 'team' && payload.instance === app.team.id) {

            // at this point we know we've got an event that matches and
            // our predicable pattern of CRUD operations means we can treat
            // them all very generically:
            payload.crud.forEach(function (item) {
                var type = item.type,
                    model,
                    collection;
            
                // if it's an update, we try to locate the model and then
                // set the new properties on it.
                if (type === 'update') {
                    logger.log('got an update', item);
                    model = app.findModel(item.object, item.id);
                    if (model) {
                        model.set(item.data);
                    }

                    if (eventtype === 'shipTask' && item.object === 'task') {
                        app.team.shippedTasks.add(item.data);
                    }
                
                // if it's a "create" we'll get an object type we can use that
                // to figure out which collection we need to add it to.
                // Since we're ignoring all but the shipped tasks, in this case 
                // the only "create" operations we care about are new members who
                // get added to the team while the app is open.
                } else if (type === 'create' && item.object === 'member') {
                    logger.log('got a create');
                    collection = app.findCollection(item.object);
                    if (collection) {
                        collection.add(item.data);
                    }

                // if it's a "delete" we need to find it and remove it.
                } else if (type === 'delete') {
                    logger.log('got a delete');
                    model = app.findModel(item.object, item.id);
                    if (model) {
                        // because backbone models are given a "collection" attribute
                        // to reference the collection they're in, we can just
                        // use the model we found and say remove yourself from
                        // your collection:
                        model.collection.remove(model);
                    }
                }
            });
        }
    }
};
