Ext.define('Personify.controller.directory.Directory', {
    extend : 'Personify.base.Controller',
    inject: ['countryListStore'],
    
    config: {
        contactInfoData: null,
        purchasedHistoryData: null,
        participationData: null,
        relationshipData: null,
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        selectedRecord: null,
        countryListStore: null
    },
    control : {
        directoryManagementPanel: {
            select: 'onSelectContactRow'
        },
        contactInfoManagementPanel: {
            'updateContactFail': 'onUpdateContactFail',
            'updatedContact': 'onUpdatedContact',
            'editRecord': 'onEditRecord'
        },
        staffButtonsPanel: {
            
        },
        contactContainer: {
            
        },
        contactListingStaffButton: {
            
        }
    },

    
    
    init : function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory');
        }
        this.callParent(arguments);
        this.getDataCountryList();
    },
    
    // handler event for list directory
    onSelectContactRow : function(arg1, record, arg3, arg4) {
        this.getStaffButtonsPanel().setHidden(false);
        var contactInfo = this.getContactInfoManagementPanel();
        if(record.get('details')) {
            //load contact data
            this.LoadContactInfo(record, contactInfo);
        } else {
            var dataCountryList = this.getCountryListStore();
            if(dataCountryList) {
                contactInfo.setRecord(record.get('details'));
                contactInfo.setCountryListStore(dataCountryList);
            }
        }
    },
    
    LoadContactInfo: function(record, contactInfo) {
        //var contactInfo = this.getContactInfoManagementPanel();
        var me = this;
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
                    me.setContactInfoData(profile);
                    var dataCountryList = me.getCountryListStore();
                    contactInfo.setCountryListStore(dataCountryList);
                    contactInfo.setRecord(record.get('details'));
                } else {
                    Ext.Msg.alert('', 'Cannot get user profile.');
                }

                me.getView().setMasked(false);
            }
        });
            
    },
    
    onUpdateContactFail: function() {
        //refresh to the old data
        this.LoadContactInfo(this.getDirectoryManagementPanel().getController().getSelection(), this.getContactInfoManagementPanel());
    },
    
    onUpdatedContact: function(updatedContact) {
        this.getDirectoryManagementPanel().getController().updateContactDetails(updatedContact);
    },
    
    onEditRecord: function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory Edit Contact Detail');
        }
    },
    
    loadStaffStore: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
        var staffAttributes = {
            OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
            OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId')
        };
        
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var staffStoreName = storeManager.getStaffStore();
        var staffStore = Ext.create(staffStoreName);
        staffStore.setDataRequest(staffAttributes);
        staffStore.load();
        return staffStore;
    },
    
    loadCallTypeStore: function() {
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var callTypeStoreName = storeManager.getCallTypeStore();
        var callTypeStore = Ext.create(callTypeStoreName);
        callTypeStore.load();
        return callTypeStore;
    },
    
    loadCallTopicStore: function() {
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var callTopicStoreName = storeManager.getCallTopicStore();
        var callTopicStore = Ext.create(callTopicStoreName);
        callTopicStore.load();
        return callTopicStore;
    },
    
    passDataToChildView: function(childView) {
        childView.setStaffList(this.getStaffList());
        childView.setCallTopicList(this.getCallTopicList());
        childView.setCallSubjectList(this.getCallSubjectList());
        childView.setCallTypeList(this.getCallTypeList());
    },
    
    getDataCountryList: function() {
        var me = this;
        if(me.getView() && !me.getView().isDestroyed) {
            if (me.getCountryListStore().getCount() > 0) {
                me.loadStaffData(me);
            } else {
                me.loadContryList(me.loadStaffData);
            }
        }
    },

    loadStaffData: function(me) {
        var isStaff = Personify.utils.Configuration.getCurrentUser().isStaffMember();
        if(isStaff == true) {
            me.getView().setMasked({xtype:'loadmask'});
            var staffStore = me.loadStaffStore(),
                callTypeStore = me.loadCallTypeStore(),
                callTopicStore = me.loadCallTopicStore();

            if(staffStore) {
                me.setStaffList(staffStore);
            }

            if(callTypeStore) {
                me.setCallTypeList(callTypeStore);
            }

            if(callTopicStore) {
                me.setCallTopicList(callTopicStore);
            }

            me.getView().setMasked(false);
        }
    },

    loadContryList: function(callback) {
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var countryStoreName = storeManager.getCountryStore();
        var store = Ext.create(countryStoreName);
        var countryList = new Array();
        store.load({callback: function(records, operation, success) {
            var profileTypeStore = storeManager.getProfileTypeStore();
            var storeProfileType = Ext.create(profileTypeStore);
            for (var i = 0; i < records.length; i++) {
                var country = records[i];
                if ((country.get('countryCode') !== 'ALL') && (country.get('countryCode') !== '[ALL]')) {
                    countryList.push({text: country.get('countryDescription'), value: country.get('countryCode')});
                }
            }
            storeProfileType.setData(countryList);
            storeProfileType.sort('text', 'ASC');
            me.setCountryListStore(storeProfileType);
            if (typeof callback == 'function') {
                callback(me);
            }
            Deft.Injector.configure({
                countryListStore: {
                    value: storeProfileType
                }
            });
        }});
    }
});