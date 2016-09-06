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
       Personify.utils.BackHandler.popActions(1);
        if(index != 0)
           Personify.utils.BackHandler.pushActionAndTarget('backAction', this);
        else
           Personify.utils.BackHandler.popActionAndTarget('backAction', this);
        this.getView().fireEvent('tapOnDisplayOptionItem', record);
    },
           
   backAction:function()
   {
           this.getOptionList().select(0);
           var record =  this.getOptionList().getStore().getAt(0);
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
                var ref = null;
                if (Ext.os.is.Android) {
                    ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                } else {
                    ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                }
                Personify.utils.BackHandler.pushActionAndTarget('close', ref);
                ref.addEventListener('exit', function() {
                 Personify.utils.BackHandler.popActionAndTarget('close', ref);
                 });
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
