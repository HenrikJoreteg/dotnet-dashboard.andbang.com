var Backbone = require('backbone'),
    _ = require('underscore');


module.exports = Backbone.View.extend({
    bindomatic: function (model, ev, handler, options) {
        var boundHandler = _(handler).bind(this),
        evs = (ev instanceof Array) ? ev : [ev];
        _(evs).each(function (ev) {
            model.on(ev, boundHandler);
        });
        if (options && options.trigger) boundHandler();
        (this.unbindomatic_list = this.unbindomatic_list || []).push(function () {
            _(evs).each(function (ev) {
                model.off(ev, boundHandler);
            });
        });
    },
    unbindomatic: function () {
        _(this.unbindomatic_list || []).each(function (unbind) {
            unbind();
        });
    },
    // ###handleBindings
    // This makes it simple to bind model attributes to the view.
    // To use it, add a `classBindings` and/or a `contentBindings` attribute
    // to your view and call `this.handleBindings()` at the end of your view's 
    // `render` function. It's also used by `basicRender` which lets you do 
    // a complete attribute-bound views with just this:
    //
    //         var ProfileView = Capsule.View.extend({
    //             template: 'profile',
    //             contentBindings: {
    //                 'name': '.name'
    //             },
    //             classBindings: {
    //                 'active': '' 
    //             },
    //             render: function () {
    //                 this.basicRender();
    //                 return this;
    //             }
    //         });
    handleBindings: function () {
        var self = this;
        if (this.contentBindings) {
            _.each(this.contentBindings, function (selector, key) {
                self.bindomatic(self.model, 'change:' + key, function () {
                    var el = (selector.length > 0) ? self.$(selector) : $(self.el);
                    el.html(self.model.get(key));
                });
            });
        }
        if (this.inputBindings) {
            _.each(this.inputBindings, function (selector, key) {
                self.bindomatic(self.model, 'change:' + key, function () {
                    var el = (selector.length > 0) ? self.$(selector) : $(self.el);
                    el.val(self.model.get(key));
                });
            });
        }
        if (this.imageBindings) {
            _.each(this.imageBindings, function (selector, key) {
                self.bindomatic(self.model, 'change:' + key, function () {
                    var el = (selector.length > 0) ? self.$(selector) : $(self.el);
                    el.attr('src', self.model.get(key));
                });
            });
        }
        if (this.classBindings) {
            _.each(this.classBindings, function (selector, keyString) {
                var key = keyString.split(' ')[0],
                    className = keyString.split(' ')[1] || key;
                self.bindomatic(self.model, 'change:' + key, function () {
                    var newValue = self.model.get(key),
                        prev = self.model.previous(key),
                        el = (selector.length > 0) ? self.$(selector) : $(self.el);
                    if (_.isBoolean(newValue)) {
                        if (newValue) {
                            el.addClass(className);
                        } else {
                            el.removeClass(className);        
                        }
                    } else {
                        if (prev) el.removeClass(prev);
                        el.addClass(newValue);
                    }
                }, {trigger: true});
            });
        }
        return this;
    },

    // ###collectomatic
    // Shorthand for rendering collections and their invividual views.
    // Just pass it the collection, and the view to use for the items in the
    // collection. (anything in the `options` arg just gets passed through to
    // view. Again, props to @natevw for this.
    collectomatic: function (collection, ViewClass, options, desistOptions) {
        var views = {}, 
            self = this;
        function addView(model) {
            var matches = self.matchesFilters ? self.matchesFilters(model) : true;
            if (matches) {
                views[model.cid] = new ViewClass(_({model: model}).extend(options));
                views[model.cid].parent = self;
            } 
        }
        this.bindomatic(collection, 'add', addView);
        this.bindomatic(collection, 'remove', function (model) {
            if (views[model.cid]) {
                views[model.cid].desist(desistOptions);
                delete views[model.cid];
            }
        });
        this.bindomatic(collection, 'refresh', function (opts) {
            _(views).each(function (view) {
                view.desist(opts);
            });
            views = {};
            collection.each(addView);
        }, {trigger: true});
        this.bindomatic(collection, 'move', function () {
            _(views).each(function (view) {
                view.desist({quick: true});
            });
            views = {};
            collection.each(addView);
        });
    },

    // ###desist
    // This is method we used to remove/unbind/destroy the view.
    // By default we fade it out this seemed like a reasonable default for realtime apps. 
    // So things to just magically disappear and to give some visual indication that
    // it's going away. You can also pass an options hash `{quick: true}` to remove immediately.
    desist: function (opts) {
        opts || (opts = {});
        _.defaults(opts, {
            quick: false,
            animate: true,
            speed: 300,
            animationProps: {
                height: 0,
                opacity: 0
            }
        });
        var el = $(this.el);
        function kill() {
            el.unbind().remove();
        }
        if (this.interval) {
            clearInterval(this.interval);
            delete this.interval;
        }
        if (opts.quick) {
            kill();
        } else if (opts.animate) {
            el.animate(opts.animationProps, {
                speed: opts.speed,
                complete: kill
            });
        } else {
            setTimeout(kill, opts.speed);
        }
        this.unbindomatic();
    }
});