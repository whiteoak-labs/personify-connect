Ext.define('Personify.view.phone.participationhistory.PastCommittee', {
    extend: 'Ext.Container',
    xtype:'pastcommitteephone',
    
    requires: [
        'Personify.view.phone.participationhistory.ParticipationTemplate'
    ],
    
    config: {
        cls: 'past-committee',
        store:null,
        layout:'vbox',
        items: [
            {
                xtype: 'label',
                html: 'Past Committees',
                cls: 'p-phone-directory-participantheader'
            },
            {
                flex: 1,
                itemId: 'pastCommitteeList',
                xtype: 'dataview',
                scrollable: null,
                itemHeight: 51,
                itemCls: 'p-phone-directory-participant-history',
                selectedCls: '',
                pressedCls: '',
                itemTpl: null
            }
        ]
    },
    
    initialize: function(){
        var me=this;
        var template = Ext.create('Personify.view.phone.participationhistory.ParticipationTemplate');
        this.down("#pastCommitteeList").setItemTpl(new Ext.XTemplate(Ext.create('Personify.view.phone.participationhistory.ParticipationTemplate').element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    },
    
    updateStore: function(newStore) {
        var me = this,
            currentCommitteeList = me.down('#pastCommitteeList');
            
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