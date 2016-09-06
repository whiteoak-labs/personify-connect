Ext.define('Personify.controller.profile.InquiryPanel', {
    extend: 'Personify.base.Controller',
    
    control: {
        activityText: {},
        topicSelectField: {
            change: 'onTopicSelectFieldChange'
        },
        subjectSelectField: {},
        assignToSelectField: {},
        callTypeSelectField: {},
        buttonSubmit: {
            tap: 'onTapButtonSubmit'
        },
        addNewPanelHeaderText: {},
           view:
           {
               show:'onShow',
               hide:'onHide',
           }
    },
    
    config: {
        record: null,
        delegate: null,
        currentSubjectSelectField: null
    },
    
    onTapButtonSubmit: function() {
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
                    Ext.Msg.alert('Inquiry', 'Successfully.', Ext.emptyFn);
                    
                    if (me.getDelegate()) {
                        me.getDelegate().resetParams();
                        if(me.getView().getTrackingDetailRecord()) {
                            me.getDelegate().loadContactData(me.getView().getRecord(), true);
                            if(me.getView().getTrackingDetailRecord().get('parentActivityId') != me.getView().getTrackingDetailRecord().get('activityId') || me.getView().getParentActivityId() != null) {
                                me.getDelegate().onItemTap(null, null, null, null, null, null);
                            }
                        } else {
                            me.getDelegate().loadContactData(me.getRecord(), true);
                            if(me.getView().getParentActivityId()) {
                                me.getDelegate().onItemTap(null, null, null, null, null, null);
                            }
                        }
                    }
                } else {
                    Ext.Msg.alert('Inquiry', 'Failed.', Ext.emptyFn);
                }
                
                me.getView().hide();
            }});
        } else {
            Ext.Msg.alert('Inquiry', 'Please input activity text.', Ext.emptyFn);
        }
    },
    
    setOptionsForPickLists: function() {
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
        this.setCurrentSubjectSelectField(record.get('subject'));
        this.getActivityText().setValue(record.get('activityText'));
        this.getTopicSelectField().setValue(record.get('topic'));
        this.getAssignToSelectField().setValue(record.get('staffUserId'));
        this.getCallTypeSelectField().setValue(record.get('callTypeCode'));
    },
    
    loadCallSubjectStore: function(topicCode) {
        if(topicCode) {
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
                }
                me.getView().setMasked(false);
            }});
        }
    },
    
    onTopicSelectFieldChange: function(selectField, newValue, oldValue) {
        if(newValue) {
            var me = this;
            var subjectDictionary =  this.getView().config.callSubjectList;
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
            } else {
                this.loadCallSubjectStore(newValue);
            }
        }
    },
    
    setUIForEditTrackingDetail: function() {
        this.setHeaderText("Edit Tracking Detail");
        this.setSubmitButtonText("Save");
    },
    
    setUIForEditFollowUpRecord: function() {
        this.setHeaderText("Edit Follow-up Record");
        this.setSubmitButtonText("Save");
    },
    
   onHide: function() {
       Personify.utils.BackHandler.popActionAndTarget('hide', this.getView());
       this.getView().destroy();
   },
   
   onShow: function() {
       Personify.utils.BackHandler.pushActionAndTarget('hide', this.getView());
   },
});
