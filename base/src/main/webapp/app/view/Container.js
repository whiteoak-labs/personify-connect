Ext.define('Personify.view.Container', {
    override: 'Ext.Container',

    destroy: function() {
        var scrollable = this.getScrollable();

        if (scrollable) {
            var scroller = scrollable.getScroller();

            if (scroller) {
                scroller.stopAnimation();
            }
        }
        this.callParent(arguments);
    }
});
