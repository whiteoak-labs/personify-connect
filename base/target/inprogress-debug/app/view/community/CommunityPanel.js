Ext.define('Personify.view.community.CommunityPanel', {
    extend: 'Ext.Container',
    xtype: 'communitypanel',
    controller: 'Personify.controller.community.CommunityPanel',
    requires: [
        'Personify.controller.community.CommunityPanel',
        'Personify.view.community.CommunityList',
        'Personify.view.community.ComunityComment'
    ],
    config: {
        layout: 'vbox',
        cls: 'panel-left',
        showAnimation: {
            type: 'slide'
        },
        items: [
            {
                html: 'Discussions',
                cls: 'p-label-title'
            },
            {
                html: 'Post to Community',
                cls:'conversationText',
                xtype: 'button',
                itemId: 'postToCommunity'
            },
            {
                xtype: 'comunityComment',
                itemId: 'comunityComment',
                hidden: true
            },
            {
                xtype: 'communitylist',
                itemId: 'communitylist',
                flex: 14
            }
        ]
    }
});
