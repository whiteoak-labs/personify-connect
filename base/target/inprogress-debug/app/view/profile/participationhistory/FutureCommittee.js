Ext.define('Personify.view.profile.participationhistory.FutureCommittee', {
    extend: 'Ext.Container',
    xtype:'futurecommittee',
    
    requires: [
        'Personify.view.profile.participationhistory.ParticipationTemplate'
    ],
    
    config: {
        cls: 'future-committee',
        store: null,
        layout:'vbox',
        items: [
            {
                xtype: 'label',
                html: 'Future Committees',
                cls:['sub-participation-history-list-header','future-committee-list-header', 'sub-profile-list-title']
            },
            {
                itemId: 'futureCommitteeList',
                cls:'future-committee-list',
                itemCls:'p-sub-item-participation',
                xtype: 'dataview',
                scrollable: null,
                itemHeight: 57,
                selectedCls: '',
                pressedCls: '',
                itemTpl: null
            }
        ]
    },
    
    initialize: function(){
        var me=this;
        var template = Ext.create('Personify.view.profile.participationhistory.ParticipationTemplate');
        this.down("#futureCommitteeList").setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        me.callParent(arguments);
        template.destroy();
    },
    updateStore: function(newStore) {
        var me = this,
            currentCommitteeList = me.down('#futureCommitteeList');
        currentCommitteeList.setStore(newStore);
        if (newStore.getCount() == 0) {
            currentCommitteeList.setStyle('padding-top:15px;margin-left:42px');
            currentCommitteeList.setHtml('No Data');
        }
    }
});