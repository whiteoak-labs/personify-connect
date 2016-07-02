Ext.define('Personify.controller.event.complexevent.detailsession.SessionDetail',{
    extend: 'Personify.base.Controller',
    inject: ['currentUser'],
    
    requires: [
        'Personify.utils.ItemUtil'
    ],
    config: {
        currentUser: null
    },
    control: {
        headerDetailEvent:{
            onmaptap: 'onMapButtonTap',
            oninmyscheduletap: 'onInMyScheduleTap'
        },
        sessionMenuList: {
            itemtap: 'onSessionMenuListTap'
        },
        ratePanel: {
            live: true,
            listeners: {
                close: 'onCloseSubPanel'
            }
        },
        notePanel: {
            live: true,
            listeners: {
                close: 'onCloseSubPanel'
            }
        },
        cardMainDetailContainer: true,
        sponsorPanel: true,
        sessionPresenterList: {
            live:true,
            listeners: {
                showPresenterDetails: 'onShowPresenterDetails'
            }
       },
       presenterSessionInfo: {
           live:true,
           listeners: {
               closeinfopanel: 'onButtonClosePresenterDetailsTap'
           }
       },
       view: {
           show: 'onShow',
           deactivate: 'onDeactivateView',
           activeitemchange: 'onDetailItemChange'
       }
    },//control
    
    init: function() {

        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser.isLogged()) {
            this.getSessionMenuList().setData([
                {
                    title: 'Description',
                    component: 'sessionDetailDescription'
                },
                {
                    title: 'Materials',
                    component: 'materialPanel'
                },
                {
                    title: 'Presenters',
                    component: 'presenterlistdetail'
                },
                {
                    title: 'Notes',
                    component: 'sessionnotes'
                },
                {
                    title: 'Rate',
                    component: 'sessionrate'
                }
            ]);

            this.getSessionMenuList().setItemCls('item-session-menu-list');
        } else {
            this.getSessionMenuList().setData([
                {
                    title: 'Description',
                    component: 'sessionDetailDescription'
                },
                {
                    title: 'Materials',
                    component: 'materialPanel'
                },
                {
                    title: 'Presenters',
                    component: 'presenterlistdetail'
                },
                {
                    title: 'Notes',
                    component: 'sessionnotes'
                }
            ]);

            this.getSessionMenuList().setItemCls('item-session-menu-list-without-rate');
        }
        var record = this.getView().getRecord();
        var me = this;

        if (record != null) {
            this.setLocationDescription(record.get('locationDescription'));
        }

        var meetingRecord = this.getView().getMeetingRecord();
 
        if (meetingRecord != null) {
           
            var sponsorRecord = meetingRecord.SponsorListEvent;

            Personify.utils.ItemUtil.getSponsorListFromJsonFile (
                Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('sponsorEvents'), record.get('productID'), sponsorRecord, function() {
                    if (sponsorRecord.getCount() > 0) {
                        if (me['getSponsorPanel']) {
                            me.getSponsorPanel().getController().setStore(sponsorRecord);
                            me.getSponsorPanel().show();
                        }
                    } else {
                        if (me['getSponsorPanel']) {
                            me.getSponsorPanel().hide();
                        }
                    }
                }
            );
        }
           
    },

    onShow: function() {
        this.getView().setActiveItem(0);

        var me = this,
            meetingRecord = this.getView().getMeetingRecord();

        if(meetingRecord != null){
            var sponsorRecord = meetingRecord.SponsorListEvent;

            if (sponsorRecord.getCount() > 0) {
                if (me['getSponsorPanel']) {
                    me.getSponsorPanel().getController().setStore(sponsorRecord);
                    me.getSponsorPanel().show();
                }
            } else {
                if (me['getSponsorPanel']) {
                    me.getSponsorPanel().hide();
                }
            }
        }
    },

    onDetailItemChange: function() {
          
        var view = this.getView();
        var activeItemIndex = view.getInnerItems().indexOf(view.getActiveItem());

        if (activeItemIndex == 0) {
            view.removeAt(1);
        }
    },

    onCloseSubPanel: function() {
        this.getView().setActiveItem(0);
    },

    setRecord: function(record) {
           
        var me = this;
           var currentUser = Personify.utils.Configuration.getCurrentUser();
        var attributes = {
           "sessionID": record.get('sessionID'),
           "MasterCustomerID": currentUser? currentUser.get('masterCustomerId'): '' ,
           "SubCustomerID": currentUser? currentUser.get('subCustomerId'): '0'
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var sessionDetailStoreName = storeManager.getSessionDetailStore();
        var store = Ext.create(sessionDetailStoreName);
        store.setDataRequest(attributes);
            
        store.load({
            callback: function(records, operation, success) {
                if(success){
                    me.onUpdateData(store);
                }else{
                    Ext.Msg.alert('', 'Error occurred while loading session detail.');
                }
            },
            scope: this
        });
    },
    
    onUpdateData: function(sessionDetailStore) {
          
        var record = this.getView().getRecord();
        if (!record) {
            return;
        }
        var startDateTime = record.get('startDateTime');
        var endDateTime = record.get('endDateTime');
        var isAdded = record.get('isAdded');
        var meetingRecord = this.getView().getMeetingRecord();
        if(sessionDetailStore.getCount() > 0) {
            record = sessionDetailStore.getAt(0);

            if (record.get('isAdded') != isAdded) {
                record.set('isAdded', isAdded);
            }

            record.set('appointmentId', record.get('appointmentId'));
            record.set('startDateTime', startDateTime);
            record.set('endDateTime', endDateTime);
            record.set('locationDescription', this.getView().getRecord().get('locationDescription'));
        }
        record.set('timeZoneCode', meetingRecord.get('timeZoneCode'));
        this.getHeaderDetailEvent().getController().setRecord(record);
        this.getSessionMenuList().select(0);
        var subView = {xtype: 'sessionDetailDescription', record: record};
        var cardMainDetailContainer = this.getCardMainDetailContainer();
        cardMainDetailContainer.removeAll(true, true);
        cardMainDetailContainer.add(subView);
    },
    
    onSessionMenuListTap: function (dataview, index, target, record) {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            var recordView = this.getView().getRecord();
            var meetingRecord = this.getView().getMeetingRecord();
            var xtypeString = (record['component']) ? record['component'] : record.get('component');
            var subView = {xtype: xtypeString, record: recordView, meetingRecord: meetingRecord, sessionId: recordView.get('sessionID'), eventId: meetingRecord.get('productID')};
            var cardMainDetailContainer = this.getCardMainDetailContainer();

            if (xtypeString == 'presenterlistdetail') {
                if(recordView.SpeakerSession && recordView.SpeakerSession.getCount() == 1){
                    this.onShowPresenterDetails(recordView.SpeakerSession.getAt(0), false);
                }else{
                    subView.itemId = 'sessionPresenterList',
                    cardMainDetailContainer.removeAll(true, true);
                    cardMainDetailContainer.add(subView);
                }
            } else if (xtypeString == 'sessionrate') {
                this.getSessionMenuList().select(0);
                this.onSessionMenuListTap(dataview, 0, null, {
                    title: 'Description',
                    component: 'sessionDetailDescription'
                });

                /*
                Ext.apply(subView, { itemId: 'ratePanel', showCloseButton: true });
                this.getView().add(subView);
                this.getView().setActiveItem(1);
                */
                me=this;
                Ext.Function.defer(function(){
                    Ext.apply(subView, { itemId: 'ratePanel', showCloseButton: true });
                    me.getView().add(subView);
                    me.getView().setActiveItem(1);
                              
                }, 400);
            } else if (xtypeString == 'sessionnotes') {
                this.getSessionMenuList().select(0);
                this.onSessionMenuListTap(dataview, 0, null, {
                    title: 'Description',
                    component: 'sessionDetailDescription'
                });

                Ext.apply(subView, { itemId: 'notePanel', showCloseButton: true });
                this.getView().add(subView);
                this.getView().setActiveItem(1);
            } else {
                cardMainDetailContainer.removeAll(true, true);
                cardMainDetailContainer.add(subView);
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },
    
    onMapButtonTap: function() {
        var record = this.getView().getRecord();
        this.getView().fireEvent('buttonmapittap', record);
    },
    
    onInMyScheduleTap: function() {
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if(currentUser && currentUser.isLogged()){
            var view = this.getView();
            var isAdded = view.getRecord().get('isAdded');
            if(isAdded){
                view.fireEvent('deletesession', record, view);
            }else{
                this.getView().fireEvent('addsessiontoagenda', record, view);
            }
        }else {
            Personify.utils.ItemUtil.needToLogin();
            return;
        }
    },
    
    onShowPresenterDetails: function(selectedRecord, haveList) {
            if(selectedRecord) {
            
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var storeName = storeManager.getCustomerBiographyStore();
            var store = Ext.create(storeName);
            store.setDataRequest(selectedRecord);
            this.getView().setMasked({xtype:'loadmask'});
            var me = this;
            store.load({
                callback: function(records, operation, success) {
                    var cardMainDetailContainer = me.getCardMainDetailContainer();
                    if(success) {
                        //create presenter profile
                        var presenterDetailsPanel = Ext.create('Personify.view.profile.ContactInfo', {
                            itemId: 'presenterSessionInfo'
                        });
                        presenterDetailsPanel.setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoPresenter'));
                        
                        //set record presenter to presenter profile
                        if(haveList == false){
                            presenterDetailsPanel.getController().getCloseContactPanel().hide();
                        }else{
                            presenterDetailsPanel.getController().getCloseContactPanel().show();
                        }

                        if (records.length) {
                            presenterDetailsPanel.getController().setBioInfo(records[0]);
                        }

                        presenterDetailsPanel.getController().setPresenterRecord(selectedRecord);
                        
                        //remove presenter list
                        cardMainDetailContainer.removeAll(true, true);
                        cardMainDetailContainer.add(presenterDetailsPanel);
                    }

                    this.getView().setMasked(false);
                },
                scope: this
            });
        }
    },
    
    onButtonClosePresenterDetailsTap: function() {
        var record = {
            'component': 'presenterlistdetail'
        }
        this.onSessionMenuListTap(null, null, null, record);
        Ext.Viewport.setMasked(false);
    },

    onDeactivateView: function() {
        this.getSponsorPanel().getController().onHideImage();
    }
});