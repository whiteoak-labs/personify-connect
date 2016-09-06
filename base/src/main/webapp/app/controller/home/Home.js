Ext.define('Personify.controller.home.Home', {
    extend: 'Personify.base.Controller',
    inject: ['currentUser'],
    
    config: {
        currentUser: null
    },
    
    control: {
        menuHome: {
            onMenuItemTapped: 'onMenuItemTapped'
        },
        nextThreeEventList: {
            onEventItemTapped: 'onEventItemTapped',
            onViewMoreEventTap: 'onViewMoreEvent',
            copymeetinglist: 'onCopyMeetingList'
        },
        lastNewsPanel: {
             onViewMoreNewsTap: 'onViewMoreNews'
        },
        bigEventPanel: {
            onEventItemTapped: 'onEventItemTapped'
        },
        view: {
            painted: 'onPainted'
        }
    }, // end control

    init: function() {
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Home');
        }
        this.onLoadMenu();
        
        //add about menu item on quick menu at home page
        var about = Ext.create('Ext.Button', {
            cls: 'menu-item about menu-list-item-background',
            text: 'About',
            handler: function() {
                var info = Ext.create('Personify.view.Help');
                Ext.Viewport.add(info);
                info.show();
            }
        });
        this.getMenuHome().getItems().items[1].add(about);
        //end
    },

    onPainted: function(){
        Ext.Viewport.setMasked(false);
    },

    onLoadMenu: function() {
        var me = this;
        this.getCurrentUser().modulesConfigurationLoad('tablet', function(store) {
            me.getMenuHome().getController().setTitle('Quick Menu');
            me.getMenuHome().getController().updateScrollable(true);
            me.getMenuHome().getController().setStore(store);
        });
    },
    
    onMenuItemTapped: function(record) {
        if (!Personify.utils.PhoneGapHelper.checkConnection() && record.get('name') != "Events") {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        if (record.get('name') === 'Discussion') {
            this.openDiscussion(record);
            return;
        }
        var main = this.getView().getParent().getParent();
        if(main != null){
            main.getController().onRequestChangeView(record.get('view'), {record: record, listeners: record.get('listeners')}, record.get('title'), record.get('css'));
        }else{
            this.getView().fireEvent('requestchangeview', record.get('view'), {record: record, listeners: record.get('listeners')}, record.get('title'), record.get('css'));
        }
    },
    
    onEventItemTapped: function(record) {
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event Detail');
        }
        var main = this.getView().getParent().getParent();
        var isConference = record.get('isConference');
        var title = record.get('shortName');
        var fromMain = true;
        var newView = isConference ? 'Personify.view.event.complexevent.ComplexEvent' : 'Personify.view.event.simpleEvent.SimpleEvent';
        if(main != null) {
            main.getController().onRequestChangeView(newView, {record: record, listeners: {'userlogin': 'refresh'}, fromMain: fromMain}, title, '');
        } else {
            this.getView().fireEvent('requestchangeview', newView, {record: record, listeners: {'userlogin': 'refresh'}, fromMain: fromMain}, title, 'eventmenuitem');
        }
    },
    onViewMoreEvent: function(){
        var main = this.getView().getParent().getParent();
        if(main != null) {
            main.getController().openView('Personify.view.EventAndEventDetail', { listeners: {'userlogin': 'refresh'} }, 'Events', 'eventmenuitem');
        }else{
            this.getView().fireEvent('requestchangeview', 'Personify.view.EventAndEventDetail', { listeners: {'userlogin': 'refresh'} }, 'Events', 'eventmenuitem');
        }
    },
    
    onViewMoreNews: function(){
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var main = this.getView().getParent().getParent();
        if(main != null){
            main.getController().openView('Personify.view.News', null, 'News', 'newsmenuitem');
        }else{
            this.getView().fireEvent('requestchangeview', 'Personify.view.News', null, 'News', 'newsmenuitem');
        }
    },
    
    onCopyMeetingList: function(store, iCalStore){
        this.getView().getParent().fireEvent('copymeetinglist', store, iCalStore);
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
            var currentUser = Personify.utils.Configuration.getCurrentUser();
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