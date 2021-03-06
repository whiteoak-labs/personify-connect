Ext.define('Personify.view.phone.rate.Rate', {
    extend: 'Ext.Panel',
    xtype: 'sessionratephone',
    controller: 'Personify.controller.phone.rate.Rate',

    requires: [
        'Personify.controller.phone.rate.Rate',
        'Ext.ux.Rating'
    ],

    config: {
        flex: 1,
        record: null,
        productId: null,
        sessionId: null,
        meetingRecord: null,
        layout: 'vbox',
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Rate',
                itemId: 'rateToolbar'
            },
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'rateTitleBar'
            },
            {
                flex: 1,
                layout: 'vbox',
                items: [
                    {
                        html: 'Optional configurable text here',
                        cls: 'p-phone-panel-sessiontmaresources',
                        itemId: 'titleRate',
                        style: 'text-align: left; font-size: 16px; color: #666666; background: #E8E8E8; padding: 2px 0;'
                    },
                    {
                        height: 36,
                        xtype: 'rating',
                        cls: 'view-rating',
                        itemsCount : 5,
                        minValue: -1,
                        label : 'Rate',
                        inputCls : 'x-rating-star-input',
                        itemCls : 'x-rating-star',
                        itemHoverCls : 'x-rating-star-hover',
                        clearIcon: true,
                        itemId: 'inputRating'
                    },
                    {
                        flex: 1,
                        xtype: 'panel',
                        layout: 'vbox',
                        style: 'background-color: white; padding: 10px;',
                        items: [
                            {
                                flex: 1,
                                scrollable: null,
                                xtype: 'panel',
                                layout: 'vbox',
                                itemId: 'panelOfContent',
                                items: [
                                    {
                                        flex: 1,
                                        xtype: 'textareafield',
                                        placeHolder: 'Tap to type',
                                        itemId: 'inputRatingComment',
                                        cls: 'inputDescriptionNote',
                                        style: 'border: 1px solid gray',
                                        maxLength: 3000,
                                        maxRows: 60,
                                    },
                                    {
                                        xtype: 'panel',
                                        height: 55,
                                        style: 'margin-bottom: 51px',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        text: 'Submit',
                                                        cls: 'p-button-doneNote',
                                                        itemId: 'saveRatingComment',
                                                        style: 'float: right; padding: 0 20px 10px 20px'
                                                    }
                                                ]
                                            }
                                        ]
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