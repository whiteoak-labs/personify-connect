Ext.define('Personify.view.phone.participationhistory.CurrentCommittee', {
    extend: 'Ext.Container',
    xtype:'currentcommitteephone',
    requires: [
        'Personify.view.phone.participationhistory.ParticipationTemplate'
    ],
    
    config: {
        store: null,
        layout:'vbox',
        items: [
            {
                xtype: 'label',
                html: 'Current Committees',
                cls: 'p-phone-directory-participantheader'
            },
            {
                flex: 1,
                itemId: 'currentCommitteeList',
                xtype: 'dataview',
                itemCls: 'p-phone-directory-participant-history',
                selectedCls: '',
                pressedCls: '',
                itemHeight: 51,
                scrollable: null,
                itemTpl: null
            }
        ]
    },
    
    initialize: function(){
        var me=this;
        var template = Ext.create('Personify.view.phone.participationhistory.ParticipationTemplate');
        this.down("#currentCommitteeList").setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));

        me.callParent(arguments);
        template.destroy();
    },
    updateStore: function(newStore) {
        var me = this,
            currentCommitteeList = me.down('#currentCommitteeList');
        currentCommitteeList.setStore(newStore);
        currentCommitteeList.refresh();
        if (newStore.getCount() > 0) {
            currentCommitteeList.setHeight(newStore.getCount() * 51);
        } else {
            currentCommitteeList.setHeight(35);
            currentCommitteeList.addCls('p-phone-directory-participant-history-nodata');
            currentCommitteeList.setHtml('No Data');
        }
    }
});