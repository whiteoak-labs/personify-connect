Ext.define('Personify.view.phone.session.AllSessionPanel', {
    extend: 'Ext.Panel',
    xtype: 'allsessionpanelphone',
    requires: [
        'Personify.controller.phone.session.AllSessionPanel',
        'Personify.view.phone.session.AllSessionList',
        'Personify.view.SearchFieldWithSearchKeyBoard',
        'Personify.view.phone.session.SearchHeader',
        'Personify.view.phone.store.FilterStorePanel',
        'Personify.view.event.complexevent.sessions.myschedule.FilterList'
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
                xtype: 'searchheadersessionphone',
                itemId: 'searchWithFilter'
            },
            {
                cls: 'p-text-viewing-sessionheader',
                itemId: 'filterTextLabel'
            },
            {
                xtype: 'searchfieldwithsearchkeyboard',
                cls: 'p-phone-search-field',
                itemId: 'searchFieldAllSessionPanelPhone',
                placeHolder: 'Search Session and Presenter',
                hidden:true
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
                        pressedCls: '',
                        style: 'margin: 12px 0px 0px 0px'
                    },
                    {
                        itemId: 'dateTimeLabel',
                        cls: 'p-phone-lable-sessiondatetime',
                        style: 'margin: 2px 0px 0px 0px'
                    },
                    {
                        itemId: 'totalEventLabel',
                        cls: 'p-phone-lable-sessiontotalevent',
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-sessioncontinue',
                        pressedCls: '',
                        itemId: 'nextButton',
                        docked: 'right',
                        style: 'margin: 12px 0px 0px 0px'
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'allsessionlistphone',
                itemId: 'allSessionList',
                style: 'margin-bottom: 51px'
            },
            {
                style:'font-size: 12px;margin-top:0px;',
                itemId: 'filterListEventSchedule',
                xtype: 'filterlist',
                hidden: true,
                modal: true,
                hideOnMaskTap: true
            }
        ]
    },

    updateRecord: function(record){
        if(record && record != null){
            this.getController().setRecord(record);
        }
    }
});
