Ext.define('Personify.view.twitter.SearchList',{
    extend:'Ext.Container',
    config:{
        padding: '10px 0 10px 0',
        items:[
            {
                xtype:'container',
                html:'<div class="div_content_twitter"><span class="screen_name-twitter">{from_user}&nbsp</span><span class="content-twitter"> {text}</span></div>'
            },
            {
                xtype:'container',
                layout:'hbox',
                items:[
                {
                    flex:1,
                    xtype:'label',
                    cls:'subdiv_feature_twitter time-tweet-twitter',
                    html:'{created_at}'
                }
                ]
            },
            {
                itemId: 'replyContainer',
                xtype:'container',
                layout:'hbox',
                cls:'hidden-twitter reply-container',
                items:[
                    {
                        xtype:'textareafield',
                        maxLength:140,
                        cls:'textareafield-reply'
                    },
                    {
                        xtype:'container',
                        layout:'vbox',
                        items: [
                            {
                                xtype:'button',
                                cls:'cancel-reply-twitter-button',
                                align:'right'
                            },
                            {
                                xtype:'button',
                                text:'<div class="div-reply-twitter-button">reply</div>',
                                cls:'reply-twitter-button'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});