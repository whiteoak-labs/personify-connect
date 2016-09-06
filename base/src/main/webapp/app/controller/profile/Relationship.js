Ext.define('Personify.controller.profile.Relationship', {
    extend: 'Personify.base.Controller',
    
    config: {
        params: null,
        currentContact: null,
        totalRelationshipResult: 0
    },
    
    control: {
        relationshipList: {
            scrollend: 'onNextButtonTap'
        }
    },
    
    init: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore;
        var params = {
            MasterCustomerId: '',
            SubCustomerId: '',
            StartIndex: 1,
            ItemsPerPage: config.get('itemPerPage'),
            OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
            OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId')
        };
        this.setParams(params);
    },
    
    loadContactData: function(record) {
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
        var me = this;
        me.setCurrentContact(record);
        var params = me.getParams();
        
        params['MasterCustomerId'] = record.get('masterCustomerId');
        params['SubCustomerId'] = record.get('subCustomerId');
        params['OrgId'] = (record.get('organizationId') != null) ? record.get('organizationId') : config.get('orgId');
        params['OrgUnitId'] = (record.get('organizationUnitId') != null) ? record.get('organizationUnitId') : config.get('orgUnitId');
        
        me.getView().setMasked({xtype:'loadmask'});
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var relationshipStoreName = storeManager.getProfileRelationshipStore();
        var relationshipStore = Ext.create(relationshipStoreName, {
            dataRequest: params
        });

        relationshipStore.load({
            callback: function(records, operation, success) {
                if (success && records.length && !me.getView().isDestroyed) {
                    var relationshipManagement = records[0];
                    var currentStore = me.getRelationshipList().getStore();

                    if (currentStore) {
                        relationshipManagement.RelationshipStore.each(function(relationshipRecord) {
                            currentStore.add(relationshipRecord);
                        });
                        me.getRelationshipList().setStore(currentStore);
                    } else {
                        me.getRelationshipList().setStore(relationshipManagement.RelationshipStore);
                        currentStore = relationshipManagement.RelationshipStore;
                    }

                    if (relationshipManagement) {
                        me.setTotalRelationshipResult(relationshipManagement.get('totalResults'));
                    }
                    me.getView().setMasked(false);
                }
            },
            scope: me
        });

    },
    
    onNextButtonTap: function() {
        var currentContact = this.getCurrentContact();
        var relationshipStore = this.getRelationshipList().getStore();
        var currentRelationshipItem = 0;

        if (relationshipStore) {
            currentRelationshipItem = relationshipStore.getCount();
        }
        
        if (currentContact && currentRelationshipItem < this.getTotalRelationshipResult()) {
            this.getParams()['StartIndex'] = this.getParams()['StartIndex'] + (Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'));
            this.loadContactData(currentContact);
        }
    },
    
    setLoadedStore: function(record) {
        this.getRelationshipList().setStore(record.RelationshipStore);
        this.getRelationshipPagingPanel().getController().setPagingNavigationPanel(record.get('startIndex'), record.get('totalResults'), Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'));
        this.getRelationshipPagingPanel().setHidden(record.RelationshipStore.getCount() == 0);
    }
})