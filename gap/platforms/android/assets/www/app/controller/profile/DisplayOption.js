Ext.define('Personify.controller.profile.DisplayOption', {
    extend: 'Personify.base.Controller',
    requires: 'Personify.view.profile.Logout',

    inject: [
        'personify',
        'currentUser'
    ],

    control: {
        optionList: {
            itemtap: 'onListItemTapped'
        },
        goOnlineProfile: {
            tap: 'goOnlineProfile'
        },
        logoutButton: {
            tap: 'onTapLogoutButton'
        },
        toggleOption: {
        }
    },

    config: {
        personify: null,
        currentUser: null,
        record: null
    },

    onListItemTapped: function(view,index,target, record,e) {
        this.getView().fireEvent('tapOnDisplayOptionItem', record);
    },

    onListSelected: function(view, record, e){
        this.getView().fireEvent('tapOnDisplayOptionItem', record);
    },

    onTapLogoutButton: function() {
        var view = Ext.Viewport.add({xtype: 'logout', centered: true, modal: true, hideOnMaskTap: true});
        view.show();
    },

    goOnlineProfile : function() {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        this.getCurrentUser().loadProfileUrl().then({
            success: function(url) {
                if (Ext.os.is.Android) {
                    window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                } else {
                    window.open(url, '_blank', 'location=no,enableViewportScale=yes');
                }
            },
            failure: function() {
                Ext.Msg.alert('', 'Cannot load online profile URL, please try again later.');
            }
        }).always(function() {
            Ext.Viewport.setMasked(false);
        });
    },

    updateRecord: function(newRecord) {
        this.getToggleOption().setRecord(newRecord);
    },

    init: function() {
        var me = this;
        me.callParent(arguments);
    }
});
