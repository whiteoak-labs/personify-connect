Ext.define('Personify.view.store.MoreDetailPage', {
    extend: 'Ext.Container',
    xtype: 'moredetailpage',
    controller: 'Personify.controller.store.MoreDetailPage',
    requires: [
        'Personify.controller.store.MoreDetailPage',
        'Personify.view.store.ImageList'
    ],
    
    config: {
        cls: 'p-panel-addOrFilterPanel panel-left',
        width: '50%',
        height: '90%',
        modal: true,
        hideOnMaskTap: true,
        right: 0,
        top: 0,
        zIndex: 9,
        showAnimation: {
            type: 'slide'
        },
        items: [
            {
                layout: 'hbox',
                cls: 'filterClosePanel',
                docked: 'top',
                items: [
                    {
                        html: 'Items Details'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        cls: 'p-close-button',
                        text: 'X',
                        listeners: {
                            tap: function() {
                                this.parent.parent.hide();
                            }
                        }
                    }
                ]
            },//closePanel
            {
                xtype: 'imagelist',
                scrollable: {
                    direction: 'horizontal',
                    directionLock: true
                },
                inline: { wrap: false },
                itemId: 'imagesMoredetailPage',
                cls: 'images-moredetail-page'
            },
            {
                xtype: 'label',
                itemId: 'titleMoredetailPage',
                cls: 'title-moredetail-page',
                html: 'Item title 1'
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                cls: 'p-panel-price',
                items: [
                    {
                        xtype: 'container',
                        layout:'hbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'label-list-price-moredetail-page',
                                html: 'List Price: ',
                                itemId: 'labelListPriceMoredetailPage'
                            },
                            {
                                xtype: 'label',
                                itemId: 'listPriceMoredetailPage',
                                cls: 'list-price-moredetail-page'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout:'hbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'label-member-price-moredetail-page',
                                itemId: 'labelMemberPriceMoredetailPage',
                                html: 'Member Price: '
                            },
                            {
                                xtype: 'label',
                                itemId: 'memberPriceMoredetailPage',
                                cls: 'member-price-moredetail-page'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'label',
                itemId: 'productIdMoredetailPage',
                cls: 'list-price-moredetail-page',
                hidden: true
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                scrollable:{
                    direction: 'vertical',
                    directionLock: true
                    },
                height: '10%',
                items: [
                            {
                                xtype: 'label',
                                itemId: 'descriptionMoredetailPage',
                                cls: 'list-price-moredetail-page',
                            }
                ]
           },
           {
                xtype: 'formpanel',
                scrollable: null,
                cls: 'quantity-panel-moredetail-page',
                itemId: 'quantityPanelMoreDetailPage',
                width: 200,
                items: [
                    {
                        xtype: 'numberfield',
                        placeHolder: 'Quantity',
                        label: 'Quantity',
                        itemId: 'quantityMoredetailPage',
                        cls: 'p-numberfield-quantity',
                        labelWidth: '40%',
                        maxHeight: '40px',
                        value: 1
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'buyNowButtonMoredetailPage',
                        cls: 'buy-now-button-moredetail-page',
                        text: 'Buy Now',
                        left: 0,
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        itemId: 'addToCartButtonMoredetaiPage',
                        cls: 'p-button-addToCart',
                        text: 'Add to Cart', 
                        right: 0
                    }
                ]
            }
        ]
    },
    
    hide: function() {
        this.destroy();
    }
});
