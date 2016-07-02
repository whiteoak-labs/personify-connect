Ext.define('Personify.view.IndexBar', {
    override: 'Ext.dataview.IndexBar',

    initialize: function() {
        this.callParent();

        this.innerElement.on({
            //touchstart: this.onDragStart,
            touchend: this.onDragEnd,
            //dragstart: this.onDragStart,
            dragend: this.onDragEnd,
            //drag: this.onDrag,
            scope: this
        });
    }
});
