Ext.define('Personify.controller.main.MenuList',{
    extend: 'Personify.base.Controller',
    control: {
        headerMainBtn:{
            tap: 'gotoMainPageTap'
        },
        menuItemList: {
            itemtap: 'menubarItemTap'
        },
        headerInfoBtn:{
            tap: 'openInfoPageTap'
        }
    },
    
    selectBtn: function(value){
        if(value == "info"){
            this.getHeaderInfoBtn().setCls('headerInfoBtnSelected');
        }
        if(value == "main"){
             this.getHeaderMainBtn().setCls('headerMainBtnSelected');
        }
    },
    
    resetSelectedButton: function() {
        this.getHeaderMainBtn().setCls('headerMainBtn');
        this.getHeaderInfoBtn().setCls('headerInfoBtn');
    },

    setMenuStore: function(store) {
        this.getMenuItemList().setStore(store);
    },
    
    gotoMainPageTap: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            var me = this;

            Ext.callback(function() {
                me.getView().fireEvent('openmainview');
            }, me, [], 1);
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },
    
    menubarItemTap: function(dataView, index, target, record, event, eOpts) {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            if (record.get('name') === 'Discussion') {
                var currentUser = Personify.utils.Configuration.getCurrentUser();
                var islogged = currentUser ? currentUser.isLogged() : false;
                if (record.get('neededLogin') && !islogged) {
                    Personify.utils.ItemUtil.needToLogin();
                    return;
                }
                this.openDiscussion(record);
            } else {
                this.getView().fireEvent('onmenuitem', record);
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },
    
    openInfoPageTap: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getView().fireEvent('openinfopage');
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
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
        if (Personify.utils.Configuration.getDiscussionUrl()) {
            var url = Personify.utils.Configuration.getDiscussionUrl();
            Ext.Viewport.setMasked(false);
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
            discussionStore.load({callback: function(records, operation, success) {
                Ext.Viewport.setMasked(false);
                if (records[0]) {
                    var url = records[0].get('outputUrl');
                    Personify.utils.Configuration.setDiscussionUrl(url);
                    if (Ext.os.is.Android) {
                        window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                    } else {
                        window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                    }
                }
            }});
        }
    }
});
