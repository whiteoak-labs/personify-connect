Ext.define('Personify.controller.tablet.directory.Directory', {
    extend: 'Personify.controller.directory.Directory',
    requires: [
        'Personify.view.profile.ContactListing',
        'Personify.view.profile.Relationship'
    ],
    
    config: {
        contactInfoData: null,
        purchasedHistoryData: null,
        participationData: null,
        relationshipData: null,
        selectedRecord: null,
        contactListingData: null,
        staffList: null,
        callTopicList: null,
        callSubjectList: null,
        callTypeList: null,
        selectedRecord: null,
        countryListStore: null,
      isBackEventAdded: false,
    },
    
    control: {
        directoryManagementPanel: {
            select: 'onSelectContactRow'
        },
        contactInfoManagementPanel: {
            live: true,
            listeners: {
                'updateContactFail': 'onUpdateContactFail',
                'updatedContact': 'onUpdatedContact',
                'editRecord' : 'onEditRecord',
                'hideStaffFunction': 'hideStaffFunction',
                'showStaffFunction': 'showStaffFunction'
            }
        },
        
        contactinfo: {
            
        },
        
        staffButtonsPanel: {
            
        },
        
        contactContainer: {
            
        },
        
        contactInformationStaffButton: {
            tap: 'onContactInformationStaffButtonTap'
        },
        
        contactPurchaseHistoryStaffButton: {
            tap: 'onContactPurchaseHistoryStaffButtonTap'
        },
        
        participationHistoryStaffButton: {
            tap: 'onParticipationHistoryStaffButtonTap'
        },
        
        relationshipStaffButton: {
            tap: 'onRelationshipStaffButtonTap'
        },
        
        contactListingStaffButton: {
            tap: 'onContactListingStaffButtonTap'
        },
        view: {
            painted: 'onPainted'
        },
    },
    init: function() {
        this.callParent(arguments);
        this.getContactInfoManagementPanel().setEditmode(false);
        this.getContactInfoManagementPanel().getController().addButtonAddToMyAddressBook(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('useAddToMyAddressBookButton'));
        this.getContactInfoManagementPanel().setCanedit(false);
        this.getContactInfoManagementPanel().getController().updateEnableEditToolBox(Personify.utils.Configuration.getCurrentUser().isStaffMember());
        this.getContactInfoManagementPanel().getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo'));
        this.getStaffButtonsPanel().setDisabled(true);
        
        this.toggleDisabledOfButton(true);
        this.getView().setMasked(false);
        
        var isStaff = Personify.utils.Configuration.getCurrentUser().isStaffMember();
        this.getStaffButtonsPanel().setHidden(!isStaff);
    },
    
    onPainted: function (){
        Ext.Viewport.setMasked(false);
    },
    
    resetCachedData: function(record) {
        if(this.getView()) {
            this.setSelectedRecord(record);
            this.setContactInfoData(null);
            this.setPurchasedHistoryData(null);
            this.setParticipationData(null);
            this.setRelationshipData(null);
        }
    },
    
    toggleDisabledOfButton: function(value) {
        this.getContactInformationStaffButton().setDisabled(value);
        this.getContactPurchaseHistoryStaffButton().setDisabled(value);
        this.getParticipationHistoryStaffButton().setDisabled(value);
        this.getRelationshipStaffButton().setDisabled(value);
        this.getContactListingStaffButton().setDisabled(value);
    },
    
    refreshSelectedButton: function(button) {
    },
    onSelectContactRow: function(item, index, target, record, e, eOpts) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        this.getView().setMasked({xtype:'loadmask'});
        if(record) {
            this.toggleDisabledOfButton(false);
            this.resetCachedData(record);
            var contactContainer = this.getContactContainer();
            var contactInfoManagement = contactContainer.getItems().items[0];
            
            if(contactInfoManagement.getItemId() !== 'contactInfoManagementPanel') {
                contactContainer.removeAll(true, true);
                contactInfoManagement = this.createContactInfoMangementPanel();
            }
            
            if(record.get('details')) {
                contactInfoManagement.setRecord(record.get('details'));
                this.getView().setMasked(false);
                //cache record to the specified button
                this.setContactInfoData(record.get('details'));
                this.toggleColorOfButtons(this.getContactInformationStaffButton());
            } else {
                //load contact data
                this.LoadContactInfo(record, contactInfoManagement);
            }
            
            
            this.getStaffButtonsPanel().setDisabled(false);
            contactContainer.add(contactInfoManagement);
        }
    },
    
    LoadContactInfo: function(record, contactInfoManagement) {
       Personify.utils.BackHandler.popActionAndTarget('onContactInformationStaffButtonTap', this);
       isBackEventAdded = false;
        this.callParent(arguments);
        this.toggleColorOfButtons(this.getContactInformationStaffButton());
    },
    
    onContactInformationStaffButtonTap: function(button) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
       Personify.utils.BackHandler.popActionAndTarget('backAction', this);
        isBackEventAdded = false;
        var contactContainer = this.getContactContainer();
        
        var contactInfoManagement = contactContainer.getItems().items[0];
        
        if(contactInfoManagement.getItemId() !== 'contactInfoManagementPanel') {
            contactContainer.removeAll(true, true);
            contactInfoManagement = this.createContactInfoMangementPanel();
            
            var dataCountryList = this.getCountryListStore();
            if(dataCountryList) {
                contactInfoManagement.setCountryListStore(dataCountryList);
                contactInfoManagement.setRecord(this.getContactInfoData());
            }
            contactContainer.add(contactInfoManagement);
            this.toggleColorOfButtons(button);
        }
    },
    
    onContactPurchaseHistoryStaffButtonTap: function(button) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
           if(isBackEventAdded == false)
               Personify.utils.BackHandler.pushActionAndTarget('onContactInformationStaffButtonTap', this);
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory Purchase History');
        }
        var contactInfoData = this.getContactInfoData();
        if(contactInfoData && contactInfoData.EntryProfile && contactInfoData.EntryProfile.getAt(0)) {
            var contactContainer = this.getContactContainer();
        
            contactContainer.removeAll(true, true);
            
            contactContainer.add(this.createPhotoAndRelatedPanel(contactInfoData));
            
            purchaseHistory = Ext.create('Personify.view.profile.PurchaseHistory', {
                itemId: 'purchasedHistoryPanel'
            });
            
            var selectedRecord = this.getSelectedRecord();
            this.setPurchasedHistoryData(purchaseHistory.getController().loadContactData(selectedRecord));
            contactContainer.add(purchaseHistory);
            this.toggleColorOfButtons(button);
        }
    },
    
    onParticipationHistoryStaffButtonTap: function(button) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
           if(isBackEventAdded == false)
           Personify.utils.BackHandler.pushActionAndTarget('onContactInformationStaffButtonTap', this);
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory Participation History');
        }
        var contactInfoData = this.getContactInfoData();
        if(contactInfoData && contactInfoData.EntryProfile && contactInfoData.EntryProfile.getAt(0)) {
            var contactContainer = this.getContactContainer();
        
            contactContainer.removeAll(true, true);
            
            contactContainer.add(this.createPhotoAndRelatedPanel(contactInfoData));
            
            participationHistory = Ext.create('Personify.view.profile.ParticipationHistory', {
                itemId: 'participartionHistoryPanel'
            });
            
            //load data for purchase history
            if(this.getParticipationData()) {
                participationHistory.getController().updateStore(this.getParticipationData());
            } else {
                var selectedRecord = this.getSelectedRecord();
                this.setParticipationData(participationHistory.getController().loadContactData(selectedRecord));
            }
            
            contactContainer.add(participationHistory);
            this.toggleColorOfButtons(button);
        }
    },
    
    onRelationshipStaffButtonTap: function(button) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
           if(isBackEventAdded == false)
           Personify.utils.BackHandler.pushActionAndTarget('onContactInformationStaffButtonTap', this);
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory Relationships');
        }
        var contactInfoData = this.getContactInfoData();
        if(contactInfoData && contactInfoData.EntryProfile && contactInfoData.EntryProfile.getAt(0)) {
            var contactContainer = this.getContactContainer();
            contactContainer.removeAll(true, true);
            
            contactContainer.add(this.createPhotoAndRelatedPanel(contactInfoData));
            
            relationship = Ext.create('Personify.view.profile.Relationship', {
                itemId: 'relationshipPanel'
            });
            //load data for purchase history
            if(this.getRelationshipData()) {
                relationship.getController().setLoadedStore(this.getRelationshipData());
            } else {
                var selectedRecord = this.getSelectedRecord();
                this.setRelationshipData(relationship.getController().loadContactData(contactInfoData.EntryProfile.getAt(0)));
            }
            
            contactContainer.add(relationship);
            this.toggleColorOfButtons(button);
        }
    },
    
    onContactListingStaffButtonTap: function(button) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
           if(isBackEventAdded == false)
           Personify.utils.BackHandler.pushActionAndTarget('onContactInformationStaffButtonTap', this);
        var contactInfoData = this.getContactInfoData();
        if(contactInfoData && contactInfoData.EntryProfile && contactInfoData.EntryProfile.getAt(0)) {
            var contactContainer = this.getContactContainer();
            contactContainer.removeAll(true, true);
            
            contactContainer.add(this.createPhotoAndRelatedPanel(contactInfoData));
            
            contactListing = Ext.create('Personify.view.profile.ContactListing', {
                itemId: 'contactListingPanel'
            });
            this.passDataToChildView(contactListing);
            
            //load data for purchase history
            if(this.getContactListingData()) {
                contactListing.getController().updateStore(this.getContactListingData());
            } else {
                var selectedRecord = this.getSelectedRecord();
                this.setContactListingData(contactListing.getController().loadContactData(selectedRecord));
            }
            
            contactContainer.add(contactListing);
            this.toggleColorOfButtons(button);
        }
    },
    
    createPhotoAndRelatedPanel: function(contactInfoData) {
        photoAndRelated = Ext.create('Personify.view.profile.contactinfo.PhotoAndRelated', {
            docked: 'top',
            style: 'background-color: white; margin-bottom: 10px;'
        });
        photoAndRelated.setRecord(contactInfoData);
        return photoAndRelated;
    },
    
    onUpdatedContact: function(updatedContact) {
        this.callParent(arguments);
        this.setContactInfoData(updatedContact);
    },
    
    createContactInfoMangementPanel: function() {
        var contactInfoManagement = Ext.create('Personify.view.profile.ContactInfoManagement', {
                    itemId: 'contactInfoManagementPanel'
                });
        contactInfoManagement.getController().addButtonAddToMyAddressBook(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('useAddToMyAddressBookButton'));
        contactInfoManagement.getController().updateEnableEditToolBox(Personify.utils.Configuration.getCurrentUser().isStaffMember());
        contactInfoManagement.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo'));
        this.passDataToChildView(contactInfoManagement);
        return contactInfoManagement;
    },
    
    toggleColorOfButtons: function(enableButton) {
        this.getContactInformationStaffButton().setCls('p-button-staffFunction');
        this.getContactInformationStaffButton().setDisabledCls('p-button-directory-disabled');
        this.getContactInformationStaffButton().setDisabled(false);
        this.getContactPurchaseHistoryStaffButton().setCls('p-button-staffFunction');
        this.getContactPurchaseHistoryStaffButton().setDisabledCls('p-button-directory-disabled');
        this.getContactPurchaseHistoryStaffButton().setDisabled(false);
        this.getParticipationHistoryStaffButton().setCls('p-button-staffFunction');
        this.getParticipationHistoryStaffButton().setDisabledCls('p-button-directory-disabled');
        this.getParticipationHistoryStaffButton().setDisabled(false);
        this.getRelationshipStaffButton().setCls('p-button-staffFunction');
        this.getRelationshipStaffButton().setDisabledCls('p-button-directory-disabled');
        this.getRelationshipStaffButton().setDisabled(false);
        this.getContactListingStaffButton().setCls('p-button-staffFunction');
        this.getContactListingStaffButton().setDisabledCls('p-button-directory-disabled');
        this.getContactListingStaffButton().setDisabled(false);
        
        enableButton.setCls('p-button-staffFunction-selected');
        enableButton.setDisabledCls('p-button-staffFunction-selected');
        enableButton.setDisabled(true);
    },

    hideStaffFunction: function() {
        this.getStaffButtonsPanel().hide();
    },

    showStaffFunction: function() {
        var isStaff = Personify.utils.Configuration.getCurrentUser().isStaffMember();
        if (isStaff) {
            this.getStaffButtonsPanel().show();
        }
    },
           
   backAction:function()
   {
       this.onContactInformationStaffButtonTap();
       this.toggleColorOfButtons(this.getContactInformationStaffButton());
   }
});
