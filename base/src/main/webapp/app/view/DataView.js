Ext.define('Personify.view.DataView', {
    override: 'Ext.dataview.DataView',

    initialize: function() {
        this.callParent(arguments);
        this.on({
            painted: this.onPaintedDataView,
            scope: this
        });
    },

    onPaintedDataView: function() {
        var scrollable = this.getScrollable();

        if (scrollable) {
            var scroller = scrollable.getScroller();
            scroller.on({
                scrollend: this.onScrollEnd,
                scope: this
            });
        }
    },

    onScrollEnd: function(scroller, x, y) {
        if (y >= scroller.maxPosition.y) {
            this.fireEvent('scrollend');
        }
    }
});
