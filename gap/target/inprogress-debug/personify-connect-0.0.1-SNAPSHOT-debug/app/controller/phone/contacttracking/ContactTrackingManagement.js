Ext.define('Personify.controller.phone.contacttracking.ContactTrackingManagement', {
    extend: 'Personify.controller.profile.ContactListing',
    
    requires: [
        'Personify.view.phone.contacttracking.ContactDetailPanel',
        'Personify.view.phone.contacttracking.InquiryPanel'
    ],
    
    control: {
        contactList: {
            itemtap: 'onItemTap',
            scrollend: 'onNextButtonTap'
        },
        
        contactTrackingToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onNewContactInquiry'
        }
    },
    
    config: {
        params: null,
        currentContact: null,
        selectedRecord: null,
        callTypeList: null,
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        countryListStore: null
    },
    
    init: function() {
        this.callParent(arguments);
        var me = this;
        var config = me.getView().config;
        var record = me.getView().config.record;
        me.getContactTrackingToolbar().getController().setActionText('Add');
        if(record && record.EntryProfile && record.EntryProfile.getAt(0)) {
            me.loadContactData(record.EntryProfile.getAt(0));
        }
        
        var staffList = config.staffList;
        var callTopicList = config.callTopicList;
        var callSubjectList = config.callSubjectList;
        var callTypeList = config.callTypeList;
        var countryListStore = config.countryListStore;
        this.setStaffList(staffList);
        this.setCallTopicList(callTopicList);
        this.setCallSubjectList(callSubjectList);
        this.setCallTypeList(callTypeList);
        this.setCountryListStore(countryListStore);
    },
    
    onBack: function() {
        var me = this;
        var thisView = me.getView();
        thisView.fireEvent('back',this, null);
    },
    
    onItemTap: function( list, index, target, record, e, eOpts ) {
        if(record) {
            this.setSelectedRecord(record);
        } else {
            if(this.getSelectedRecord()) {
                record = this.getSelectedRecord();
                record.set('details', null);
            }
        }
        
        var me = this;
        if(record.get('details')) {
            var recordToPass = record.get('details');
            this.getView().fireEvent('requestchangeview','Personify.view.phone.contacttracking.ContactDetailPanel',
                {
                    record: recordToPass,
                    currentContact: me.getCurrentContact(),
                    delegate: me,
                    staffList : me.getStaffList(),
                    callTopicList : me.getCallTopicList(),
                    callTypeList : me.getCallTypeList(),
                    callSubjectList : me.getCallSubjectList()
                });
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

            Ext.Viewport.setMasked({ xtype: 'loadmask' });
            contactTrackingStore.load({
                callback: function(records, operation, success) {
                    if (success && records.length) {
                        var contactDetailManagement = records[0];
                        record.set('details', contactDetailManagement);
                        Ext.Viewport.setMasked(false);
                        me.getView().fireEvent('requestchangeview','Personify.view.phone.contacttracking.ContactDetailPanel', {
                            record: contactDetailManagement,
                            currentContact: me.getCurrentContact(),
                            delegate: me,
                            staffList : me.getStaffList(),
                            callTopicList : me.getCallTopicList(),
                            callTypeList : me.getCallTypeList(),
                            callSubjectList : me.getCallSubjectList()
                        });
                    }
                },
                scope: me
            });
        }
    },
    
    onNewContactInquiry: function() {
        this.getView().fireEvent('requestchangeview','Personify.view.phone.contacttracking.InquiryPanel', {
            staffList : this.getStaffList(),
            callTopicList : this.getCallTopicList(),
            callTypeList : this.getCallTypeList(),
            callSubjectList : this.getCallSubjectList(),
            record: this.getCurrentContact(),
            delegate: this,
            request: 'new contact'
        })
    },
    refreshRecordAfterEditing: function(newValuesObject) {
        if(newValuesObject) {
            if(newValuesObject['subjectList']) {
                this.getView().config.callSubjectList = newValuesObject['subjectList'];
                this.setCallSubjectList(newValuesObject['subjectList']);
            }
        }
    }
});
