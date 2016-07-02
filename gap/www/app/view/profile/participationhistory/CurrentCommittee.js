Ext.define('Personify.view.profile.participationhistory.CurrentCommittee', {
    extend: 'Ext.Container',
    xtype:'currentcommittee',
    requires: [
        'Personify.view.profile.participationhistory.ParticipationTemplate'
    ],
    
    config: {
        cls: 'current-committee',
        store: null,
        layout:'vbox',
        items: [
            {
                xtype: 'label',
                html: 'Current Committees',
                cls:['sub-participation-history-list-header','current-committee-list-header', 'sub-profile-list-title']
            },
            {
                itemId: 'currentCommitteeList',
                itemCls:'p-sub-item-participation',
                cls:'current-committee-list',
                xtype: 'dataview',
                itemHeight: 57,
                scrollable: null,
                selectedCls: '',
                pressedCls: '',
                itemTpl: null
            }
        ]
    },
    
    initialize: function(){
        var me=this;
        var template = Ext.create('Personify.view.profile.participationhistory.ParticipationTemplate');
        this.down("#currentCommitteeList").setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        me.callParent(arguments);
        template.destroy();
    },
    updateStore: function(newStore) {
        var me = this,
            currentCommitteeList = me.down('#currentCommitteeList');
        currentCommitteeList.setStore(newStore);
        currentCommitteeList.refresh();

        if (newStore.getCount() == 0) {
            currentCommitteeList.setStyle('padding-top:15px;margin-left:42px');
            currentCommitteeList.setHtml('No Data');
        }
    }
});