Ext.define('Personify.controller.community.ComunityComment', {
    extend: 'Personify.base.Controller',
    control: {
        textFieldComment: {
            
        },
        postCommentButton: {
            tap: 'onPostCommentButtonTap'
        },
        checkBoxTiwtter:{
            
        },
        checkBoxDiscusion: {
            
        },
        checkBoxFacebook:{
            
        },
        checkBoxOnlyEvent: {
            
        }
    },
    
    onPostCommentButtonTap: function() {
        this.getView().fireEvent('postcomment');
    }
});