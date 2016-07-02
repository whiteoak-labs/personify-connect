Ext.define('Personify.view.List', {
    override: 'Ext.dataview.List',

    isEmptyTextShown: false,

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

