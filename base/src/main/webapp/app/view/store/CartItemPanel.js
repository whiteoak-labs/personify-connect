Ext.define('Personify.view.store.CartItemPanel', {
    extend: 'Ext.dataview.DataView',
    xtype: 'cartitempanel',
    
    config: {
        baseCls: 'cartitempanel',
        scrollable: false,
        
        itemTpl: [
            '<div class="cartitemimage"></div>',
            '<div class="cartitemcontent">',
                '<div class="cartitemcontenttitle"></div>',
                '<div class="cartitemcontentdescription"></div>',
            '</div>',
            '<div class="cartitemvalue">',
                '<div class="caritemvalueprice"></div>',
                '<div class="cartitemvaluetextbox"></div>',
                '<div class="cartitemvaluebutton"></div>',
            '</div>'
        ].join('')
    }
});
