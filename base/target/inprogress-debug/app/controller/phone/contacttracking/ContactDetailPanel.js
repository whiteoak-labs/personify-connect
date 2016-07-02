Ext.define('Personify.controller.phone.contacttracking.ContactDetailPanel', {
    extend: 'Personify.controller.profile.ContactDetailPanel',
    requires: [
        'Personify.view.phone.contacttracking.InquiryPanel'
    ],
    
    config: {
        delegate: null,
        callSubjectList: null,
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        currentContact: null
    },
    
    control: {
        contactTrackingDetailToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onEditTrackingDetailButtonTap'
        },
        followUpRecordsHeader: {},
        contactDetailView: {},
        followUpList: {
            itemtap: 'onFollowUpItemTap'
        },
        callTypeCodeText: {},
        activityText: {},
        topicText: {},
        subjectText: {},
        contactedText: {},
        ownerText: {},
        addFollowUpButton: {
            tap: 'onAddFollowUpButtonTap'
        }
    },
    
    init: function() {
        this.callParent(arguments);
        var config = this.getView().config;
        var record = config.record;
        var request = config.request;
        var delegate = config.delegate;
        var currentContact = config.currentContact;
        this.setCurrentContact(currentContact);
        this.setDelegate(delegate);
        if(request == 'view followup details') {
            this.setUIForViewFollowUpDetail();
        }
        
        var staffList = config.staffList;
        var callTopicList = config.callTopicList;
        var callSubjectList = config.callSubjectList;
        var callTypeList = config.callTypeList;
        
        this.setStaffList(staffList);
        this.setCallTopicList(callTopicList);
        this.setCallSubjectList(callSubjectList);
        this.setCallTypeList(callTypeList);
        this.setRecord(record);
    },
    
    onEditTrackingDetailButtonTap: function() {
        var me = this;
        var record;
        var trackingDetailRecord;
        var parentActivityId;
        if(this.getView().getCurrentContact()) {
            record = this.getView().getCurrentContact();
        }
        
        if(this.getView().getRecord() && this.getView().getRecord().ContactDetailStore) {
            trackingDetailRecord = this.getView().getRecord().ContactDetailStore.getAt(0);
        } else {
            trackingDetailRecord = this.getView().getRecord();
            parentActivityId = this.getView().getRecord().get('parentActivityId');
        }
        this.getView().fireEvent('requestchangeview','Personify.view.phone.contacttracking.InquiryPanel',
            {
                parentActivityId: parentActivityId,
                trackingDetailRecord: trackingDetailRecord,
                record: record,
                currentContact: me.getView().getCurrentContact(),
                delegate: this.getDelegate(),
                staffList : me.getStaffList(),
                callTopicList : me.getCallTopicList(),
                callTypeList : me.getCallTypeList(),
                callSubjectList : me.getCallSubjectList()
            });
    },
    
    onAddFollowUpButtonTap: function() {
        //pass record of this tracking detail to edit
        var parentActivityId;
        if(this.getView().getRecord()) {
            parentActivityId = this.getView().getRecord().ContactDetailStore.getAt(0).get('activityId');
        }
        var record;
        if(this.getView().getCurrentContact()) {
            record = this.getView().getCurrentContact();
        }
        this.getView().fireEvent('requestchangeview','Personify.view.phone.contacttracking.InquiryPanel',
            {
                parentActivityId: parentActivityId,
                trackingDetailRecord: null,
                record: record,
                currentContact: null,
                delegate: this.getDelegate(),
                staffList : this.getStaffList(),
                callTopicList : this.getCallTopicList(),
                callTypeList : this.getCallTypeList(),
                callSubjectList : this.getCallSubjectList()
            });
    },
    
    setRecord: function(recordManagement) {
        if(this.getView()) {
            if(recordManagement.ContactDetailStore) {
                var record = recordManagement.ContactDetailStore.getAt(0);
            } else {
                //setRecordFollowup
                var record = recordManagement;
            }
            var me = this;
            me.getActivityText().setHtml(record.get('activityText'));
            me.getTopicText().setHtml('<span class="p-phone-directory-contact-tracking-detail-title">Topic:</span>');
            me.getSubjectText().setHtml('<span class="p-phone-directory-contact-tracking-detail-title">Subject:</span>');
            me.getContactedText().setHtml('<span class="p-phone-directory-contact-tracking-detail-title">Contacted:</span><span class="p-phone-directory-contact-tracking-detail-info">' + record.get('personContacted') + '</span>');
            me.getOwnerText().setHtml('<span class="title">Owner:</span>');
            
            var staffStore = this.getStaffList();
            if(staffStore) {
                staffStore.each(function(staffRecord) {
                    if(staffRecord && staffRecord.get('staffId') == record.get('staffUserId')) {
                        me.getOwnerText().setHtml('<span class="p-phone-directory-contact-tracking-detail-title">Owner:</span><span class="p-phone-directory-contact-tracking-detail-info">' + staffRecord.get('staffName') + '</span>');
                    } 
                });
            }
            
            var callTypeStore = this.getCallTypeList();
            if(callTypeStore) {
                callTypeStore.each(function(callTypeRecord) {
                    if(callTypeRecord && callTypeRecord.get('code') == record.get('callTypeCode')) {
                        me.getCallTypeCodeText().setHtml(callTypeRecord.get('description'));
                    } 
                });
            }
            
            var topicCode;
            var callTopicStore = this.getCallTopicList();
            if(callTopicStore) {
                callTopicStore.each(function(callTopicRecord) {
                    if(callTopicRecord && callTopicRecord.get('code') == record.get('topic')) {
                        me.getTopicText().setHtml('<span class="p-phone-directory-contact-tracking-detail-title">Topic:</span><span class="p-phone-directory-contact-tracking-detail-info">' + callTopicRecord.get('description') + '</span>');
                        topicCode = record.get('topic');
                    } 
                });
            }
            
            if(topicCode) {
                var subjectDictionary = me.getCallSubjectList();
                var callSubjectStore;
                if(subjectDictionary[topicCode]) {
                    callSubjectStore = subjectDictionary[topicCode];
                    var subjectOptions = new Array();
                    subjectOptions.push({text: '', value: ''});
                    callSubjectStore.each(function(callSubjectRecord) {
                        if(callSubjectRecord && callSubjectRecord.get('subcode') == record.get('subject')) {
                            me.getSubjectText().setHtml('<span class="p-phone-directory-contact-tracking-detail-title">Subject:</span><span class="p-phone-directory-contact-tracking-detail-info">' + callSubjectRecord.get('description') + '</span>');
                        } 
                    });
                } else {
                    var me = this;
                    me.getView().setMasked({xtype: 'loadmask'});
                    var subjectOptions = new Array();
                    subjectOptions.push({text: '', value: ''});
                    
                    var storeManager = Personify.utils.ServiceManager.getStoreManager();
                    var callSubjectStoreName = storeManager.getCallSubjectStore();
                    var callSubjectStore = Ext.create(callSubjectStoreName);
                    var proxy = {
                        type : 'rest',
                        url: Personify.utils.ServiceManager.getUrlWS('utilCallSubject') + "?$filter=Subsystem eq 'MRM' and Type eq ('CALL_TOPIC') and Code eq ('" + topicCode +"')",
                        
                        headers: Personify.utils.ServiceManager.getHeaders(),
                       
                        reader: {
                            implicitIncludes: true,
                            type: 'json',
                            rootProperty: 'd'
                        }
                    };
                    callSubjectStore.setProxy(proxy);
                    
                    callSubjectStore.load({callback: function(records, operation, success) {
                        if (success) {
                            if(callSubjectStore) {
                                callSubjectStore.each(function(callSubjectRecord) {
                                    if(callSubjectRecord && callSubjectRecord.get('subcode') == record.get('subject')) {
                                        me.getSubjectText().setHtml('<span class="p-phone-directory-contact-tracking-detail-title">Subject:</span><span class="p-phone-directory-contact-tracking-detail-info">' + callSubjectRecord.get('description') + '</span>');
                                    } 
                                });
                            }
                            me.getCallSubjectList()[topicCode] = callSubjectStore;
                        }
                        me.getView().setMasked(false);
                    }});
                }
            }
            
            if(recordManagement.FollowupStore) {
                var followupStore = recordManagement.FollowupStore;
                followupStore.each(function(followupRecord) {
                    if(callTopicStore) {
                        callTopicStore.each(function(callTopicRecord) {
                            if(callTopicRecord && callTopicRecord.get('code') == followupRecord.get('topic')) {
                                followupRecord.set('topicString', callTopicRecord.get('description'));
                            } 
                        });
                    }
                });
                this.getFollowUpList().setStore(followupStore);
            }
        }
    },
    
    onFollowUpItemTap: function( list, index, target, record, e, eOpts ) {
        var me = this;
        this.getView().fireEvent('requestchangeview','Personify.view.phone.contacttracking.ContactDetailPanel',
            {
                record: record,
                currentContact: me.getView().getCurrentContact(),
                delegate: me.getDelegate(),
                staffList : me.getStaffList(),
                callTopicList : me.getCallTopicList(),
                callTypeList : me.getCallTypeList(),
                callSubjectList : me.getCallSubjectList(),
                request: 'view followup details'
            });
    },
    
    passDataToChildView: function(childView) {
        childView.setStaffList(this.getView().getStaffList());
        childView.setCallTopicList(this.getView().getCallTopicList());
        childView.setCallTypeList(this.getView().getCallTypeList());
        childView.setCallSubjectList(this.getView().getCallSubjectList());
    },
    
    setUIForViewFollowUpDetail: function() {
        this.getContactTrackingDetailToolbar().setTitle("Follow-up Detail");
        this.getAddFollowUpButton().setHidden(true);
        this.getFollowUpRecordsHeader().setHidden(true);
    },
    
    onBack: function() {
        var me = this;
        var thisView = me.getView();
        var onBackParams = {};
        onBackParams['subjectList'] = this.getCallSubjectList();
        thisView.fireEvent('back', me, onBackParams);
    },
    
    refreshRecordAfterEditing: function(newValuesObject) {
        if(newValuesObject) {
            if(newValuesObject['subjectList']) {
                this.getView().config.callSubjectList = newValuesObject['subjectList'];
                this.setCallSubjectList(newValuesObject['subjectList']);
            }
            if(newValuesObject['refresh'] == true) {
                if(newValuesObject['activityId']) {
                    //reload contact details
                    var currentUser = Personify.utils.Configuration.getCurrentUser();
                    var currentContactInfo = this.getCurrentContact();
                    if(currentContactInfo) {
                        var params = {
                            'MasterCustomerId': currentContactInfo.get('masterCustomerId'),
                            'SubCustomerId': currentContactInfo.get('subCustomerId'),
                            'StaffId': (currentUser.get('id') != null) ? currentUser.get('id') : '',
                            'ActivityId': newValuesObject['activityId']
                        };
                    }
                    var me = this;
                    var storeManager = Personify.utils.ServiceManager.getStoreManager();
                    var contactTrackingStoreName = storeManager.getProfileContactTrackingStore();
                    var contactTrackingStore = Ext.create(contactTrackingStoreName, {
                        dataRequest: params
                    });

                    contactTrackingStore.load({
                        callback: function(records, operation, success) {
                            if (success && records.length) {
                                var contactDetailManagement = records[0];
                                me.setRecord(contactDetailManagement);
                                me.getView().config.record = contactDetailManagement;
                            }
                        },
                        scope: me
                    });
                } else {
                    var recordManagement = this.getView().config.record;
                    if(recordManagement.ContactDetailStore) {
                        var record = recordManagement.ContactDetailStore.getAt(0);
                    } else {
                        //setRecordFollowup
                        var record = recordManagement;
                    }
                    record.set('activityText', newValuesObject['activityText']);
                    record.set('staffUserId', newValuesObject['assignTo']);
                    record.set('callTypeCode', newValuesObject['callType']);
                    record.set('topic', newValuesObject['topic']);
                    record.set('subject', newValuesObject['subject']);
                    this.setRecord(this.getView().config.record);
                }
            }
        }
    }
})