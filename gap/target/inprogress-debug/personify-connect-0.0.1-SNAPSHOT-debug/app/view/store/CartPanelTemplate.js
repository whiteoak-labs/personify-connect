Ext.define('Personify.view.store.CartPanelTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'cartpaneltemplate',
    
    requires: [
        'Personify.utils.ItemUtil'
    ],
    
    config: {
        itemTpl: new Ext.XTemplate(
            '<table width="100%" class="tableCartItem">',
                '<tr>',
                    '<td width="65px" class="thumb-cart-item"><img src="img/store/image_cart.png"/></td>',
                    '<td colspan="2" class="cart-item-name">{shortName}</td>',
                '</tr>',
                '<tr>',
                	'<td>&nbsp;</td>',
                	'<td>Price:</td>',
                	'<td class="cart-item-price"> {[Personify.utils.ItemUtil.formatPurchaseAmount(values.price, 2)]}</td>',
                '</tr>',
                '<tr>',
                	'<td>&nbsp;</td>',
                	'<td>Qty:</td>',
                	'<td class="cart-item-qty"> {[this.checkProductType(values.productType, values.quantity)]}</td>',
                '</tr>',
                '<tr>',
                	'<td>&nbsp;</td>',                    
                    '<td colspan="2" class="cart-item-description">{longName}</td>',
                '</tr>',
                // '<tr>',
                    // '<td>&nbsp;</td>',
                    // '<td><div class="cart-item-remove-button"></div></td>',
                // '</tr>',

            '</table>',
            {
                checkProductType: function(productType, quantity) {
                    if (productType == "M") {
                        return '<input type="text" class="cart-item-qty-number" disabled="disabled" value="' + quantity + '"/>';
                    } else {
                        return '<input type="text" class="cart-item-qty-number" value="' + quantity + '"/>';
                    }
                }
            }
        )
    }
});
