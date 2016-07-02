Ext.define('Personify.controller.phone.menubar.MenuList',{
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
    setMenuStore: function(store){
        this.getMenuItemList().setStore(store);
    },

    gotoMainPageTap: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getView().fireEvent('openmainview');
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    menubarItemTap: function(dataView, index, target, record, event, eOpts) {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            if (record.get('name') === 'Discussion') {
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
            Personify.utils.ItemUtil.needToLogin();
            return;
        }
        if (Personify.utils.Configuration.getDiscussionUrl()) {
            var url = Personify.utils.Configuration.getDiscussionUrl();
            if (Ext.os.is.Android) {
                window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
            } else {
                window.open(url, '_blank', 'location=no,enableViewportScale=yes');
            }
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
            Ext.Viewport.setMasked({xtype: 'loadmask'});
            discussionStore.load({callback: function(records, operation, success) {
                Ext.Viewport.setMasked(false);
                if (records[0]) {
                    var url = records[0].get('outputUrl');
                    Personify.utils.Configuration.setDiscussionUrl(url);
                    if (Ext.os.is.Android) {
                        window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                    } else {
                        window.open(url, '_blank', 'location=no,enableViewportScale=yes');
                    }
                }
            }});
        }
    }
});
