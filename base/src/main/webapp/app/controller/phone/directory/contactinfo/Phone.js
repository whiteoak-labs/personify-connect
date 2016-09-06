Ext.define('Personify.controller.phone.directory.contactinfo.Phone', {
    extend: 'Personify.controller.profile.Phone',

    requires: [
        'Personify.view.phone.directory.contactinfo.PhoneList',
        'Personify.view.phone.directory.contactinfo.PhoneEditForm'
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
    	var me = this;
        me.getView().setHidden(false);

        if(countryStore) {
            me.setCountryListStore(countryStore);
        }

        var phoneContainer = me.getInfoContainer();
        phoneContainer.removeAll(true,true);

        if(value == true) {
            var typeListToRemove = new Array(),
            	recordCopy = me.getView().getRecord();
            me.setTypeList(recordCopy.get('communicationLocationList').split(','));

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
                var phoneEditForm = Ext.create('Personify.view.phone.directory.contactinfo.PhoneEditForm');
                phoneEditForm.getController().hideCountryList(false, countryStore);
                phoneEditForm.getController().setTypeList(me.getTypeList());
                phoneEditForm.setRecord(record);
                phoneContainer.add(phoneEditForm);
                //var itemDesc = Personify.utils.ItemUtil.getDesc(recordCopy.get('communicationLocationList').split(','),record.get('type'));
                typeListToRemove.push(record.get('type').toUpperCase()+':'+record.get('typeDesc'));
                //typeListToRemove.push(record.get('type'));
            });

            me.setTypeListToRemove(typeListToRemove);
            me.addEmptyItem();
            me.updateTypeListForAllEditItems();
        } else {
            me.setRecord(me.getView().getRecord());
        }
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
        
        var itemViewEmpty = Ext.create('Personify.view.phone.directory.contactinfo.PhoneEditForm');
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
            if (this.getIsEditing()) {
                this.updateEditMode(true, this.getCountryListStore());
                return;
            }

            if(record.EntryProfile.getAt(0).PhoneNumbersProfile.getCount() > 0) {
                this.getInfoContainer().removeAll(true, true);
                var phoneList = Ext.create('Personify.view.phone.directory.contactinfo.PhoneList', {
                    scrollable: null,
                    disableSelection: true
                });
                phoneList.setStore(record.EntryProfile.getAt(0).PhoneNumbersProfile);
                this.getInfoContainer().add(phoneList);
                this.getView().setHidden(false);
            } else {
                this.getView().setHidden(true);
            }
        }
    }
});