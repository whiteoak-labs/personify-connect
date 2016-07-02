Ext.define('Personify.view.phone.session.AllSessionPanel', {
    extend: 'Ext.Panel',
    xtype: 'allsessionpanelphone',
    requires: [
        'Personify.controller.phone.session.AllSessionPanel',
        'Personify.view.phone.session.AllSessionList'
    ],
    controller: 'Personify.controller.phone.session.AllSessionPanel',
    config: {
        layout: 'vbox',
        items: [
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'allSessionTitleBar'
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
                        itemId: 'previousButton',
                        docked: 'left',
                        cls: 'p-phone-button-sessionprevious',
                        pressedCls: ''
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
                xtype: 'allsessionlistphone',
                itemId: 'allSessionList',
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
