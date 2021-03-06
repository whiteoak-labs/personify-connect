Ext.define('Personify.controller.community.CommunityPanel', {
    extend: 'Personify.base.Controller',
    control: {
        postToCommunity: {
            tap: 'onButtonGoToPostPanelTap'
        },
        comunityComment: {
            postcomment: 'onPostcommentSummit'
        },
        communitylist:{
            gotoprofile: 'gotoprofile'
        }
    },
    
    onButtonGoToPostPanelTap: function() {
        this.getComunityComment().show();
        this.getPostToCommunity().hide()
    },
    
    onPostcommentSummit: function() {
        this.getComunityComment().hide();
        this.getPostToCommunity().show()
    },
    gotoprofile: function (record){
        this.getView().getParent().fireEvent('gotoAttendeeProfile',record);
    }
});
