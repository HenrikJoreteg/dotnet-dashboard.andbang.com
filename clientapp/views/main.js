/*
This main view view is responsible for rendering all content that goes into the
<body>. It's initted right away and renders iteslf on DOM ready.
*/

/*global nm*/
var BaseView = require('views/base'),
    _ = require('underscore'),
    templates = require('templates'),
    MemberView = require('views/member');
    
    
module.exports = BaseView.extend({
    initialize: function () {    
        // register some handlers on the "shippedTasks" collections
        this.model.shippedTasks.on('add', this.handleNewTask, this);
        this.model.shippedTasks.on('reset', this.handleTasksReset, this);
        
        // when members are reset we want to redraw them all
        this.model.members.on('add', this.handleNewMember, this);
        this.model.members.on('reset', this.handleMembersReset, this);
        
        // because the data is handled seperately we can just tell this main 
        // app view to render itself when the DOM is ready.
        // This is just a shortcut for doing $(document).ready();
        $(_.bind(this.render, this));
    },
    render: function () {
        // we set the body element as the root element in this view.
        this.setElement($('body')[0]);
        // render our app template into the body
        this.$el.html(templates.app());
    },
    // shipped tasks just get rendered and prepended to the shipped list
    // as they are added.
    handleNewTask: function (model) {
        this.$('.shippedContainer').prepend(templates.shipped({task: model}));
    },
    // If we reset the task list (when it's a new day) we just want to 
    // clear that html from the DOM.
    handleTasksReset: function () {
        this.$('.shippedContainer').empty();
    },
    handleMembersReset: function () {
        // create and append a view for each member
        this.model.members.each(this.handleNewMember, this);
    },
    handleNewMember: function (member) {
        var peopleContainer = this.$('.people'),
            view = new MemberView({model: member});
        
        peopleContainer.append(view.render().el);
    }
});