Ext.define('Personify.view.phone.store.MoreDetailPage', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.store.MoreDetailPage',
    requires: [
        'Personify.controller.phone.store.MoreDetailPage',
        'Personify.view.phone.store.OrderPanel',
        'Personify.view.phone.store.BackOrderPanel'
    ],
    xtype: 'moredetailpagephone',

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Product Detail',
                itemId: 'storeToolbar'
            },
            {
                layout: 'vbox',
                flex: 1,
                scrollable: true,
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        items:[
                            {
                                html: '',
                                itemId: 'imageDetail',
                                cls: 'image-store-detail-phone'
                            }
                        ]
                    },
                    {
                        cls: 'p-phone-container-moredetail',
                        layout: 'vbox',
                        style: 'margin-bottom: 60px',
                        items:[
                            {
                                xtype: 'button',
                                itemId: 'zoomImage',
                                hidden: true
                            },
                            {
                                xtype: 'label',
                                itemId: 'titleMoredetailPage',
                                cls: 'title-store-detail-phone'
                            },
                            {
                                xtype: 'label',
                                itemId: 'descriptionMoredetailPage',
                                cls: 'description-store-detail-phone'
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'p-panel-price-phone',
                                items: [
                                    {
                                        xtype: 'container',
                                        layout:'hbox',
                                        flex: 1,
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'label-list-price-moredetail-page-phone',
                                                html: 'List Price: ',
                                                itemId: 'labelListPriceMoredetailPage'
                                            },
                                            {
                                                xtype: 'label',
                                                itemId: 'listPriceMoredetailPage',
                                                cls: 'list-price-moredetail-page-phone'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout:'hbox',
                                        flex: 1,
                                        cls: 'p-phone-container-memberpricemoredetail',
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'label-member-price-moredetail-page-phone',
                                                itemId: 'labelMemberPriceMoredetailPage',
                                                html: 'Member Price: '
                                            },
                                            {
                                                xtype: 'label',
                                                itemId: 'memberPriceMoredetailPage',
                                                cls: 'member-price-moredetail-page-phone'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'formpanel',
                                scrollable: null,
                                cls: 'quantity-panel-moredetail-page',
                                itemId: 'quantityPanelMoreDetailPage',
                                style: 'width: 50%',
                                items: [
                                    {
                                        xtype: 'numberfield',
                                        label: 'Quantity',
                                        itemId: 'quantityMoredetailPage',
                                        cls: 'phone-numberfield-quantity',
                                        maxHeight: '40px',
                                        labelWidth: '59',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                text: 'Add to Cart',
                                cls: 'add-to-cart-store-detail-phone',
                                itemId: 'addToCartButtonMoredetaiPage',
                                pressedCls: 'p-phone-button-blue-pressing'
                            },
                            {
                                xtype: 'button',
                                text: 'Buy Now',
                                cls: 'buy-now-store-detail-phone',
                                pressedCls: 'p-phone-button-red-pressing',
                                itemId: 'buyNowButtonMoredetailPage',
                                hidden: true
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                items: [
                                    {
                                        xtype: 'button',
                                        itemId: 'shareStoreDetail',
                                        text: 'Share',
                                        cls: 'p-phone-button-sharestoredetail',
                                        pressedCls: 'p-phone-button-blue-pressing'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
