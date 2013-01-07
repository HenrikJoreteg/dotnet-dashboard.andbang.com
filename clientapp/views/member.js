/*
Member View

Responsible for rendering the member 'cards' for each
team member.

*/
var BaseView = require('views/base'),
    _ = require('underscore'),
    templates = require('templates');


module.exports = BaseView.extend({
    // This bindings section handles binding the
    // content of the '.activeTask' node to whatever
    // the value is of 'activeTaskTitle'
    contentBindings: {
        activeTaskTitle: '.activeTask'
    },
    // Class bindings toggle a class. So, here we're
    // saying that the presence attribute should always
    // maintain a corresponding class that matches its
    // value on the dom element that matches the selector.
    // In this case, the selector is: '' so it'll just
    // maintain that class on "this.el"
    classBindings: {
        presence: ''
    },
    render: function () {
        // Here we replace the default 'el'.
        this.setElement(templates.member({member: this.model}));
        // This is what makes the declaritive bindings above
        // actually work. We're just calling a method on the
        // base view that set up the various handlers necessary
        // to maintain the bindings while this view is still
        // in existence.
        this.handleBindings();
        this.model.on('remove', this.destroy, this);
        this.model.on('change:order', this.handleChangeOrder, this);
        this.model.on('change:activeTask', this.handleActiveTaskChange, this);
        this.model.on('change:shippedCount', this.handleShippedCountChange, this);
        $(window).on('resize', _.bind(this.handleChangeOrder, this));

        // call them all once
        this.handleChangeOrder();
        this.handleActiveTaskChange();
        this.handleShippedCountChange();

        return this;
    },
    handleChangeOrder: function () {
        var order = this.model.get('order'),
            windowWidth = window.innerWidth,
            minimumWidth = 290,
            numberOfColumns = Math.floor((windowWidth - minimumWidth) / minimumWidth),
            columnWidth = (windowWidth / (numberOfColumns + 1)) - 10,
            row = Math.floor(order / numberOfColumns),
            column = order % numberOfColumns,
            rowHeight = 150;
        
        this.$el.css({
            top: (row * rowHeight) + 'px',
            left: (column * columnWidth) + 'px',
            width: (columnWidth - 10) + 'px'
        });

        $('.shippedContainer').css('width', columnWidth + 'px');
    },
    handleActiveTaskChange: function () {
        this.$el[this.model.get('activeTask') ? 'addClass' : 'removeClass']('active');
    },
    handleShippedCountChange: function () {
        var i = this.model.get('shippedCount'),
            container = this.$('.shippedCount');
        
        container.empty();
        while (i--) {
            container.append(templates.rocket());
        }
    },
    destroy: function () {
        this.model.off();
        this.remove();
    }
});