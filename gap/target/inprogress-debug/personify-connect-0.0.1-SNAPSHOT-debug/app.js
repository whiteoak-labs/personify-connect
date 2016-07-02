// Configure Loader paths
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': 'touch/src',
        'Ext.ux': 'lib/Ext/ux',
        'Deft': 'lib/Deft',
        'Social': 'lib/Social',
        'Personify': 'app'
    }
});

Ext.syncRequire(["Ext.Component", "Ext.ComponentManager", "Ext.ComponentQuery"]);

Ext.application({
    name: 'Personify',

    requires: [
        'Deft.core.Class',
        'Deft.mixin.Controllable',
        'Deft.mixin.Injectable',
        'Deft.*',
        'Deft.promise.Deferred',
        'Personify.utils.ServiceManager',
        'Personify.utils.PhoneGapHelper',
        'Personify.utils.Configuration',
        'Personify.utils.Sqlite',
        'Personify.view.profile.contactlisting.ContactListingTemplate',
        'Personify.view.twitter.SearchList',
        'Social.lib.Twitter',
        'Ext.ux.TouchCalendarSimpleEvents',
        'Personify.view.IndexBar',
        'Personify.view.phone.purchasehistory.PurchaseHistoryTemplate',
        'Personify.view.phone.store.FeatureItemTemplate',
        'Personify.view.Carousel',
        'Personify.view.List',
        'Ext.form.FieldSet',
        'Personify.view.DataView',
        'Personify.view.Container',
        'Personify.view.Scroller'
    ],

    profiles: ['Tablet','Phone'],

    views: [
        'Personify.view.Main',
        'Personify.view.EventAndEventDetail',
        'Personify.view.ScheduleAndEventDetail'
    ],

    models: [
        'Personify.model.jsonp.User',
        'Personify.model.jsonp.Material',
        'Personify.model.jsonp.DirectoryManagement',
        'Personify.model.jsonp.relationship.RelationshipManagement',
        'Personify.model.jsonp.contactlisting.ContactManagement',
        'Personify.model.jsonp.contactlisting.ContactDetailManagement',
        'Personify.model.jsonp.profile.Emails',
        'Personify.model.jsonp.profile.NameCodeList'
    ],

    stores: [
        'Personify.store.base.FilterTopic',
        'Personify.store.news.YahooRss',
        'Personify.store.news.NewsUrl',
        'Personify.store.news.YahooRss',
        'Personify.store.help.Personify',
        'Personify.store.jsonp.User',
        'Personify.store.jsonp.Profile',
        'Personify.store.jsonp.ProfileUpdating',
        'Personify.store.jsonp.profile.Addresses',
        'Personify.store.jsonp.profile.CompanyContact',
        'Personify.store.jsonp.profile.Emails',
        'Personify.store.jsonp.profile.Entry',
        'Personify.store.jsonp.profile.Geo',
        'Personify.store.jsonp.profile.Name',
        'Personify.store.jsonp.profile.Organization',
        'Personify.store.jsonp.profile.PhoneNumbers',
        'Personify.store.jsonp.profile.Photos',
        'Personify.store.jsonp.profile.Relationship',
        'Personify.store.jsonp.profile.ContactTracking',
        'Personify.store.jsonp.profile.ContactListing',
        'Personify.store.base.profile.ProfileDisplayOption',
        'Personify.store.jsonp.profile.Roles',
        'Personify.store.base.profile.Type',
        'Personify.store.jsonp.profile.Urls',
        'Personify.store.jsonp.ICalendar',
        'Personify.store.jsonp.calendar.Event',
        'Personify.store.jsonp.Agenda',
        'Personify.store.jsonp.Participation',
        'Personify.store.jsonp.Attendee',
        'Personify.store.jsonp.Directory',
        'Personify.store.jsonp.Session',
        'Personify.store.jsonp.Exhibitor',
        'Personify.store.jsonp.PurchaseHistory',
        'Personify.store.jsonp.Product',
        'Personify.store.jsonp.ProductList',
        'Personify.store.jsonp.Staff',
        'Personify.store.jsonp.contactlisting.CallType',
        'Personify.store.jsonp.contactlisting.CallTopic',
        'Personify.store.jsonp.contactlisting.CallSubject',
        'Personify.store.jsonp.Customer',
        'Personify.store.jsonp.profile.Entry',
        'Personify.store.jsonp.State',
        'Personify.store.UserTimelineTwitter',
        'Personify.store.jsonp.SessionDetail',
        'Personify.store.jsonp.Material',
        'Personify.store.jsonp.SessionDetail',
        'Personify.store.jsonp.Presenter',
        'Personify.store.jsonp.SaveRating',
        'Personify.store.jsonp.store.AddToShoppingCart',
        'Personify.store.jsonp.store.ShoppingCart',
        'Personify.store.jsonp.IsUserRegister',
        'Personify.store.jsonp.Notification',
        'Personify.store.jsonp.Country',
        'Personify.store.jsonp.profile.UpdateProfile',
        'Personify.store.personify.Personify',
        'Personify.store.base.FilterTopicStore',
        'Personify.store.base.ModuleConfiguration',
        'Personify.store.jsonp.store.ShoppingCartUrl',
        'Personify.store.jsonp.store.OrderFalse',
        'Personify.store.jsonp.store.OrderTrue',
        'Personify.store.jsonp.AddNewCustomerMeetingAgenda',
        'Personify.store.jsonp.SaveCustomerMeetingAgenda',
        'Personify.store.offline.ICalendar',
        'Personify.store.jsonp.Inquiry',
        'Personify.store.jsonp.GetObjectDeleteMeetingAgenda',
        'Personify.store.jsonp.SaveDeleteMeetingAgenda',
        'Personify.store.base.NoteList',
        'Personify.store.offline.IsUserRegister',
        'Personify.store.offline.Session',
        'Personify.store.offline.Attendee',
        'Personify.store.offline.Exhibitor',
        'Personify.store.offline.calendar.Event',
        'Personify.store.offline.ICalendar',
        'Personify.store.offline.Agenda',
        'Personify.store.offline.Presenter',
        'Personify.store.offline.CustomerBiography',
        'Personify.store.offline.Country',
        'Personify.store.jsonp.CustomerBiography',
        'Personify.store.base.Note',
        'Personify.store.base.Map',
        'Personify.store.jsonp.calendar.EventMonth',
        'Personify.store.news.News',
        'Personify.store.offline.calendar.EventMonth',
        'Personify.store.offline.SessionDetail',
        'Personify.store.offline.profile.Urls',
        'Personify.store.offline.profile.Emails',
        'Personify.store.offline.Profile',
        'Personify.proxy.ProfileProxy',
    ],

    launch: function() {
        var me = this;
        Personify.utils.ServiceManager.updateManager();

        document.addEventListener('hidekeyboard', me.onHideKeyboard, false);
        document.addEventListener('showkeyboard', me.onShowKeyboard, false);
                
        if (Ext.os.is('Android')) {
                
            document.addEventListener('deviceready', onDeviceReady, false);
                
            function onDeviceReady()
            {
                document.addEventListener('backbutton', me.backKeyDown, false);
            }
            
        }
        me.handleOrientationChange();
        Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
    },
    
    backKeyDown: function(e) {
    	if (Ext.Viewport.getActiveItem().pop == undefined || Ext.Viewport.getActiveItem().pop() == undefined) {
    		e.preventDefault();
    		//navigator.app.exitApp();
    		me.getApplication().getHistory().beck();
    	}
    	else {
    		e.preventDefault();
    		me.getApplication().getHistory().back();
    	}
    },
    
    handleOrientationChange: function(){
            if (Ext.os.is.iOS && Ext.os.version.major >= 7) {
            {
                if(document.activeElement) document.activeElement.blur();
                var body = document.getElementsByTagName('body')[0];
                body.style.minHeight=window.innerHeight + 'px';
            }
        }
    },

    onHideKeyboard: function() {
        Ext.Viewport.fireEvent('keyboardhide');
    },

    onShowKeyboard: function() {
        Ext.Viewport.fireEvent('keyboardshow');
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    load: function(personifyCSSFile) {
        var head = document.getElementsByTagName("head")[0];
        var rels = head.getElementsByTagName('link');
        var oldlink = rels[0];

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", personifyCSSFile);

        head.replaceChild(newlink, oldlink);
    }
});

Ext.onReady(function(){ 
    Ext.Ajax.on('beforerequest', function(conn, response, options){ 
            this.startAjaxTime = new Date().getTime();
    });
    
    Ext.Ajax.on('requestcomplete', function(conn, response, options){ 
            var endAjaxTime = new Date().getTime();
            var delta = endAjaxTime - this.startAjaxTime;
            delta = isNaN(delta) ? 0 : delta;
            console.log('Ajax request time: '+delta+'ms url: '+options.url);
    });
}, null, true);
