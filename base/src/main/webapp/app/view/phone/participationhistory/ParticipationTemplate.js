Ext.define('Personify.view.phone.participationhistory.ParticipationTemplate',{
    extend: 'Ext.Container',
    
    config : {
        layout: 'hbox',
        items : [
            {
                xtype:'container',
                flex:1,
                items:[
                    {
                        xtype: 'label',
                        html: '{committeeName}',
                        cls: 'p-phone-directory-participant-history-name'
                    },
                    {
                        xtype: 'label',
                        html: '{position} / {votingStatus}',
                        cls: 'p-phone-directory-participant-history-position-vote'
                    }
                ]
            },
            {
                flex:1,
                align:'right',
                xtype: 'label',
                html: '{[Personify.utils.ItemUtil.formatJSONDateRange(values.startDate,values.endDate)]}',
                cls : 'p-phone-directory-participant-history-date'
            }
        ]
    }
});