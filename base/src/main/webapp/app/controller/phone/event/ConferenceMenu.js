Ext.define('Personify.controller.phone.event.ConferenceMenu', {
    extend: 'Personify.base.Controller',

    config: {
        menuStore: null
    },
    control: {
        menuToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        menuList: {
            itemtap: 'onMenuItemTapped'
        },
        titleEventOfConferenceMenu: true,
        imageEvent: true,
        sponsorCarousel: {
           show: 'onShowImage',
           activeitemchange: 'onActiveItemChange'
        }
    },

    init: function() {
           this.onShowImage();
        this.getMenuToolbar().getController().setHiddenActionButton(true);
        var conferenceImageWidth = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('conferenceImageWidth');
        var conferenceImageHeight = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('conferenceImageHeight');

        if (conferenceImageWidth) {
           this.getImageEvent().setWidth(conferenceImageWidth);
        }
        if (conferenceImageHeight) {
            this.getImageEvent().setHeight(conferenceImageHeight);
        }
    },

    setDataSponsorCarousel: function(sponsorEventsData) {
        var carousel = this.getSponsorCarousel();

        for (var i = 0; i < sponsorEventsData.getCount(); i++) {
            var src = sponsorEventsData.getAt(i).getData().phoneImageURL;
            var url = '<div style = "text-align: center" ><a href = "' + sponsorEventsData.getAt(i).getData().redirectURL + '"><img alt = "' + sponsorEventsData.getAt(i).getData().sponsorName + '" src = "' + src + '" width="auto" height="45px"/></a></div>'
            carousel.add({
                html: url
            });
        }

        if (carousel.getItems().getCount() != 1) {
            carousel.show();
            carousel.setActiveItem(0);
        } else {
            this.getMenuList().setMargin('0 0 45 0');
        }
    },

    setRecord: function(record) {
        this.getImageEvent().setSrc(record.get('imageURL'));
        this.getTitleEventOfConferenceMenu().setHtml(Personify.utils.ItemUtil.getShortContent(record.get('shortName'), 75));
    },

    onUpdateValue: function(record, store, title){
        this.getView().setRecord(record);
        this.getView().setStore(store);
        this.getView().setTitle(title);
        this.setTitle(title);
        if(store != null){
            var menu = Ext.create('Personify.store.base.EventMenu');
            store.each(function(record){
                menu.add(record);
            });
            this.setMenuStore(store)
            this.setStore(menu);
        }
    },
    
    onBack: function() {
        this.getView().fireEvent('backtoevent',this);
    },

    onMenuItemTapped: function(dataView, index, target, record, event, eOpts) {
        var meetingRecord = this.getView().getRecord();
        this.getView().fireEvent('requestopendetail', record.get('view'), {record: meetingRecord, eventId: meetingRecord.get('productID')});
    },

    setStore: function(store) {
        this.getMenuList().setStore(store);
    },

    setTitle: function(value) {
        this.getMenuToolbar().setTitle('Conference');
        this.getMenuToolbar().getTitle().setCls('p-phone-title-toolbar');
    },
    
    updateMenu: function(record){
        if(record && record != null){
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            var isStaff = currentUser ? currentUser.isStaffMember(): false;
            var attendeesNum = record.MeetingRegistrantStore ? record.MeetingRegistrantStore.getCount() : 0;
            var exhibitorsNum = record.ExhibitorStore ? record.ExhibitorStore.getCount() : 0;
            var materialsNum = record.MaterialStore ? record.MaterialStore.getCount() : 0;
            var presentersNum = record.SpeakersListEvent ? record.SpeakersListEvent.getCount() : 0;

            var menuStore = this.getMenuStore();
            var menu = Ext.create('Personify.store.base.EventMenu');
            menuStore.each(function(record){
                menu.add(record);
            });
            this.getMenuList().setStore(menu);
            
            if (attendeesNum == 0) {
                this.removeMenuItem('attendees');
            }else{
                if(isStaff || record.get('registered')){
                    
                }else{
                    this.removeMenuItem('attendees');
                }
            }
            if (materialsNum == 0) {
                this.removeMenuItem('materials');
            }
            if (exhibitorsNum == 0) {
                this.removeMenuItem('exhibitors');
            }
            if (presentersNum == 0) {
                this.removeMenuItem('presenters');
            }
            if (record.get('badgeData') == '') {
                this.removeMenuItem('badge');
            }
        }
    },
    
    removeMenuItem: function(menuItem){
        var store = this.getMenuList().getStore();
        store.each(function(record){
            if(record.get('menuItem') == menuItem){
                store.remove(record);
            }
        });
    },
           
    onShowImage: function() {
        var carousel = this.getSponsorCarousel();
           
        //if(carousel.getActiveIndex()>0)
        //{
        var rotation = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('sponsorRotation');
        carousel.pageTurner = new Ext.util.DelayedTask(function() {
            if (carousel.getActiveIndex() == carousel.items.length - 1) {
                carousel.setActiveItem(0, { type: "slide", direction: "right", duration: rotation * 1000 });
                carousel.setActiveIndex(0);
            } else {
                carousel.next();
            }
        }, carousel);
        //}
           
        carousel.pageTurner.delay(rotation * 1000);
    },
           
    onActiveItemChange: function() {
        var carousel = this.getSponsorCarousel();
        // if(carousel.getActiveIndex()>0){
        var rotation = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('sponsorRotation');
        carousel.pageTurner.delay(rotation * 1000);
        //}
    }
});