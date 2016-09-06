Ext.define('Personify.view.community.CommunityItem', {
    extend: 'Ext.Panel',
    config: {
        layout: 'vbox',
        items: [
            {
                docked: 'left',
                cls: 'comunityPhoto',
                height:110,
                width:110
            },
            {
                cls:'backgroundItemList',
                height:110,
                items: [
                    {
                        html: '{message}'
                    },
                    {
                        layout: 'hbox',
                        cls: 'p-panel-content',
                        docked: 'bottom',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'communitybtn'
                            },
                            {
                                html: '{name}, <a>{title}</a>',
                                cls: 'communityItemName'
                            },
                            {
                                cls: '{[this.getTypeCls(values.type)]}',
                                docked: 'right'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})