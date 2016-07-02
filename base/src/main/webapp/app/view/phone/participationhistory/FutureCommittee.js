Ext.define('Personify.view.phone.participationhistory.FutureCommittee', {
    extend: 'Ext.Container',
    xtype:'futurecommitteephone',
    
    requires: [
        'Personify.view.phone.participationhistory.ParticipationTemplate'
    ],
    
    config: {
        store: null,
        layout:'vbox',
        items: [
            {
                xtype: 'label',
                html: 'Future Committees',
                cls: 'p-phone-directory-participantheader'
            },
            {
                flex: 1,
                itemId: 'futureCommitteeList',
                xtype: 'dataview',
                scrollable: null,
                itemCls: 'p-phone-directory-participant-history',
                selectedCls: '',
                pressedCls: '',
                itemHeight: 51,
                itemTpl: null
            }
        ]
    },
    
    initialize: function(){
        var me=this;
        var template = Ext.create('Personify.view.phone.participationhistory.ParticipationTemplate');
        this.down("#futureCommitteeList").setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        me.callParent(arguments);
        template.destroy();
    },
    updateStore: function(newStore) {
        var me = this,
            currentCommitteeList = me.down('#futureCommitteeList');
        currentCommitteeList.setStore(newStore);
        if (newStore.getCount() > 0) {
            currentCommitteeList.setHeight(newStore.getCount() * 51);
        } else {
            currentCommitteeList.setHeight(35);
            currentCommitteeList.addCls('p-phone-directory-participant-history-nodata');
            currentCommitteeList.setHtml('No Data');
        }
    }
});