Ext.define('Personify.controller.profile.Email', {
    extend: 'Personify.controller.profile.template.InfoTemplate',

    requires: [
        'Personify.view.profile.contactinfo.email.EmailList',
        'Personify.view.profile.contactinfo.EmailEditForm'
    ],

    config: {
        typeList: null,
        typeListToRemove: null,
        recordsForDelete: new Array(),
        errorMessage: '\n- Wrong email format:',
        blankErrorMessage: '- Email field cannot be empty',
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
            this.setTypeList(recordCopy.get('emailLocationList').split(','));
            
            var storeEmailList = recordCopy.EntryProfile.getAt(0).EmailsProfile;
            storeEmailList.each(function(record) {
                var emailEditForm = Ext.create('Personify.view.profile.contactinfo.EmailEditForm');
                emailEditForm.getController().setTypeList(me.getTypeList());
                emailEditForm.setRecord(record);
                me.getInfoContainer().add(emailEditForm);
                //var itemDesc = Personify.utils.ItemUtil.getDesc(me.getTypeList(),record.get('type'));
                typeListToRemove.push(record.get('type').toUpperCase()+':'+record.get('typeDesc'));
                                
            });
            me.setTypeListToRemove(typeListToRemove);
            me.addEmptyItem();
            me.updateTypeListForAllEditItems();
        }
        else {
            me.setRecord(me.getView().getRecord());
        }
    },
    
    onTextboxChange: function(view, record, primaryCheckBox, valueTextBox, typeList){
        var editPanel = this.getInfoContainer();
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var profileEmailsModel = modelManager.getProfileEmailsModel();
        var newRecord = new Ext.create(profileEmailsModel, {
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
        if(record.get('emailsId') != "") {
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
            if(currentEditItem.getRecord().get('emailsId') != "") {
                this.getRecordsForDelete().push(currentEditItem.getRecord().copy());
            }
            currentEditItem.getRecord().set('emailsId', "");
        }
    },
    
    addEmptyItem: function() {
        var typeListForNewItem = this.checkTypeList();
        
        if(typeListForNewItem.length == 0) {
            this.setCanAddMoreFlag(false);
            return;
        } else {
            this.setCanAddMoreFlag(true);
        }
        
        var editPanel = this.getInfoContainer();
        var typeListForNewItem = Ext.Array.difference(this.getTypeList(), this.getTypeListToRemove());
        
        var itemViewEmpty = Ext.create('Personify.view.profile.contactinfo.EmailEditForm');
        itemViewEmpty.getController().setTypeList(typeListForNewItem);
        
           //var itemDesc = Personify.utils.ItemUtil.getDesc(this.getTypeList(),typeListForNewItem[0]);
           //this.getTypeListToRemove().push(typeListForNewItem[0].toUpperCase()+':'+itemDesc);
           this.getTypeListToRemove().push(typeListForNewItem[0]);
           
        this.getTypeListToRemove().push(typeListForNewItem[0]);
        editPanel.add(itemViewEmpty);
    },

    setRecord: function(record) {
        if(record) {
            if(record.EntryProfile.getAt(0).EmailsProfile.getCount() > 0) {
                this.getInfoContainer().removeAll(true, true);
                var emailList = Ext.create('Personify.view.profile.contactinfo.email.EmailList', {
                    scrollable: null,
                    docked: 'top',
                    disableSelection: true,
                    style: 'margin-left: 50px;'
                });
                emailList.setStore(record.EntryProfile.getAt(0).EmailsProfile);
                this.getInfoContainer().add(emailList);
                this.getView().setHidden(false);
            } else {
                this.getView().setHidden(true);
            }
        }
    },

    setPresenterRecord: function(presenter) {
        this.getInfoContainer().removeAll(true, true);
        if(presenter && presenter.get('emailAddress') && presenter.get('emailAddress') != '') {
            this.callParent(arguments);
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var emailStoreName = storeManager.getProfileEmailsStore();
            var emailStore = Ext.create(emailStoreName);
            
            var modelManager = Personify.utils.ServiceManager.getModelManager();
            emailModelString = modelManager.getProfileEmailsModel();
            emailModel = Ext.ModelManager.getModel(emailModelString);
            
            emailStore.add(emailModel);
            emailStore.getAt(0).set('type', '');
            emailStore.getAt(0).set('value', presenter.get('emailAddress'));
            
            var emailList = Ext.create('Personify.view.profile.contactinfo.email.EmailList', {
                scrollable: null,
                disableSelection: true
            });
            
            emailList.setStore(emailStore);
            
            this.getInfoContainer().add(emailList);
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
                if (recordToRemove.get('emailsId').toUpperCase() === record.get('emailsId').toUpperCase()) {
                    recordsAdded.push(recordToRemove);
                }
            });
        }

        recordsToRemove = Ext.Array.difference(recordsToRemove, recordsAdded);
        Ext.Array.each(recordsToRemove, function(recordToRemove, index, recordsToRemove) {
            recordToRemove.set('markForDelete', true)
        });

        recordsToSend = recordsToSend.concat(recordsToRemove);
        emailsParams = this.getParameterList(recordsToSend);

        if (emailsParams) {
            params['Emails'] = emailsParams;
        }
    },
    
    getParameterList: function(recordsToSend) {
        var emails = new Array();
        for (var i=0;i<recordsToSend.length;i++)
        {
            var email = {
                "InternalKey": recordsToSend[i].get('internalKey'),
                "NavigationKey": recordsToSend[i].get('navigationKey'),
                "Id": recordsToSend[i].get('emailsId'),
                "Value": recordsToSend[i].get('value'),
                "Type": recordsToSend[i].get('type'),
                "Primary": recordsToSend[i].get('primary'),
                "MarkForDelete": (recordsToSend[i].get('markForDelete') == null) ? false : recordsToSend[i].get('markForDelete'),
                "ProfileEmails": recordsToSend[i].get('profileEmails'),
                "ProfileRoles": recordsToSend[i].get('profileRoles'),
                "Urls": recordsToSend[i].get('urls'),
                "Emails": null,
                "Roles": recordsToSend[i].get('roles')
            }
            emails[i] = email;
        }
        return emails;
    }
});