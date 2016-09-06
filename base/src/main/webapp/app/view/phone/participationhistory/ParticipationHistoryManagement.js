Ext.define('Personify.view.phone.participationhistory.ParticipationHistoryManagement', {
    extend: 'Ext.Panel',
    xtype: 'participationhistorymanagementphone',
    controller: 'Personify.controller.phone.participationhistory.ParticipationHistoryManagement',
    
    requires: [
        'Personify.controller.phone.participationhistory.ParticipationHistoryManagement',
        'Personify.view.phone.participationhistory.ParticipationTemplate',
        'Personify.view.phone.participationhistory.CurrentCommittee',
        'Personify.view.phone.participationhistory.PastCommittee',
        'Personify.view.phone.participationhistory.FutureCommittee'
    ],
    config: {
        layout: 'vbox',
         cls: 'p-phone-directory-participation-history-detail-page',
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'participationHistoryToolbar',
                docked: 'top',
                title: 'Participation History'
            },
            {
                flex: 1,
                xtype: 'panel',
                layout: 'vbox',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                items: [
                    {
                        itemId:'currentCommittee',
                        xtype: 'currentcommitteephone'
                    },
                    {
                        itemId:'futureCommittee',
                        xtype: 'futurecommitteephone'
                    },
                    {
                        itemId:'pastCommittee',
                        xtype: 'pastcommitteephone'
                    }
                ]
            }
        ]
    }
})