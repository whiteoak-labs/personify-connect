Ext.define('Personify.controller.phone.relationship.RelationshipManagement', {
    extend: 'Personify.controller.profile.Relationship',
    
    control: {
        relationshipList: {
            scrollend: 'onNextButtonTap'
        },
        
        relationshipToolbar: {
            onNavigationButtonTap: 'onBack'
        }
    },
    
    init: function() {
        this.callParent(arguments);
        var me = this;
        var record = me.getView().config.record;
        me.getRelationshipToolbar().getController().setHiddenActionButton(true);
        if(record && record.EntryProfile && record.EntryProfile.getAt(0)) {
            me.loadContactData(record.EntryProfile.getAt(0));
        }
    },
    
    onBack: function() {
        var me = this;
        var thisView = me.getView();
        thisView.fireEvent('back',this, null);
    }
});
