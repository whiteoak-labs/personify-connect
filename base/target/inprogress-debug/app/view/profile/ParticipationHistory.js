Ext.define('Personify.view.profile.ParticipationHistory', {
    alias: 'widget.participationhistory',
    extend: 'Ext.Container',
    controller:'Personify.controller.profile.ParticipationHistory',
    requires: [
        'Personify.controller.profile.ParticipationHistory',
        'Personify.view.profile.participationhistory.ParticipationTemplate',
        'Personify.view.profile.participationhistory.CurrentCommittee',
        'Personify.view.profile.participationhistory.PastCommittee',
        'Personify.view.profile.participationhistory.FutureCommittee'
    ],
    inject:{
        currentUser: 'currentUser'
    },
    
    config: {
        currentUser: null,
        layout:'vbox',
        scrollable: true,
        flex: 1,
        cls:'participation-history',
        items: [
            {
                itemId:'currentCommittee',
                xtype: 'currentcommittee',
                scrollable: null
            },
            {
                itemId:'futureCommittee',
                xtype: 'futurecommittee',
                scrollable: null
            },
            {
                itemId:'pastCommittee',
                xtype: 'pastcommittee',
                scrollable: null
            }
        ]
    },

    initialize: function() {
        var me = this;
        me.callParent(arguments);
    }
});
