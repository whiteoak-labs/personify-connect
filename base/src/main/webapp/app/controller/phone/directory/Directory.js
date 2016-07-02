Ext.define('Personify.controller.phone.directory.Directory', {
    extend: 'Personify.controller.directory.Directory',
    
    requires: [
        'Personify.view.phone.directory.ContactInfoManagement',
        'Personify.view.phone.directory.DirectoryManagement'
    ],
    
    inject: [
        'personify',
        'currentUser',
        'countryListStore'
    ],
    config: {
        personify: null,
        currentUser: null,
        params: null,
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        selectedRecord: null,
        countryListStore: null,
        flagNeedLoad: null
    },
    control: {
        directoryNavigationView: {
        },

        directoryManagementPanel: {
            listeners: {
                loadedSelectedContactInfo: 'onLoadedSelectedContactInfo',
                select: 'onSelectContactRow',
                back: 'onBack'
            }
        }
    },
    
    init: function() {
        this.callParent(arguments);
        this.getDataCountryList();
    },

    onLoadData: function() {
        this.getDirectoryManagementPanel().getController().onGetData();
    },
    
    onLoadedSelectedContactInfo: function(record) {
    },
    
    onNavigationButtonTapDirectory: function() {
    },
    
    onNavigationButtonTapContactInfo: function() {
        this.getView().setActiveItem(0);
    },
    
    onLoadedSelectedContactInfo: function(record) {
        this.getView().fireEvent('loadedSelectedContactInfo', record);
    },
    
    onBack: function() {
        var me = this;
        var thisView = me.getView();
        thisView.fireEvent('back',this);
    },
    
    onSelectContactRow: function(item, index, target, record, e, eOpts) {
        if(!record.get('details')) {
            //load contact data
            this.LoadContactInfo(record);
        } else {
            this.openView('Personify.view.phone.directory.ContactInfoManagement',
                {
                    directorySelectedItem: record,
                    record: record.get('details'), 
                    listOfInfo: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo'),
                    requestView: 'directory', addToMyAddressBookButton: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('useAddToMyAddressBookButton'),
                    staffList: this.getStaffList(),
                    callTopicList: this.getCallTopicList(),
                    callSubjectList: this.getCallSubjectList(),
                    callTypeList: this.getCallTypeList(),
                    countryListStore: this.getCountryListStore()
                }); 
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
        var profileStore = Ext.create(profileStoreName);
        profileStore.setDataRequest(params);

        profileStore.load({
            callback: function(records, operation, success) {
                if (success && records.length) {
                    var profile = records[0];
                    record['data']['details'] = profile;
                    me.openView('Personify.view.phone.directory.ContactInfoManagement', {
                        directorySelectedItem: record,
                        record: record.get('details'),
                        listOfInfo: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo'),
                        requestView: 'directory',  addToMyAddressBookButton: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('useAddToMyAddressBookButton'),
                        staffList: me.getStaffList(),
                        callTopicList: me.getCallTopicList(),
                        callSubjectList: me.getCallSubjectList(),
                        callTypeList: me.getCallTypeList(),
                        countryListStore: me.getCountryListStore()
                    });
                }

                me.getView().setMasked(false);
            }
        });
    },
    
    onRequestChangeView:function(view, config) {
        this.openView(view,config);
    },
    openView: function(view, config, title, css) {
        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }
        view.addListener('back', this.onBackDirectory, this);
        view.addListener('backtomain', this.onBackToDirectory, this);
        view.addListener('requestchangeview', this.onRequestChangeView, this);
        
        if (config && config.record) {
            var listeners = config.record.get('listeners');
            
            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }
        
        var directoryNavigationView = this.getDirectoryNavigationView();
        if ((directoryNavigationView.getActiveItem().xtype != view.xtype) || ( directoryNavigationView.getActiveItem().xtype == view.xtype && directoryNavigationView.getActiveItem().config.request != view.config.request) ) {
            directoryNavigationView.push(view);
        }
    },
    onBackDirectory: function(arg1, newInfoObject) {
        var me = this,
            directoryNavigationView = me.getDirectoryNavigationView();
        if(newInfoObject) {
            var activeView = directoryNavigationView.pop();
            activeView.getController().refreshRecordAfterEditing(newInfoObject);

            if (activeView.getController()['setFlagNeedLoad']) {
                if (me.getFlagNeedLoad()) {
                    activeView.getController().setFlagNeedLoad(true);
                    me.setFlagNeedLoad(null);
                } else {
                    activeView.getController().setFlagNeedLoad(null);
                }
            } else {
                me.setFlagNeedLoad(true);
            }
        } else {
            directoryNavigationView.pop();
            me.setFlagNeedLoad(null);
        }
    },
    
    getDataCountryList: function() {
        this.callParent(arguments);
        var me = this;
        if (me.getView() && !me.getView().isDestroyed) {
            if (me.getCountryListStore().getCount() == 0) {
                me.loadContryList();
            }
        }
    },

    loadContryList: function() {
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
            Deft.Injector.configure({
                countryListStore: {
                    value: storeProfileType
                }
            });
        }});
    }
});