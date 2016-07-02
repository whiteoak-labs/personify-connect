Ext.define('Personify.view.phone.session.MySessionPanel', {
    extend: 'Ext.Panel',
    xtype: 'mysessionpanelphone',
    requires: [
        'Personify.controller.phone.session.MySessionPanel',
        'Personify.view.phone.session.MySessionList'
    ],
    controller: 'Personify.controller.phone.session.MySessionPanel',
    config: {
        layout: 'vbox',
        items: [
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'mySessionTitleBar'
            },
            {
                layout: {
                    type:'vbox',
                    align:'center'
                },
                itemId: 'sessionHeader',
                cls:'p-phone-panel-sessionheader',
                items: [
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-sessionprevious',
                        pressedCls: '',
                        itemId: 'previousButton',
                        docked: 'left'
                    },
                    {
                        itemId: 'dateTimeLabel',
                        cls: 'p-phone-lable-sessiondatetime'
                    },
                    {
                        itemId: 'totalEventLabel',
                        cls: 'p-phone-lable-sessiontotalevent'
                    },
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-sessioncontinue',
                        pressedCls: '',
                        itemId: 'nextButton',
                        docked: 'right'
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'mysessionlistphone',
                itemId: 'mySessionList',
                style: 'margin-bottom: 51px'
            }
        ]
    },

    updateRecord: function(record){
        if(record && record != null){
            this.getController().setRecord(record);
        }
    }
});
