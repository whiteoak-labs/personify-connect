Ext.define('Personify.view.store.ImageList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'imagelist',

    config: {
        itemTpl: [
              '<img src="{imageURL}" class="item-image-list-moredetail-page" />'
        ].join('')
    }
});
