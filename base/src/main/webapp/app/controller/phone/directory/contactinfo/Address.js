Ext.define('Personify.controller.phone.directory.contactinfo.Address', {
    extend: 'Personify.controller.profile.Address',

    requires: [
        'Personify.controller.phone.directory.contactinfo.ListInfoTemplate',
        'Personify.view.phone.directory.contactinfo.AddressList',
        'Personify.view.phone.directory.contactinfo.AddressEditForm'
    ],

    config: {
        countryListStore: null,
        stateDictionary: true,
        typeList: null,
        typeListToRemove: null,
        recordsForDelete: new Array(),
        errorMessage: '\n- Wrong address format:',
        blankErrorMessage: '- Street address field cannot be empty',
        numberOfAddressToEdit: 0,
        numberOfLoadedAddress: 0
    },

    control: {
        infoContainer: {
            typelistchange: 'onTypeListChange',
            deleteCommand: 'onDeleteCommand',
            loadedAnAddress: 'onLoadedAnEditForm'
        },
        infoContainerReadOnly: true,
        buttonAddAddress: {
            tap: 'onTapButtonAddAddress'
        }
    },

    updateEditMode: function(value, countryStore) {
        var me = this;
        me.getView().setHidden(false);

        if(countryStore) {
            me.setCountryListStore(countryStore);
        }

        me.getInfoContainer().removeAll(true, true);
        me.getInfoContainerReadOnly().removeAll(true, true);

        if(value == true) {
            var typeListToRemove = new Array(),
                recordCopy = me.getView().getRecord(),
                storeManager = Personify.utils.ServiceManager.getStoreManager(),
                addressStoreName = storeManager.getProfileAddressesStore(),
                addressStore = Ext.create(addressStoreName),
                addressStoreReadOnly = Ext.create(addressStoreName),
                storeAddressList = recordCopy.EntryProfile.getAt(0).AddressesProfile;

            me.setTypeList(recordCopy.get('addressTypeList').split(','));
            me.setPrimaryAddressCountry(recordCopy.get('defaultCountry'));

            if(storeAddressList && storeAddressList.getCount() > 0) {
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

            me.setNumberOfAddressToEdit(addressStore.getCount());

            if(addressStoreReadOnly && addressStoreReadOnly.getCount() > 0) {
                var addressList = Ext.create('Personify.view.phone.directory.contactinfo.AddressList', {
                    scrollable: null,
                    disableSelection: true
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
                        var addressEditForm = Ext.create('Personify.view.phone.directory.contactinfo.AddressEditForm');
                        addressEditForm.setStateDictionary(me.getStateDictionary());
                        addressEditForm.getController().hideCountryList(false, countryStore);
                        addressEditForm.getController().setTypeList(me.getTypeList());
                        addressEditForm.setRecord(recordAddress);
                        me.getInfoContainer().add(addressEditForm);
                        addressEditForm.getController().onCountryListChange(null, recordAddress.get('country'), recordAddress.get('country'));
                    });
                    me.updateTypeListForAllEditItems();
                }
            } else {
                Ext.Viewport.setMasked(false);
            }
            me.getButtonAddAddress().setHidden(me.checkTypeList().length == 0);
        } else {
            me.setRecord(me.getView().getRecord());
            me.getButtonAddAddress().setHidden(true);
            Ext.Viewport.setMask(false);
        }
    },

    addEmptyItem: function() {
        var typeListForNewItem = this.checkTypeList();

        if(typeListForNewItem.length == 0) {
            return;
        }

        var editPanel = this.getInfoContainer();
        var itemViewEmpty = Ext.create('Personify.view.phone.directory.contactinfo.AddressEditForm', {
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
            if (this.getIsEditing()) {
                this.updateEditMode(true, this.getCountryListStore());
                return;
            }

            if(record.EntryProfile.getAt(0).AddressesProfile.getCount() > 0) {
                this.getInfoContainer().removeAll(true, true);
                this.getInfoContainerReadOnly().removeAll(true, true);
                var addressList = Ext.create('Personify.view.phone.directory.contactinfo.AddressList', {
                    scrollable: null,
                    docked: 'top',
                    disableSelection: true
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

    onLoadedAnEditForm: function() {
        var numberOfLoadedAddress = this.getNumberOfLoadedAddress();
        var numberOfAddressToEdit = this.getNumberOfAddressToEdit();
        numberOfLoadedAddress ++;
        this.setNumberOfLoadedAddress(numberOfLoadedAddress);

        if(numberOfLoadedAddress == numberOfAddressToEdit) {
            if(Ext.Viewport.getMasked()) {
                Ext.Viewport.setMasked(false);
            }
        }
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
