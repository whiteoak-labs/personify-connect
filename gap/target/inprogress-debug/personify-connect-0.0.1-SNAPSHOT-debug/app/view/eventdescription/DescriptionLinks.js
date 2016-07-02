Ext.define('Personify.view.eventdescription.DescriptionLinks', {
    extend: 'Ext.dataview.DataView',
    xtype: 'descriptionlinks',
    config:{
        cls: 'p-panel-same-component-top-descriptionLinks',
        deferEmptyText: false,
        scrollable: {
            direction: 'horizontal',
            directionLock: true
        },
        itemCls: 'myList',
        emptyText: '<div class="x-list-emptytext">No Link</div>',
        itemTpl: '<ul><li>{name}</li></ul>'
    }
});