Ext.define('Personify.controller.profile.ContactListing', {
    extend: 'Personify.base.Controller',
    
    control: {
        contactList: {
            itemtap: 'onItemTap',
            scrollend: 'onNextButtonTap'
        },
        newContactInquiry: {
            tap: 'onNewContactInquiry'
        }
    },
    
    config: {
        params: null,
        currentContact: null,
        selectedRecord: null,
        totalContactTrackingResult: 0
    },
    
    init: function() {
        this.resetParams();
    },
    
    resetParams: function() {
        this.setParams({
            MasterCustomerId: "",
            SubCustomerId: "",
            StartIndex: 1,
            ItemsPerPage: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'),
            StaffId: ''
        });
    },
    
    loadContactData: function(record, refresh) {
        if(record) {
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            var config = Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore;
            var me = this;
            me.setCurrentContact(record);
            var params = me.getParams();
            
            params['MasterCustomerId'] = record.get('masterCustomerId');
            params['SubCustomerId'] = record.get('subCustomerId');
            params['StaffId'] = (currentUser.get('id') != null) ? currentUser.get('id') : '';
            
            me.getView().setMasked({xtype:'loadmask'});

            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var contactListingStoreName = storeManager.getProfileContactListingStore();
            var contactListingStore = Ext.create(contactListingStoreName, {
                dataRequest: params
            });

            contactListingStore.load({
                callback: function(records, operation, success) {
                    if (success && records.length && !me.getView().isDestroyed) {
                        var contactManagement = records[0];

                        if (refresh && refresh == true) {
                            me.getContactList().setStore(contactManagement.ContactListStore);
                            me.getView().setMasked(false);
                        } else {
                            var currentStore = this.getContactList().getStore();

                            if (currentStore) {
                                currentStore.each(function(currentRecord) {
                                    currentRecord.set('details', null);
                                }, me);
                                currentStore.suspendEvents();
                                contactManagement.ContactListStore.each(function(contactRecord) {
                                    currentStore.add(contactRecord);
                                }, me);
                                currentStore.sync();
                                currentStore.resumeEvents(true);
                                me.getContactList().refresh();
                            } else {
                                me.getContactList().setStore(contactManagement.ContactListStore);
                                currentStore = contactManagement.ContactListStore;
                            }

                            if (contactManagement) {
                                me.setTotalContactTrackingResult(contactManagement.get('totalResults'));
                            }

                            me.getView().setMasked(false);
                        }
                    }
                },
                scope: me
            }, me);
        }
    },
    
    onNextButtonTap: function() {
        var currentContact = this.getCurrentContact();
        var contactTrackingStore = this.getContactList().getStore();
        var currentContactTrackingItem = 0;

        if (contactTrackingStore) {
            currentContactTrackingItem = contactTrackingStore.getCount();
        }

        if (currentContact && currentContactTrackingItem < this.getTotalContactTrackingResult()) {
            this.getParams()['StartIndex'] = this.getParams()['StartIndex'] + (Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'));
            this.loadContactData(currentContact);
        }
    },
    
    setLoadedStore: function(store) {
        this.getPurchaseHistoryList().setStore(store.getPurchaseListStore());
        this.getPurchaseHistoryPagingPanel().getController().setPagingNavigationPanel(store.getAt(0).get('startIndex'), store.getAt(0).get('totalResults'), Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'));
        this.getPurchaseHistoryPagingPanel().setHidden(store.getPurchaseListStore().getCount() == 0);
    },
    
    onNewContactInquiry: function() {
        var panel = Ext.create('Personify.view.profile.contactlisting.InquiryPanel');
        this.passDataToChildView(panel);
        panel.getController().setOptionsForPickLists();
        panel.getController().setRecord(this.getCurrentContact());
        panel.getController().setDelegate(this);
        Ext.Viewport.add(panel);
        panel.show();
    },
    
    onItemTap: function( list, index, target, record, e, eOpts ) {
        Ext.Viewport.setMasked( {xtype: 'loadmask', zIndex: 10} );
        if (record) {
            this.setSelectedRecord(record);
        } else {
            if(this.getSelectedRecord()) {
                record = this.getSelectedRecord();
                record.set('details', null);
            }
        }
        
        var me = this;
        if (record.get('details')) {
            var panel = Ext.create('Personify.view.profile.contactlisting.ContactDetailPanel');
            panel.getController().setDelegate(me);
            me.passDataToChildView(panel);
            panel.setRecord(record.get('details'));
            panel.setCurrentContact(me.getCurrentContact());
            Ext.Viewport.add(panel);
            panel.show();
        } else {
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            var currentContactInfo = this.getCurrentContact();
            if(currentContactInfo) {
                var params = {
                    'MasterCustomerId': currentContactInfo.get('masterCustomerId'),
                    'SubCustomerId': currentContactInfo.get('subCustomerId'),
                    'StaffId': (currentUser.get('id') != null) ? currentUser.get('id') : '',
                    'ActivityId': record.get('activityId')
                };
            }

            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var contactTrackingStoreName = storeManager.getProfileContactTrackingStore();
            var contactTrackingStore = Ext.create(contactTrackingStoreName, {
                dataRequest: params
            });

            contactTrackingStore.load({
                callback: function(records, operation, success) {
                    if (success && records.length) {
                        var contactDetailManagement = records[0];
                        var panel = Ext.create('Personify.view.profile.contactlisting.ContactDetailPanel');
                        panel.getController().setDelegate(me);
                        me.passDataToChildView(panel);

                        if (contactDetailManagement) {
                            panel.setRecord(contactDetailManagement);
                            record.set('details', contactDetailManagement);
                        }

                        panel.setCurrentContact(me.getCurrentContact());
                        Ext.Viewport.add(panel);
                        panel.show();
                    } else {
                        Ext.Viewport.setMasked(false);
                    }
                },
                scope: me
            });
        }
    },
    
    passDataToChildView: function(childView) {
        childView.setStaffList(this.getView().getStaffList());
        childView.setCallTopicList(this.getView().getCallTopicList());
        childView.setCallSubjectList(this.getView().getCallSubjectList());
        childView.setCallTypeList(this.getView().getCallTypeList());
    }
});
