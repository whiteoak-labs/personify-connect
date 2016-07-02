Ext.define('Personify.view.profile.participationhistory.ParticipationTemplate',{
    extend: 'Ext.Container',
    
    config : {
        layout: 'hbox',
        items : [
            {
                xtype:'container',
                cls:'name-pos-item-participation',
                items:[
                    {
                        cls:'name-item-participation',
                        flex:1,
                        xtype: 'label',
                        html: '{committeeName}'
                    },
                    {
                        cls:'position-item-participation',
                        flex:1,
                        xtype: 'label',
                        html: '{position} / {votingStatus}'
                    }
                ]
            },
            {
                flex:1,
                cls:'date-item-participation',
                align:'right',
                xtype: 'label',
                html: '{[Personify.utils.ItemUtil.formatJSONDate(values.startDate)]} - {[Personify.utils.ItemUtil.formatJSONDate(values.endDate)]}'
            }
        ]
    }
});