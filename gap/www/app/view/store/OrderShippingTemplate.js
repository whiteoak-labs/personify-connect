Ext.define('Personify.view.store.OrderShippingTemplate', {
    extend: 'Ext.Container',

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                layout: 'hbox',
                cls: 'order-template-title',
                items:[
                    {
                        html: 'Name:',
                        width: 70
                    },
                    {
                        html: '{productName}',
                        flex: 1
                    }
                ]
            },
            {
                layout: 'hbox',
                cls: 'order-template-price',
                items:[
                    {
                        html: 'Price:',
                        width: 70
                    },
                    {
                        html: '<div style="width:{[Personify.utils.ItemUtil.getWidthOrderPrice(values.baseAmount, values.totalShipping, values.totalDiscounts, values.totalAmount, values.totalTax, 9)]}px">{[Personify.utils.ItemUtil.formatOrderComfirmAmount(values.currencySymbol, values.baseAmount)]}</div>',
                        width: '{[Personify.utils.ItemUtil.getWidthOrderPrice(values.baseAmount, values.totalShipping, values.totalDiscounts, values.totalAmount, 7)]}'
                    }
                ]
            },
            {
                layout: 'hbox',
                cls: 'order-template-shipping',
                items:[
                    {
                        html: 'Shipping:',
                        width: 70
                    },
                    {
                        html: '<div style="width:{[Personify.utils.ItemUtil.getWidthOrderPrice(values.baseAmount, values.totalShipping, values.totalDiscounts, values.totalAmount, values.totalTax, 9)]}px">{[Personify.utils.ItemUtil.formatOrderComfirmAmount(values.currencySymbol, values.totalShipping)]}</div>'
                    }
                ]
            },
            {
                layout: 'hbox',
                cls: 'order-template-discount',
                items:[
                    {
                        html: 'Discount:',
                        width: 70
                    },
                    {
                        html: '<div style="width:{[Personify.utils.ItemUtil.getWidthOrderPrice(values.baseAmount, values.totalShipping, values.totalDiscounts, values.totalAmount, values.totalTax, 9)]}px">{[Personify.utils.ItemUtil.formatOrderComfirmAmount(values.currencySymbol, values.totalDiscounts)]}</div>'
                    }
                ]
            },
            {
                layout: 'hbox',
                cls: 'order-template-discount',
                items:[
                    {
                        html: 'Tax:',
                        width: 70
                    },
                    {
                        html: '<div style="width:{[Personify.utils.ItemUtil.getWidthOrderPrice(values.baseAmount, values.totalShipping, values.totalDiscounts, values.totalAmount, values.totalTax, 9)]}px">{[Personify.utils.ItemUtil.formatOrderComfirmAmount(values.currencySymbol, values.totalTax)]}</div>'
                    }
                ]
            },
            {
                layout: 'hbox',
                cls: 'order-template-total',
                items:[
                    {
                        html: 'Total:',
                        width: 70
                    },
                    {
                        html: '<div style="width:{[Personify.utils.ItemUtil.getWidthOrderPrice(values.baseAmount, values.totalShipping, values.totalDiscounts, values.totalAmount, values.totalTax, 9)]}px">{[Personify.utils.ItemUtil.formatOrderComfirmAmount(values.currencySymbol, values.totalAmount)]}</div>'
                    }
                ]
            }
        ]
    }
});