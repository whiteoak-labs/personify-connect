Ext.define('Personify.view.List', {
    override: 'Ext.dataview.List',

    isEmptyTextShown: false,
           
           
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
           },

    updateHeaderMap: function() {
        var me = this,
            headerMap = me.headerMap,
            headerIndices = me.headerIndices,
            header, i;

        headerMap.length = 0;
        for (i in headerIndices) {
            if (headerIndices.hasOwnProperty(i)) {
                var itemHeader = me.getItemAt(i);
                if (itemHeader) {
                    header = itemHeader.getHeader();
                    headerMap.push(header.renderElement.dom.offsetTop);
                }
            }
        }
    },

    showEmptyText: function() {
        this.callParent(arguments);

        if (Ext.os.is.Android) {
            var me = this;
            if (!this.isEmptyTextShown) {
                this.hide();
                Ext.defer(function() {
                    me.isEmptyTextShown = true;
                    me.show();
                }, 1, this);
            } else {
                this.isEmptyTextShown = false;
            }
        }
    }
});

