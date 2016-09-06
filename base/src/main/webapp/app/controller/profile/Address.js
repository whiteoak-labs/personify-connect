Ext.define('Personify.controller.profile.Address', {
    extend: 'Personify.controller.profile.template.InfoTemplate',

    requires: [
        'Personify.view.profile.contactinfo.address.AddressList',
        'Personify.view.profile.contactinfo.AddressEditForm'
    ],

    config: {
        countryListStore: null,
        stateDictionary: {},
        typeList: null,
        typeListToRemove: null,
        recordsForDelete: new Array(),
        errorMessage: '\n- Wrong address format:',
        blankErrorMessage: '- Street address field cannot be empty',
        primaryAddressCountry: null,
        primaryAddressRegion: null
    },

    control: {
        infoContainer: {
            typelistchange: 'onTypeListChange',
            deleteCommand: 'onDeleteCommand'
        },
        infoContainerReadOnly: true,
        buttonAddAddress: {
            tap: 'onTapButtonAddAddress'
        }
    },

    onTypeListChange: function(currentEditItem, newType) {
        this.callParent(arguments);
        currentEditItem.getRecord().set('type', newType);
    },

    updateEditMode: function(value, countryStore) {
        this.callParent(arguments);
        var me = this;
        if(countryStore) {
            me.setCountryListStore(countryStore);
        }

        me.getInfoContainer().removeAll(true, true);
        me.getInfoContainerReadOnly().removeAll(true, true);

        if (value == true) {
            this.getView().setHidden(false);
            var typeListToRemove = new Array();
            var recordCopy = me.getView().getRecord();
            me.setTypeList(recordCopy.get('addressTypeList').split(','));
            me.setPrimaryAddressCountry(recordCopy.get('defaultCountry'));

            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var addressStoreName = storeManager.getProfileAddressesStore();
            var addressStore = Ext.create(addressStoreName);
            var addressStoreReadOnly = Ext.create(addressStoreName);

            var storeAddressList = recordCopy.EntryProfile.getAt(0).AddressesProfile;
            if(storeAddressList) {
                storeAddressList.each(function(record) {
                    //typeListToRemove.push(record.get('type'));
                    //var itemDesc = Personify.utils.ItemUtil.getDesc(recordCopy.get('addressTypeList').split(','),record.get('type'));
                    typeListToRemove.push(record.get('type').toUpperCase()+':'+record.get('typeDesc'));
                    if(record.get('canEdit') == true) {
                        addressStore.add(record);
                    } else {
                        addressStoreReadOnly.add(record);
                    }
                    if (record.get('primary') && record.get('primary') == true) {
                        if (record.get('country') == me.getPrimaryAddressCountry()) {
                            me.setPrimaryAddressRegion(record.get('region'));
                        }
                    }
                });
                me.setTypeListToRemove(typeListToRemove);
            }

            if(addressStoreReadOnly && addressStoreReadOnly.getCount() > 0) {
                var addressList = Ext.create('Personify.view.profile.contactinfo.address.AddressList', {
                    scrollable: null,
                    disableSelection: true,
                    style: 'margin-left: 50px; margin-bottom: 20px;'
                });
                addressList.setStore(addressStoreReadOnly);
                addressList.on({
                    itemtap: {
                        fn: me.onTapAddressList,
                        scope: me
                    }
                });
                me.getInfoContainerReadOnly().add(addressList);
            }

            if(addressStore && addressStore.getCount() > 0) {
                if(addressStore) {
                    addressStore.each(function(recordAddress) {
                        var addressEditForm = Ext.create('Personify.view.profile.contactinfo.AddressEditForm', {
                            style: 'margin-bottom: 20px;'
                        });
                        addressEditForm.setStateDictionary(me.getStateDictionary());
                        addressEditForm.getController().hideCountryList(false, countryStore);
                        addressEditForm.getController().setTypeList(me.getTypeList());
                        addressEditForm.setRecord(recordAddress);
                        me.getInfoContainer().add(addressEditForm);
                        addressEditForm.getController().onCountryListChange(null, recordAddress.get('country'), recordAddress.get('country'));
                    });
                    me.updateTypeListForAllEditItems();
                }
            }

            me.getButtonAddAddress().setHidden(me.checkTypeList().length == 0);
        }
        else {
            me.setRecord(me.getView().getRecord());
            me.getButtonAddAddress().setHidden(true);
        }
    },

    onTapButtonAddAddress: function() {
        this.addEmptyItem();
        this.updateTypeListForAllEditItems();
        this.getButtonAddAddress().setHidden(this.checkTypeList().length == 0);
    },

    onDeleteCommand: function(record, ItemToDelete) {
        if(record.get('addressesId') != "") {
            this.getRecordsForDelete().push(record);
        }

        Ext.Array.remove(this.getTypeListToRemove(), record.get('type'));
        this.updateTypeListForAllEditItems();
        this.getButtonAddAddress().setHidden(this.checkTypeList().length == 0);

        this.getInfoContainer().remove(ItemToDelete, true);
    },

    validation: function(){
        return '';
    },


    addEmptyItem: function() {
        var typeListForNewItem = this.checkTypeList();

        if(typeListForNewItem.length == 0) {
            return;
        }

        var editPanel = this.getInfoContainer();

        var itemViewEmpty = Ext.create('Personify.view.profile.contactinfo.AddressEditForm', {
            style: 'margin-bottom: 20px;'
        });
        itemViewEmpty.getController().setEmptyItem(true);
        itemViewEmpty.getController().hideCountryList(false, this.getCountryListStore());
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var profileAddressesModel = modelManager.getProfileAddressesModel();
        var newRecord = Ext.create(profileAddressesModel);
        newRecord.set('type', typeListForNewItem);
        itemViewEmpty.getController().setTypeList(typeListForNewItem);
        itemViewEmpty.setRecord(newRecord);

        this.getTypeListToRemove().push(typeListForNewItem[0]);
        editPanel.add(itemViewEmpty);
        var primaryAddressCountry = this.getPrimaryAddressCountry();
        if(primaryAddressCountry) {
            itemViewEmpty.getController().setCountryForEmptyItem(primaryAddressCountry);
        }

        var primaryAddressRegion = this.getPrimaryAddressRegion();

        if (primaryAddressRegion) {
            itemViewEmpty.getController().setRegionForEmptyItem('');
        }
    },

    setRecord: function(record) {
        var me = this;
        if(record) {
            if(record.EntryProfile.getAt(0).AddressesProfile.getCount() > 0) {
                this.getInfoContainer().removeAll(true, true);
                this.getInfoContainerReadOnly().removeAll(true, true);
                var addressList = Ext.create('Personify.view.profile.contactinfo.address.AddressList', {
                    scrollable: null,
                    disableSelection: true,
                    style: 'margin-left: 50px;'
                });
                addressList.setStore(record.EntryProfile.getAt(0).AddressesProfile);
                addressList.on({
                    itemtap: {
                        fn: me.onTapAddressList,
                        scope: me
                    }
                });
                this.getInfoContainer().add(addressList);
                this.getButtonAddAddress().setHidden(true);
                this.getView().setHidden(false);
            } else {
                this.getView().setHidden(true);
            }
        } else {
            this.getButtonAddAddress().setHidden(false);
        }
    },

    updateParams: function(params) {
        this.updateAllRecordsForEditItems();

        var recordsToSend = new Array();

        var recordsToRemove = this.getRecordsForDelete();
        var editItems = this.getInfoContainer().getItems().items;
        for (var i = 0; i < editItems.length; i++) {
            var record = editItems[i].getRecord();
            recordsToSend.push(record);
            // if this id existed in array RecordsToRemove, remove the record from RecordsToRemove
            Ext.Array.each(recordsToRemove, function(recordToRemove, index, recordsToRemove) {
                if (recordToRemove.get('addressesId') === record.get('addressesId')) {
                    Ext.Array.remove(recordsToRemove, recordToRemove);
                }
            });
        }
        Ext.Array.each(recordsToRemove, function(recordToRemove, index, recordsToRemove) {
            recordToRemove.set('markForDelete', true)
        });
        recordsToSend = recordsToSend.concat(this.getRecordsForDelete());
        // get list of phone parameter and update into params['phoneNumbers']
        addressesParams = this.getParameterList(recordsToSend);
        if(addressesParams) {
            params['Addresses'] = addressesParams;
        }
    },

    getParameterList: function(recordsToSend) {
        var addresses = new Array();
        for (var i=0;i<recordsToSend.length;i++)
        {
            var address = {
                "InternalKey": recordsToSend[i].get('internalKey'),
                "NavigationKey": recordsToSend[i].get('navigationKey'),
                "Id": recordsToSend[i].get('addressesId'),
                "Type": recordsToSend[i].get('type'),
                "StreetAddress": recordsToSend[i].get('streetAddress'),
                "Address2": recordsToSend[i].get('address2'),
                "Address3": recordsToSend[i].get('address3'),
                "Address4": recordsToSend[i].get('address4'),
                "Locality": recordsToSend[i].get('locality'),
                "Region": recordsToSend[i].get('region'),
                "PostalCode": recordsToSend[i].get('postalCode'),
                "Country": recordsToSend[i].get('country'),
                "Formatted": recordsToSend[i].get('formatted'),
                "CanEdit": true,
                "Primary": recordsToSend[i].get('primary'),
                "MarkForDelete": (recordsToSend[i].get('markForDelete') == null) ? false : recordsToSend[i].get('markForDelete'),
                "Address": recordsToSend[i].get('address'),
                "ProfileAddresses": recordsToSend[i].get('profileAddress'),
                "Addresses":null,
                "Geo":null
            }
            addresses[i] = address;
        }
        return addresses;
    },

    onTapAddressList: function(dataView, index, target, record, e, eOpts) {
        var address = '';

        if (record.get('fomatted')) {
            address = record.get('formatted');
        }else {
            address = Personify.utils.ItemUtil.getAddress(record);
        }

        Personify.utils.ItemUtil.showAddressOnMaps(address);
    }
});
