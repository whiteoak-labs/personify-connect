Ext.define('Personify.controller.phone.directory.ContactInfoManagement', {
    extend: 'Personify.controller.profile.ContactInfoManagement',
    
    requires: [
        'Personify.view.phone.purchasehistory.PurchaseHistoryManagement',
        'Personify.view.phone.participationhistory.ParticipationHistoryManagement',
        'Personify.view.phone.relationship.RelationshipManagement',
        'Personify.view.phone.contacttracking.ContactTrackingManagement',
        'Personify.view.phone.directory.contactinfo.ContactInfoEditForm'
    ],
    
    inject: [
        'currentUser'
    ],
    config: {
        recordProfile: null,
        currentUser: null,
        directorySelectedRecord: null
    },
    
    control: {
        memberDetailToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onEditButtonTap'
        },
        contactinfo: {
            
        },
        staffButtonsPanel: {
            
        },
        purchaseHistoryButton: {
            tap: 'onPurchaseHistoryButtonTap'
        },
        participationHistoryButton: {
            tap: 'onParticipationHistoryButton'
        },
        relationshipButton: {
            tap: 'onRelationshipButtonTap'
        },
        contactTrackingButton: {
            tap: 'onContactTrackingButtonTap'
        },
        addToMyProfileButton: {
            live: true,
            listeners: {
                tap: 'onAddToMyProfileButtonTap'
            }
        },
        staffAddToMyAddressBook: {
        }
    },
    
    init: function() {
        var me = this;
        Ext.Viewport.setMasked({xtype: 'loadmask'});
        Ext.callback(function() {
                var config = me.getView().config;
                var record = config.record;
                var listOfInfo = config.listOfInfo;
                this.setListOfInfo(listOfInfo);
                var presenterRecord = config.presenterRecord;
                if(presenterRecord) {
                    this.setPresenterRecord(presenterRecord);
                    var bio = config.bio;
                    this.getContactinfo().getController().setBioInfo(bio);
                    this.updateEnableEditToolBox(false);
                    this.getMemberDetailToolbar().setTitle('Presenter Details');
                    this.getContactinfo().getController().updateContactInfoTitleClass('p-phone-presenter-contactinfotitle');
                } else {
                    var recordAttendee = config.recordAttendee;
                    this.updateEnableEditToolBox(false);
                    if(recordAttendee) {
                        this.setRecord(recordAttendee, true);
                    } else {
                        var staffList = config.staffList;
                        var callTopicList = config.callTopicList;
                        var callSubjectList = config.callSubjectList;
                        var callTypeList = config.callTypeList;
                        var countryListStore = config.countryListStore;
                        var directorySelectedRecord = config.directorySelectedItem;
                        if(directorySelectedRecord != null) {
                            this.getMemberDetailToolbar().setTitle('Contact Details');
                        }
                        this.setDirectorySelectedRecord(directorySelectedRecord);
                        this.getView().setStaffList(staffList);
                        this.getView().setCallTopicList(callTopicList);
                        this.getView().setCallSubjectList(callSubjectList);
                        this.getView().setCallTypeList(callTypeList);
                        this.getView().setCountryListStore(countryListStore);
                        var requestView = config.requestView;
                        if(requestView == 'directory') {
                            this.getStaffButtonsPanel().setHidden(!this.getCurrentUser().isStaffMember());
                            this.updateEnableEditToolBox(this.getCurrentUser().isStaffMember());
                        }

                        this.setRecord(record);
                    }
                    this.addButtonAddToMyAddressBook(config.addToMyAddressBookButton);
                }

            Ext.Viewport.setMasked(false);
        }, me, [], 1);
        
    },
    setCanedit: function() {
    },
    
    setListOfInfo: function(listOfInfo) {
        if(listOfInfo) {
            this.getContactinfo().getController().showListInfo(listOfInfo);
        }
    },
    
    onNavigationButtonTap: function() {
        this.getView().fireEvent('navigationButtonTap');
    },
    
    onPurchaseHistoryButtonTap: function() {
        this.getView().fireEvent('requestchangeview','Personify.view.phone.purchasehistory.PurchaseHistoryManagement', {record: this.getView().config.record});
    },
    
    onParticipationHistoryButton: function() {
        this.getView().fireEvent('requestchangeview','Personify.view.phone.participationhistory.ParticipationHistoryManagement', {record: this.getView().config.record});
    },
    
    onRelationshipButtonTap: function() {
        this.getView().fireEvent('requestchangeview','Personify.view.phone.relationship.RelationshipManagement', {record: this.getView().config.record});
    },
    
    onContactTrackingButtonTap: function() {
        this.getView().fireEvent('requestchangeview','Personify.view.phone.contacttracking.ContactTrackingManagement', {
            record: this.getView().config.record,
            staffList : this.getView().getStaffList(),
            callTopicList : this.getView().getCallTopicList(),
            callTypeList : this.getView().getCallTypeList(),
            callSubjectList : this.getView().getCallSubjectList()
        });
    },
    
    onEditButtonTap: function() {
        var me = this;
        Ext.Viewport.setMasked({xtype: 'loadmask'});
        Ext.callback(function() {
            me.getView().fireEvent('requestchangeview','Personify.view.phone.directory.contactinfo.ContactInfoEditForm', {
                record: me.getView().config.record,
                countryListStore: me.getView().getCountryListStore(),
                listOfInfo: me.getView().config.listOfInfo
            });
            Ext.Viewport.setMasked(false);
        }, me, [], 10);
    },
    
    updateEnableEditToolBox: function(value) {
        if(this.getView()) {
            this.getMemberDetailToolbar().getController().setHiddenActionButton(!value);
        }
    },
    
    resetToolbox: function() {
    },
    
    onBack: function() {
        var me = this;
        var thisView = me.getView();
        thisView.fireEvent('back',this);
    },
    
    addButtonAddToMyAddressBook: function(value) {
        if(value == true) {
            this.getStaffAddToMyAddressBook().add(Ext.create('Ext.Button', {
                text: 'Add to my address book',
                itemId: 'addToMyProfileButton',
                cls: 'p-phone-button-addToMyAddress'
            }));
        }
    },

    setPresenterRecord: function(record) {
        this.getContactinfo().getController().setPresenterRecord(record);
    },
    
    refreshRecordAfterEditing: function(onBackParams) {
        if(onBackParams['updatedContact']) {
            var record = onBackParams['updatedContact'];
            this.getView().config.record = record;
            this.setRecord(record);
        } else {
            this.LoadContactInfo(this.getDirectorySelectedRecord());
        }
    },
    
    LoadContactInfo: function(record) {
        var me = this;
        me.getView().setMasked({
            xtype: 'loadmask',
            message: 'Loading',
            indicator: true,
            centered: true,
            fullscreen: true
        });
        var params = {
            ReqMasterCustomerId: Personify.utils.Configuration.getCurrentUser().get('masterCustomerId'),
            ReqSubCustomerId: Personify.utils.Configuration.getCurrentUser().get('subCustomerId'),
            IsStaff: Personify.utils.Configuration.getCurrentUser().isStaffMember(),
            RecordType: record.get('type')
        };

        var masterCustomerId = record.get('masterCustomerId'),
            subCustomerId = record.get('subCustomerId');

        if (masterCustomerId != null && !(masterCustomerId === '')) {
            params['MasterCustomerId'] = masterCustomerId;
        }

        if (subCustomerId != null && !(subCustomerId === '')) {
            params['SubCustomerId'] = subCustomerId;
        } else {
            params['SubCustomerId'] = "0";
        }

        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var profileStoreName = storeManager.getProfileStore();
        var profileStore = Ext.create(profileStoreName, {
            dataRequest: params
        });

        profileStore.load({
            callback: function(records, operation, success) {
                if (success && records.length) {
                    var profile = records[0];
                    record['data']['details'] = profile;
                    me.getView().config.record = profile;
                    me.setRecord(profile);
                } else {

                }

                me.getView().setMasked(false);
            }
        });
    }
});
