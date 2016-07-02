Ext.define('Personify.view.community.ComunityComment', {
    extend: 'Ext.Panel',
    xtype: 'comunityComment',
    controller: 'Personify.controller.community.ComunityComment',
    requires: 'Personify.controller.community.ComunityComment',
    config: {
        layout: 'vbox',
        cls: 'p-panel-postComment',
        items: [
            {
                xtype: 'textareafield',
                itemId: 'textFieldComment',
                placeHolder : 'Post a comment',
                cls: 'p-textareafield-postComment'
            },
            {
                layout: 'hbox',
                cls: 'p-panel-choice-postComment',
                width: '100%',
                items: [
                    {
                        html: 'Post my comment to:',
                        cls: 'p-label-title-nocolor',
                        docked: 'top'
                    },
                    {
                        flex: 1,
                        cls: 'p-checkbox-comunitypanel',
                        itemId: 'checkBoxTiwtter',
                        html: '<table><tr><td><input type="checkbox"></td><td><img src="img/comunity/twitter.png"></td></tr></table>'
                    },
                    {
                        flex: 1,
                        cls: 'p-checkbox-comunitypanel',
                        itemId: 'checkBoxDiscusion',
                        html: '<table><tr><td><input type="checkbox"></td><td><img src="img/comunity/discusion.png"></td></tr></table>'
                    },
                    {
                        flex: 1,
                        cls: 'p-checkbox-comunitypanel',
                        itemId: 'checkBoxFacebook',
                        html: '<table><tr><td><input type="checkbox"></td><td><img src="img/comunity/facebook.png"></td></tr></table>'
                    },
                    {
                        itemId: 'checkBoxOnlyEvent',
                        html: '<div><input type="checkbox"> Event only</div>',
                        docked: 'bottom'
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Post comment',
                itemId: 'postCommentButton',
                cls: 'p-button-postcomment'
            }
        ]
    }
})