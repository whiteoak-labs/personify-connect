Ext.define('Personify.controller.profile.ContactDetailPanel', {
    extend: 'Personify.base.Controller',
    requires: [
        'Personify.view.profile.contactlisting.InquiryPanel'
    ],
    
    config: {
        delegate: null,
        callSubjectList: null
    },
    
    control: {
        detailPanelHeaderText: {},
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
        editTrackingDetailButton: {
            tap: 'onEditTrackingDetailButtonTap'
        },
        addFollowUpButton: {
            tap: 'onAddFollowUpButtonTap'
        },
        view: {
            hide: 'onHide'
        }
    },
    
    onEditTrackingDetailButtonTap: function() {
        var panel = Ext.create('Personify.view.profile.contactlisting.InquiryPanel');
        this.passDataToChildView(panel);
        panel.getController().setOptionsForPickLists();
        panel.getController().setDelegate(this.getDelegate());
        if(this.getView().getCurrentContact()) {
            panel.setRecord(this.getView().getCurrentContact());
        }
        //pass record of this tracking detail to edit
        if(this.getView().getRecord() && this.getView().getRecord().ContactDetailStore) {
            panel.setTrackingDetailRecord(this.getView().getRecord().ContactDetailStore.getAt(0));
            panel.getController().setUIForEditTrackingDetail();
        } else {
            panel.setTrackingDetailRecord(this.getView().getRecord());
            panel.setParentActivityId(this.getView().getRecord().get('parentActivityId'));
            panel.getController().setUIForEditFollowUpRecord();
        }
        this.getView().destroy();
        Ext.Viewport.add(panel);
        panel.show();
    },
    
    onAddFollowUpButtonTap: function() {
        var panel = Ext.create('Personify.view.profile.contactlisting.InquiryPanel');
        this.passDataToChildView(panel);
        panel.getController().setOptionsForPickLists();
        panel.getController().setDelegate(this.getDelegate());
        panel.getController().setHeaderText("Add Follow-up record");
        panel.getController().setSubmitButtonText("Create");
        
        //pass record of this tracking detail to edit
        if(this.getView().getRecord()) {
            panel.setParentActivityId(this.getView().getRecord().ContactDetailStore.getAt(0).get('activityId'));
        }
        
        if(this.getView().getCurrentContact()) {
            panel.getController().setRecord(this.getView().getCurrentContact());
        }
        this.getView().destroy();
        Ext.Viewport.add(panel);
        panel.show();
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
            me.getTopicText().setHtml('<span class="p-text-trackingDetail-label">Topic:</span>');
            me.getSubjectText().setHtml('<span class="p-text-trackingDetail-label">Subject:</span>');
            me.getContactedText().setHtml('<span class="p-text-trackingDetail-label">Contacted:</span><span class="p-text-trackingDetail-value">' + record.get('personContacted') + '</span>');
            me.getOwnerText().setHtml('<span class="p-text-trackingDetail-label">Owner:</span>');
            
            var staffStore = this.getView().getStaffList();
            if(staffStore) {
                staffStore.each(function(staffRecord) {
                    if(staffRecord && staffRecord.get('staffId') == record.get('staffUserId')) {
                        me.getOwnerText().setHtml('<span class="p-text-trackingDetail-label">Owner:</span><span class="p-text-trackingDetail-value">' + staffRecord.get('staffName') + '</span>');
                    } 
                });
            }
            
            var callTypeStore = this.getView().getCallTypeList();
            if(callTypeStore) {
                callTypeStore.each(function(callTypeRecord) {
                    if(callTypeRecord && callTypeRecord.get('code') == record.get('callTypeCode')) {
                        me.getCallTypeCodeText().setHtml(callTypeRecord.get('description'));
                    } 
                });
            }
            
            var topicCode;
            var callTopicStore = this.getView().getCallTopicList();
            if(callTopicStore) {
                callTopicStore.each(function(callTopicRecord) {
                    if(callTopicRecord && callTopicRecord.get('code') == record.get('topic')) {
                        me.getTopicText().setHtml('<span class="p-text-trackingDetail-label">Topic:</span><span class="p-text-trackingDetail-value">' + callTopicRecord.get('description') + '</span>');
                        topicCode = record.get('topic');
                    } 
                });
            }
            
            if(topicCode) {
                var subjectDictionary = me.getView().config.callSubjectList;
                var callSubjectStore;
                if(subjectDictionary[topicCode]) {
                    callSubjectStore = subjectDictionary[topicCode];
                    var subjectOptions = new Array();
                    subjectOptions.push({text: '', value: ''});
                    callSubjectStore.each(function(callSubjectRecord) {
                        if(callSubjectRecord && callSubjectRecord.get('subcode') == record.get('subject')) {
                            me.getSubjectText().setHtml('<span class="p-text-trackingDetail-label">Subject:</span><span class="p-text-trackingDetail-value">' + callSubjectRecord.get('description') + '</span>');
                        } 
                    });
                } else {
                    var me = this;
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
                                        me.getSubjectText().setHtml('<span class="p-text-trackingDetail-label">Subject:</span><span class="p-text-trackingDetail-value">' + callSubjectRecord.get('description') + '</span>');
                                    } 
                                });
                            }
                            me.getView().config.callSubjectList[topicCode] = callSubjectStore;
                        }
                        Ext.Viewport.setMasked(false);
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
        var panel = Ext.create('Personify.view.profile.contactlisting.ContactDetailPanel');
        panel.getController().setUIForViewFolloupDetail();
        panel.getController().setDelegate(me.getDelegate());
        me.passDataToChildView(panel);
        if(record) {
            panel.setRecord(record);
        }
        panel.setCurrentContact(me.getView().getCurrentContact());
        this.getView().destroy();
        Ext.Viewport.add(panel);
        panel.show();
    },
    
    passDataToChildView: function(childView) {
        childView.setStaffList(this.getView().getStaffList());
        childView.setCallTopicList(this.getView().getCallTopicList());
        childView.setCallTypeList(this.getView().getCallTypeList());
        childView.setCallSubjectList(this.getView().getCallSubjectList());
    },
    
    setUIForViewFolloupDetail: function() {
        this.getDetailPanelHeaderText().setHtml("Follow-up Record's Detail");
        this.getAddFollowUpButton().setHidden(true);
        this.getEditTrackingDetailButton().setText("Edit Follow-up Record");
        this.getFollowUpRecordsHeader().setHidden(true);
    },

    onHide: function() {
        this.getView().destroy();
    }
})