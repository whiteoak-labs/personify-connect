Ext.define('Personify.controller.phone.contacttracking.InquiryPanel', {
    extend: 'Personify.controller.profile.InquiryPanel',
    
    control: {
        activityText: {},
        topicSelectField: {
            change: 'onTopicSelectFieldChange'
        },
        subjectSelectField: {},
        assignToSelectField: {},
        callTypeSelectField: {},
        inquiryPanelToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onTapButtonSubmit'
        }
    },
    
    config: {
        record: null,
        delegate: null,
        currentSubjectSelectField: null,
        currentContact: null
    },
    
    init: function() {
        this.callParent(arguments);
        this.getInquiryPanelToolbar().getController().setActionText('Save');
        var config = this.getView().config;
        var record = config.record;
        var delegate = config.delegate;
        var parentActivityId = config.parentActivityId;
        var trackingDetailRecord = config.trackingDetailRecord;
        var currentContact = config.currentContact;
        
        this.setDelegate(delegate);
        
        var staffList = config.staffList;
        var callTopicList = config.callTopicList;
        var callSubjectList = config.callSubjectList;
        var callTypeList = config.callTypeList;
        
        this.getView().setStaffList(staffList);
        this.getView().setCallTopicList(callTopicList);
        this.getView().setCallSubjectList(callSubjectList);
        this.getView().setCallTypeList(callTypeList);
        this.setCurrentContact(currentContact);
        
        this.setOptionsForPickLists();
        
        if(trackingDetailRecord) {
            if(parentActivityId) {
                this.setUIForEditFollowUpRecord();
            } else {
                this.setUIForEditTrackingDetail();
            }
        } else {
            if(parentActivityId) {
                this.setUIForAddFollowUpRecord();
            }
        }
        this.setRecord(record);
        this.getView().setParentActivityId(parentActivityId);
        this.getView().setTrackingDetailRecord(trackingDetailRecord);
        this.setTrackingDetailToEdit(trackingDetailRecord);
    },
    
    onTapButtonSubmit: function() {
        this.getActivityText().blur();
        Ext.Viewport.setMasked({xtype: 'loadmask'});
        if (this.getActivityText().getValue() != "") {
            var record;
            if(this.getView().getTrackingDetailRecord()) {
                record = this.getView().getTrackingDetailRecord();
            } else {
                record = this.getRecord();
            }
            var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
            var me = this;
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var store = Ext.create(storeManager.getInquiryStore());
            var now = new Date();
            var activityDate = now.getMonth() + 1 + "/" + now.getDate() + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            var attributes = {
                "InternalKey": null,
                "NavigationKey": null,
                "MasterCustomerId": record.get('masterCustomerId'),
                "SubCustomerId": record.get('subCustomerId'),
                "ActivityId": (this.getView().getTrackingDetailRecord() != null) ? record.get('activityId') : 0,
                "ActivityDate": (this.getView().getTrackingDetailRecord() != null) ? record.get('activityDate') : activityDate,
                "ActivityText": this.getActivityText().getValue(),
                "CallTypeCode": this.getCallTypeSelectField().getValue(),
                "StaffUserId": this.getAssignToSelectField().getValue(),
                "PersonContacted": (this.getView().getTrackingDetailRecord()) ? record.get('personContacted') : record.get('preferredName'),
                "KeyCode": null,
                "MarketCode": null,
                "ListCode": null,
                "ResolvedFlag": null,
                "ResolvedDate": null,
                "Topic": this.getTopicSelectField().getValue(),
                "Subject": this.getSubjectSelectField().getValue(),
                "PrivateFlag": null,
                "OrgID": currentUser? currentUser.get('organizationId') : config.get('orgId'),
                "OrgUnitID": currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
                "ParentActivityId": this.getView().getParentActivityId(),
                "ContactDetail": null,
                "Followup": null
            };
            store.setDataRequest(attributes);
            store.load({callback: function(records, operation, success) {
                if (success) {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('Inquiry', 'Successfully.', Ext.emptyFn);
                    me.updateTrackingRecordFromView();

                    if (me.getDelegate()) {
                        me.getDelegate().resetParams();
                        if(me.getView().getTrackingDetailRecord()) {
                            me.getDelegate().loadContactData(me.getView().getRecord(), true);
                        } else {
                            me.getDelegate().loadContactData(me.getRecord(), true);
                        }
                        var view = me.getView();
                        if(view && view.destroy != Ext.emptyFn ) {
                            var onBackParams = {};
                           //if this view is for editing tracking details, refresh the list
                            if(me.getView().getTrackingDetailRecord()) {
                                onBackParams['topic'] = me.getTopicSelectField().getValue();
                                onBackParams['subject'] = me.getSubjectSelectField().getValue();
                                onBackParams['assignTo'] = me.getAssignToSelectField().getValue();
                                onBackParams['callType'] = me.getCallTypeSelectField().getValue();
                                onBackParams['activityText'] = me.getActivityText().getValue();
                                onBackParams['subjectList'] = me.getView().getCallSubjectList();
                                onBackParams['refresh'] = true;
                                me.onBack(onBackParams);
                            } else {
                                //If this view is for add new follow up
                                if(view.getParentActivityId() != null) {
                                    onBackParams['activityId'] = view.getParentActivityId();
                                    onBackParams['subjectList'] = me.getView().getCallSubjectList();
                                    onBackParams['refresh'] = true;
                                    me.onBack(onBackParams);
                                } else {
                                    onBackParams['subjectList'] = me.getView().getCallSubjectList();
                                    me.onBack(onBackParams);
                                }
                            }
                           
                            //if this view is for editing folow up
                           //if this view is for add new tracking details
                        }
                    }
                } else {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('Inquiry', 'Failed.', Ext.emptyFn);
                }
            }});
        } else {
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Inquiry', 'Please input activity text.', Ext.emptyFn);
        }
    },
    
    setOptionsForPickLists: function() {
        this.getView().setMasked({xtype: 'loadmask'});
        var topicStore = this.getView().getCallTopicList();
        var callTypeStore = this.getView().getCallTypeList();
        var staffStore = this.getView().getStaffList();
        
        if(topicStore) {
            var topicOptions = new Array();
            topicStore.each(function(topicRecord) {
                if(topicRecord != null){
                    topicOptions.push({text: topicRecord.get('description'), value: topicRecord.get('code')});
                }
            });
            this.getTopicSelectField().setOptions(topicOptions);
        }
        
        if(callTypeStore) {
            var callTypeOptions = new Array();
            callTypeStore.each(function(callTypeRecord) {
                if(callTypeRecord != null){
                    callTypeOptions.push({text: callTypeRecord.get('description'), value: callTypeRecord.get('code')});
                }
            });
            this.getCallTypeSelectField().setOptions(callTypeOptions);
        }
        
        if(staffStore) {
            var staffOptions = new Array();
            staffStore.each(function(staffRecord) {
                if(staffRecord != null){
                    staffOptions.push({text: staffRecord.get('staffName'), value: staffRecord.get('staffId')});
                }
            });
            this.getAssignToSelectField().setOptions(staffOptions);
        }
    },
    
    setHeaderText: function(value) {
        this.getAddNewPanelHeaderText().setHtml(value);
    },
    
    setSubmitButtonText: function(value) {
        this.getButtonSubmit().setText(value);
    },
    
    setTrackingDetailToEdit: function(record) {
        if(record) {
            var view = this.getView();
            if(view && view.destroy != Ext.emptyFn ) {
                this.callParent(arguments);
            }
        }
    },
    
    loadCallSubjectStore: function(topicCode) {
        if(topicCode) {
            var me = this;
            //me.getView().setMasked({xtype: 'loadmask'});
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
                    me.getView().getCallSubjectList()[topicCode] = callSubjectStore;
                    me.getView().config.callSubjectList[topicCode] = callSubjectStore;
                    callSubjectStore.each(function(subjectRecord) {
                        if(subjectRecord != null) {
                            subjectOptions.push({text: subjectRecord.get('description'), value: subjectRecord.get('subcode')});
                        }
                    });
                    if(me.getTopicSelectField().getValue() === topicCode) {
                        me.getSubjectSelectField().setOptions(subjectOptions);
                    }
                    if(me.getCurrentSubjectSelectField()) {
                        me.getSubjectSelectField().setValue(me.getCurrentSubjectSelectField());
                        me.setCurrentSubjectSelectField(null);
                    }
                    var trackingDetailRecord = me.getView().config.trackingDetailRecord;
                }
                me.getView().setMasked(false);
            }});
        }
    },
    
    onTopicSelectFieldChange: function(selectField, newValue, oldValue) {
        if(newValue) {
            var me = this;
            var subjectDictionary =  this.getView().getCallSubjectList();
            if(subjectDictionary[newValue]) {
                var subjectStore = subjectDictionary[newValue];
                var subjectOptions = new Array();
                subjectOptions.push({text: '', value: ''});
                subjectStore.each(function(subjectRecord) {
                    if(subjectRecord != null) {
                        subjectOptions.push({text: subjectRecord.get('description'), value: subjectRecord.get('subcode')});
                    }
                });
                me.getSubjectSelectField().setOptions(subjectOptions);
                if(me.getCurrentSubjectSelectField()) {
                    me.getSubjectSelectField().setValue(me.getCurrentSubjectSelectField());
                    me.setCurrentSubjectSelectField(null);
                }
                me.getView().setMasked(false);
            } else {
                this.loadCallSubjectStore(newValue);
            }
            var subjectStore = subjectDictionary[newValue];
        }
    },
    
    setUIForEditTrackingDetail: function() {
        this.getInquiryPanelToolbar().setTitle("Edit Tracking Detail");
        this.getInquiryPanelToolbar().getController().setActionText("Save");
    },
    
    setUIForEditFollowUpRecord: function() {
        this.getInquiryPanelToolbar().setTitle("Edit Follow-up Record");
        this.getInquiryPanelToolbar().getController().setActionText("Save");
    },
    
    setUIForAddFollowUpRecord: function() {
        this.getInquiryPanelToolbar().setTitle("Add Follow-up Record");
    },
    
    onBack: function(onBackParams) {
        var me = this;
        var thisView = me.getView();
        if(onBackParams) {
            onBackParams['subjectList'] = me.getView().getCallSubjectList();
        }
        thisView.fireEvent('back', me, onBackParams);
    },

    updateTrackingRecordFromView: function() {
        var trackingDetail = this.getView().getTrackingDetailRecord();

        if (trackingDetail) {
            trackingDetail.set('topicString', this.getTopicSelectField().getRecord().get('text'));
            trackingDetail.set('topic', this.getTopicSelectField().getValue());
            trackingDetail.set('subject', this.getSubjectSelectField().getValue());
            trackingDetail.set('assignTo', this.getAssignToSelectField().getValue());
            trackingDetail.set('callType', this.getCallTypeSelectField().getValue());
            trackingDetail.set('activityText', this.getActivityText().getValue());
        }
    }
});
