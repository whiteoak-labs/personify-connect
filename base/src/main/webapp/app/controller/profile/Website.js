Ext.define('Personify.controller.profile.Website', {
    extend:'Personify.controller.profile.template.InfoTemplate',

    requires: [
        'Personify.view.profile.contactinfo.website.WebsiteList',
        'Personify.view.profile.contactinfo.WebsiteEditForm'
    ],

    config: {
        typeList: null,
        typeListToRemove: null,
        recordsForDelete: new Array(),
        errorMessage: '\n- Wrong website format:',
        blankErrorMessage: '- Website field cannot be empty',
        canAddMoreFlag: null
    },

    control: {
        infoContainer: {
            typelistchange: 'onTypeListChange',
            textboxchange: 'onTextboxChange',
            deleteCommand: 'onDeleteCommand'
        }
    },

    updateEditMode: function(value) {
        this.callParent(arguments);
        
        me = this;
        this.getInfoContainer().removeAll(true, true);
        
        if(value == true) {
            this.getView().setHidden(false);
            var typeListToRemove = new Array();
            //var recordCopy = this.getView().getRecord().copy();
            var recordCopy = this.getView().getRecord();
            
            //Get the type list and store to global paramemeter
            this.setTypeList(recordCopy.get('urlLocationList').split(','));
            
            //create list of edit form and add to edit panel
            var storeWebsiteList = recordCopy.EntryProfile.getAt(0).UrlsProfile;
            storeWebsiteList.each(function(record) {
                var websiteEditForm = Ext.create('Personify.view.profile.contactinfo.WebsiteEditForm');
                websiteEditForm.getController().setTypeList(me.getTypeList());
                websiteEditForm.setRecord(record);
                me.getInfoContainer().add(websiteEditForm);
                
                typeListToRemove.push(record.get('type'));
            });
            this.setTypeListToRemove(typeListToRemove);
            
            this.addEmptyItem();
            this.updateTypeListForAllEditItems();
            
        }
        else {
            this.setRecord(this.getView().getRecord());
        }
    },
    
    onTextboxChange: function(view, record, primaryCheckBox, valueTextBox, typeList) {
        var editPanel = this.getInfoContainer();
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var profileUrlsModel = modelManager.getProfileUrlsModel();
        var newRecord = new Ext.create(profileUrlsModel, {
            primary: primaryCheckBox,
            value: valueTextBox,
            type: typeList
        });
        if(!record) {
            view.setRecord(newRecord);
            this.addEmptyItem();
            this.updateTypeListForAllEditItems();
        }
    },
    
    onDeleteCommand: function(record, ItemToDelete) {
        if(record.get('urlId') != "") {
            this.getRecordsForDelete().push(record);
        }
        Ext.Array.remove(this.getTypeListToRemove(), record.get('type'));
        this.updateTypeListForAllEditItems();
        
        this.getInfoContainer().remove(ItemToDelete, true);
        var infoContainerItems = this.getInfoContainer().getInnerItems();
        var lastEditItem = infoContainerItems[infoContainerItems.length - 1];

        if (lastEditItem.getRecord() && !lastEditItem.getRecord().get('primary')) {
            this.addEmptyItem();
        }
    },
    
    onTypeListChange: function(currentEditItem, newType, oldType) {
        this.callParent(arguments);
        
        if(currentEditItem.getRecord()) {
            //copy and add current record to recordsForDelete
            if(currentEditItem.getRecord().get('urlId') != "") {
                this.getRecordsForDelete().push(currentEditItem.getRecord().copy());
            }
            currentEditItem.getRecord().set('urlId', '');
        }
    },
    
    addEmptyItem: function(){
        var typeListForNewItem = this.checkTypeList();
        
        if(typeListForNewItem.length == 0) {
            this.setCanAddMoreFlag(false);
            return;
        } else {
            this.setCanAddMoreFlag(true);
        }
        
        var editPanel = this.getInfoContainer();
        var typeListForNewItem = Ext.Array.difference(this.getTypeList(), this.getTypeListToRemove());
        
        var itemViewEmpty = Ext.create('Personify.view.profile.contactinfo.WebsiteEditForm');
        itemViewEmpty.getController().setTypeList(typeListForNewItem);
        
        this.getTypeListToRemove().push(typeListForNewItem[0]);
        editPanel.add(itemViewEmpty);
    },

    setRecord: function(record) {
        if(record) {
            if(record.EntryProfile.getAt(0).UrlsProfile.getCount() > 0) {
                this.getInfoContainer().removeAll(true, true);
                var websiteList = Ext.create('Personify.view.profile.contactinfo.website.WebsiteList', {
                    scrollable: null,
                    docked: 'top',
                    disableSelection: true,
                    style: 'margin-left: 50px;'
                });
                websiteList.setStore(record.EntryProfile.getAt(0).UrlsProfile);
                this.getInfoContainer().add(websiteList);
                this.getView().setHidden(false);
            } else {
                this.getView().setHidden(true);
            }
        }
    },

    setPresenterRecord: function(presenter) {
        this.getInfoContainer().removeAll(true, true);
        if(presenter && presenter.get('url') && presenter.get('url') != '') {
            this.callParent(arguments);
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var websiteStoreName = storeManager.getProfileUrlsStore();
            var websiteStore = Ext.create(websiteStoreName);
            
            var modelManager = Personify.utils.ServiceManager.getModelManager();
            websiteModelString = modelManager.getProfileUrlsModel();
            websiteModel = Ext.ModelManager.getModel(websiteModelString);
            
            websiteStore.add(websiteModel);
            websiteStore.getAt(0).set('type', '');
            websiteStore.getAt(0).set('value', presenter.get('url'));
            
            var websiteList = Ext.create('Personify.view.profile.contactinfo.website.WebsiteList', {
                scrollable: null,
                disableSelection: true
            });
            
            websiteList.setStore(websiteStore);
            
            this.getInfoContainer().add(websiteList);
        }
    },
    
    updateParams: function(params) {
        this.updateAllRecordsForEditItems();
        
        var recordsToSend = [];
        var recordsAdded = [];
        var recordsToRemove = this.getRecordsForDelete();
        var editItems = this.getInfoContainer().getItems().items;
        
        var canAddMoreFlag = this.getCanAddMoreFlag();
        var numberOfEditItems = (canAddMoreFlag == false) ? editItems.length :  editItems.length - 1;
        
        for (var i = 0; i < numberOfEditItems; i++) {
            var record = editItems[i].getRecord();
            recordsToSend.push(record);
            // if this id existed in array RecordsToRemove, remove the record from RecordsToRemove
            Ext.Array.each(recordsToRemove, function(recordToRemove, index, recordsToRemove) {
                if (recordToRemove.get('urlId').toUpperCase() === record.get('urlId').toUpperCase()) {
                    recordsAdded.push(recordToRemove);
                }
            });
        }

        recordsToRemove = Ext.Array.difference(recordsToRemove, recordsAdded);
        Ext.Array.each(recordsToRemove, function(recordToRemove, index, recordsToRemove) {
            recordToRemove.set('markForDelete', true)
        });

        recordsToSend = recordsToSend.concat(recordsToRemove);
        urlsParams = this.getParameterList(recordsToSend);

        if (urlsParams) {
            params['Urls'] = urlsParams;
        }
    },
    
    getParameterList: function(recordsToSend) {
        var urls = new Array();
        for (var i=0;i<recordsToSend.length;i++)
        {
            var url = {
                "InternalKey": recordsToSend[i].get('internalKey'),
                "NavigationKey": recordsToSend[i].get('navigationKey'),
                "Id": recordsToSend[i].get('urlId'),
                "Value": recordsToSend[i].get('value'),
                "Type": recordsToSend[i].get('type'),
                "Primary": recordsToSend[i].get('primary'),
                "MarkForDelete": (recordsToSend[i].get('markForDelete') == null) ? false : recordsToSend[i].get('markForDelete'),
                "ProfileEmails": recordsToSend[i].get('profileEmails'),
                "ProfileRoles": recordsToSend[i].get('profileRoles'),
                "Urls": null, //TODO
                "Emails": recordsToSend[i].get('emails'),
                "Roles": recordsToSend[i].get('roles')
            }
            urls[i] = url;
        }
        return urls;
    }
});