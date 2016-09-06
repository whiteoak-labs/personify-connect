Ext.define('Personify.controller.phone.participationhistory.ParticipationHistoryManagement', {
    extend: 'Personify.controller.profile.ParticipationHistory',
    
    config: {
        store: null
    },
    
    control: {
        participationHistoryToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        currentCommittee: {},
        futureCommittee: {},
        pastCommittee: {}
    },
    
    init: function() {
        this.callParent(arguments);
        var me = this;
        var record = me.getView().config.record;
        me.getParticipationHistoryToolbar().getController().setHiddenActionButton(true);
        if(record && record.EntryProfile && record.EntryProfile.getAt(0)) {
            me.loadContactData(record.EntryProfile.getAt(0));
        }
    },
    
    onBack: function() {
        var me = this;
        var thisView = me.getView();
        thisView.fireEvent('back',this, null);
    },
    
    refreshRecordAfterEditing: function() {
        
    }
});
