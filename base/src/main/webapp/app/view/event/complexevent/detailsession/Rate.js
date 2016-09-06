Ext.define('Personify.view.event.complexevent.detailsession.Rate', {
    extend: 'Ext.Panel',
    xtype: 'sessionrate',
    controller: 'Personify.controller.event.complexevent.detailsession.Rate',

    requires: [
        'Personify.controller.event.complexevent.detailsession.Rate',
        'Ext.ux.Rating'
    ],

    config: {
        flex: 1,
        productId: null,
        meetingRecord: null,
        sessionId: null,
        record: null,
        layout: 'vbox',
        showCloseButton: false,
        items: [
            {

                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                style: 'padding: 5px 10px 5px 0px; background: #E8E8E8',
                items: [
                    {
                        flex: 1,
                        html: 'Optional configurable text here',
                        cls: 'p-phone-panel-sessiontmaresources',
                        itemId: 'titleRate',
                        style: 'text-align: left; font-size: 16px; color: #666666; background: #E8E8E8; padding: 2px 0 2px 10px;'

                    },
                    {
                        xtype: 'button',
                        cls: 'p-button-closechildpanelevent',
                        style: 'width: 80px',
                        text: 'Close',
                        itemId: 'closeButton',
                        docked: 'right',
                        hidden: true
                    }
                ]
            },
            {
                height: 36,
                xtype: 'rating',
                cls: 'view-rating',
                itemsCount : 5,
                minValue: -1,
                label : 'Rate this session',
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
                        scrollable: true,
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
                                //style: 'border: 1px solid gray',
                                maxLength: 3000,
                                maxRows: 60,
                            }

                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                height: 55,
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
});