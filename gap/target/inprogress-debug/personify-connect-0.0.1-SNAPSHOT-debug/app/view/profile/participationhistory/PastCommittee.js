Ext.define('Personify.view.profile.participationhistory.PastCommittee', {
    extend: 'Ext.Container',
    xtype:'pastcommittee',
    
    requires: [
        'Personify.view.profile.participationhistory.ParticipationTemplate'
    ],
    
    config: {
        cls: 'past-committee',
        store: null,
        layout:'vbox',
        items: [
            {
                xtype: 'label',
                html: 'Past Committees',
                cls:['sub-participation-history-list-header','past-committee-list-header', 'sub-profile-list-title']
            },
            {
                itemId: 'pastCommitteeList',
                cls:'past-committee-list',
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
        this.down("#pastCommitteeList").setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        me.callParent(arguments);
        template.destroy();
    },
    updateStore: function(newStore) {
        var me = this,
            currentCommitteeList = me.down('#pastCommitteeList');
            
        currentCommitteeList.setStore(newStore);

        if (newStore.getCount() == 0) {
            currentCommitteeList.setStyle('padding-top:15px;margin-left:42px');
            currentCommitteeList.setHtml('No Data');
        }
    }
});