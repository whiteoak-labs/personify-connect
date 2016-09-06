Ext.define('Personify.controller.profile.Phone', {
    extend: 'Personify.controller.profile.template.InfoTemplate',

    requires: [
        'Personify.view.profile.contactinfo.phone.PhoneList',
        'Personify.view.profile.contactinfo.PhoneEditForm'
    ],

    config: {
        countryListStore: null,
        typeList: null,
        typeListToRemove: null,
        recordsForDelete: new Array(),
        errorMessage: '\n- Wrong phone format:',
        blankErrorMessage: '- Phone field cannot be empty',
        primaryAddressCountry: null,
        canAddMoreFlag: null
    },

    control: {
        infoContainer: {
            typelistchange: 'onTypeListChange',
            textboxchange: 'onTextboxChange',
            deleteCommand: 'onDeleteCommand'
        }
    },

    updateEditMode: function(value, countryStore) {
        this.callParent(arguments);
        if(countryStore) {
            this.setCountryListStore(countryStore);
        }
        var me = this;
        var phoneContainer = this.getInfoContainer();
        phoneContainer.removeAll(true,true);
        
        if(value == true) {
            this.getView().setHidden(false);
            var typeListToRemove = new Array();
            var recordCopy = me.getView().getRecord();
            
            //Get the type list and store to global paramemeter
            this.setTypeList(recordCopy.get('communicationLocationList').split(','));

            var storeAddressList = recordCopy.EntryProfile.getAt(0).AddressesProfile;
            if (storeAddressList) {
                storeAddressList.each(function(recordAddress) {
                    if (recordAddress.get('primary') && recordAddress.get('primary') == true) {
                        me.setPrimaryAddressCountry(recordAddress.get('country'));
                    }
                });
            }
            
            var storePhoneList = recordCopy.EntryProfile.getAt(0).PhoneNumbersProfile;
            storePhoneList.each(function(record) {
                var phoneEditForm = Ext.create('Personify.view.profile.contactinfo.PhoneEditForm');
                phoneEditForm.getController().hideCountryList(false, countryStore);
                phoneEditForm.getController().setTypeList(me.getTypeList());
                phoneEditForm.setRecord(record);
                phoneContainer.add(phoneEditForm);
                //var itemDesc = Personify.utils.ItemUtil.getDesc(recordCopy.get('communicationLocationList').split(','),record.get('type'));
                typeListToRemove.push(record.get('type').toUpperCase()+':'+record.get('typeDesc'));
                //typeListToRemove.push(record.get('type'));
            });
            
            this.setTypeListToRemove(typeListToRemove);
            
            this.addEmptyItem();
            this.updateTypeListForAllEditItems();
            
        }
        else {
            me.setRecord(me.getView().getRecord());
        }
    },
    
    onTextboxChange: function(view, record, primaryCheckBox, valueTextBox, typeList){
        var editPanel = this.getInfoContainer();
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var profilePhoneNumbersModel = modelManager.getProfilePhoneNumbersModel();
        var newRecord = new Ext.create(profilePhoneNumbersModel, {
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
        if(record.get('phoneNumbersId') != "") {
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
        if (currentEditItem.getRecord()) {
            //copy and add current record to recordsForDelete
            if(currentEditItem.getRecord().get('phoneNumbersId') != "") {
                this.getRecordsForDelete().push(currentEditItem.getRecord().copy());
            }
            currentEditItem.getRecord().set('phoneNumbersId', '');
        }
    },
    
    validation: function() {
        return '';
    },
    
    addEmptyItem: function(){
        var typeListForNewItem = this.checkTypeList();
        
        if(typeListForNewItem.length == 0) {
            this.setCanAddMoreFlag(false);
            return;
        }
        else {
            this.setCanAddMoreFlag(true);
        }
        var editPanel = this.getInfoContainer();
        
        var itemViewEmpty = Ext.create('Personify.view.profile.contactinfo.PhoneEditForm');
        itemViewEmpty.getController().hideCountryList(false, this.getCountryListStore());
        itemViewEmpty.getController().setTypeList(typeListForNewItem);
        
        this.getTypeListToRemove().push(typeListForNewItem[0]);
        editPanel.add(itemViewEmpty);
        var primaryAddressCountry = this.getPrimaryAddressCountry();
        if(primaryAddressCountry) {
            itemViewEmpty.getController().setCountryForEmptyItem(primaryAddressCountry);
        }
    },

    setRecord: function(record) {
        if(record) {
            if(record.EntryProfile.getAt(0).PhoneNumbersProfile.getCount() > 0) {
                this.getInfoContainer().removeAll(true, true);
                var phoneList = Ext.create('Personify.view.profile.contactinfo.phone.PhoneList', {
                    scrollable: null,
                    docked: 'top',
                    disableSelection: true,
                    style: 'margin-left: 50px;'
                });
                phoneList.setStore(record.EntryProfile.getAt(0).PhoneNumbersProfile);
                this.getInfoContainer().add(phoneList);
                this.getView().setHidden(false);
            } else {
                this.getView().setHidden(true);
            }
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
                if (recordToRemove.get('phoneNumbersId').toUpperCase() === record.get('phoneNumbersId').toUpperCase()) {
                    recordsAdded.push(recordToRemove);
                }
            });
        }

        recordsToRemove = Ext.Array.difference(recordsToRemove, recordsAdded);
        Ext.Array.each(recordsToRemove, function(recordToRemove, index, recordsToRemove) {
            recordToRemove.set('markForDelete', true)
        });

        recordsToSend = recordsToSend.concat(recordsToRemove);
        phoneNumbersParams = this.getParameterList(recordsToSend);

        if (phoneNumbersParams) {
            params['PhoneNumbers'] = phoneNumbersParams;
        }
    },
    
    getParameterList: function(recordsToSend) {
        var phoneNumbers = new Array();
        for (var i=0;i<recordsToSend.length;i++)
        {
            var phoneNumber = {
                "InternalKey": recordsToSend[i].get('internalKey'),
                "NavigationKey": recordsToSend[i].get('navigationKey'),
                "Id": recordsToSend[i].get('phoneNumbersId'),
                "Value": recordsToSend[i].get('value'),
                "Type": recordsToSend[i].get('type'),
                "Primary": recordsToSend[i].get('primary'),
                "MarkForDelete": (recordsToSend[i].get('markForDelete') == null) ? false : recordsToSend[i].get('markForDelete'),
                "Country": recordsToSend[i].get('country'),
                "PhoneNumbers": null 
            }
            phoneNumbers[i] = phoneNumber;
        }
        return phoneNumbers;
    }
});