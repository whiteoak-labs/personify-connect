Ext.define('Personify.controller.phone.home.MenuList', {
    extend: 'Personify.base.Controller',

    inject: ['currentUser'],
    config: {
        currentUser: null
    },
    control: {
        view: {
            itemtap: 'onItemTap'
        }
    },
    init: function() {
        this.onUpdateCurrentUser(this.getCurrentUser());
    },

    onUpdateCurrentUser: function(user) {
        var me = this;
        this.setCurrentUser(user);
        user.modulesConfigurationLoad('phone', function(store) {
            me.getView().setStore(store);
        });
    },

    onItemTap: function(list,index,dom,record) {
        if (record.get('name') === 'Discussion') {
            this.openDiscussion(record);
        } else {
            var me = this;
            thisView = me.getView();
            Ext.callback(function() {
                thisView.getParent().getParent().getParent().fireEvent('requestchangeview', record.get('view'), {record:record});
            }, me, [], 1);
        }
    },

    openDiscussion: function(record) {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var isLogged = currentUser ? currentUser.isLogged() : false;
        if (record.get('neededLogin') && !isLogged) {
            Ext.Viewport.setMasked(false);
            Personify.utils.ItemUtil.needToLogin();
            return;
        }
        var me = this;
        if (Personify.utils.Configuration.getDiscussionUrl()) {
            var url = Personify.utils.Configuration.getDiscussionUrl();
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
        } else {
            var configStore = Personify.utils.Configuration.getConfiguration().getAt(0).DiscussionStore;
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var discussionStore = Ext.create(storeManager.getProfileAuthenticationUrl());
            var attributes = {
                "MasterCustomerId": currentUser.get('masterCustomerId'),
                "SubCustomerId": currentUser.get('subCustomerId'),
                "Username": Personify.utils.Configuration.getUserName(),
                "Password": Personify.utils.Configuration.getPassword(),
                "InputURL": configStore.get('url'),
                "PageKey": "",
                "VendorUserName": configStore.get('vendorUsername'),
                "VendorId": configStore.get('vendorId'),
                "VendorPassword": configStore.get('vendorPassword'),
                "VendorBlock": configStore.get('vendorBlock')
            };
            discussionStore.setDataRequest(attributes);
            this.getView().setMasked({xtype: 'loadmask'});
            discussionStore.load({callback: function(records, operation, success) {
                me.getView().setMasked(false);
                if (records[0]) {
                    var url = records[0].get('outputUrl');
                     var ref = null;
                    Personify.utils.Configuration.setDiscussionUrl(url);
                    if (Ext.os.is.Android) {
                        ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                    } else {
                        ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                    }
                     Personify.utils.BackHandler.pushActionAndTarget('close', ref);
                     ref.addEventListener('exit', function() {
                      Personify.utils.BackHandler.popActionAndTarget('close', ref);
                      });
                }
            }});
        }
    }
});
