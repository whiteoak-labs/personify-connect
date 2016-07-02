Ext.define('Personify.view.NavigationView', {
    override: 'Ext.navigation.View',

    config: {
        listeners: {
            pop: function(view) {
                Ext.defer(function() {
                    var activeItem = view.getActiveItem();

                    if (activeItem.element) {
                        activeItem.element.dom.removeAttribute("style");
                    }
                }, 200);
            },
            scope: this
        }
    },

    /**
     * Pop all the root view
     */
    popToRoot: function() {
        var me = this;
        var innerItems = this.getInnerItems();
        var buttonStack = me.getNavigationBar().backButtonStack;

        if (innerItems.length < 1) {
            return;
        }

        for (var i = innerItems.length - 1; i > 0; i--) {
            me.remove(innerItems[i], true);
            buttonStack.pop();
        }
    },

    /**
     * Pop all items from the view
     */
    popAll: function() {
        var me = this,
            innerItems = this.getInnerItems();

        me.removeAll(innerItems);
        var buttonStack = me.getNavigationBar().backButtonStack;
        var btLength = buttonStack.length;

        for (var i = 0; i < btLength; i++) {
            buttonStack.pop();
        }
    }
});
