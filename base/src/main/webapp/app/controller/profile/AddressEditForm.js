Ext.define('Personify.controller.profile.AddressEditForm', {
    extend: 'Personify.controller.profile.template.EditItem',
    inject: ['usStateStore'],

    config: {
        currentState: null,
        emptyItem: null,
        usStateStore: null
    },
    
    control: {
        checkBoxPrimary: {},
        typeList: {
            change: 'onTypeListChange'
        },
        txtFieldStreetAd: {
        },
        primaryCheckBox: {},
        deleteButtonAd: {},
        txtFieldAd2: {},
        txtFieldAd3: {},
        txtFieldAd4: {},
        //txtFieldRegionAd: {},
        regionList: {
            change: 'onRegionListChange'
        },
        txtLocalityAd: {},
        countryList: {
            change: 'onCountryListChange'
        },
        txtFieldPostalCodeAd: {},
        deleteButtonAd: {
            tap: 'onTapDeleteButton'
        }
    },

    setRecord: function(record) {
        if(record != null) {
            this.setCurrentState(record.get('region'));
            this.getCheckBoxPrimary().setChecked(record.get('primary'));
            this.getTypeList().setValue(record.get('type'));
            this.getTxtFieldStreetAd().setValue(record.get('streetAddress'));
            this.getTxtFieldAd2().setValue(record.get('address2'));
            this.getTxtFieldAd3().setValue(record.get('address3'));
            this.getTxtFieldAd4().setValue(record.get('address4'));
            this.getTxtLocalityAd().setValue(record.get('locality'));
            this.getCountryList().setValue(record.get('country'));
            this.getTxtFieldPostalCodeAd().setValue(record.get('postalCode'));

            // set Show or hidden deleteButtonAd
            this.getDeleteButtonAd().setHidden(record.get('primary'));
            if(record.get('primary') == true) {
                this.getDeleteButtonAd().hide();
                this.getPrimaryCheckBox().show();
            } else {
                this.getDeleteButtonAd().show();
                this.getPrimaryCheckBox().hide();
            }

            if (!this.getEmptyItem()) {
                this.getTypeList().setReadOnly(true);
            }
        }
    },

    hideCountryList: function(value, countryListStore) {
        var countryListComponent = this.getCountryList();

        if(value == false) {
            countryListComponent.setStore(countryListStore);
        }

        countryListComponent.setHidden(value);
    },
    
    getStateList: function(countryCode) {
        var me = this;
        var view = me.getView();
        if(view && view.destroy != Ext.emptyFn) {
            view.setMasked({xtype:'loadmask'});

            if (countryCode == 'USA') {
                var stateStore = this.getUsStateStore();
                if (stateStore.getCount() > 0) {
                    me.updateStateStore(stateStore, countryCode);
                } else {
                    me.loadStateStore(countryCode);
                }
            } else {
                me.loadStateStore(countryCode);
            }
        }
    },

    loadStateStore: function(countryCode) {
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager(),
            stateStoreName = storeManager.getStateStore(),
            stateStore = Ext.create(stateStoreName);
        var proxy = {
            type : 'rest',
            url: Personify.utils.ServiceManager.getUrlWS('utilStates') + "?%24format=json&%24filter=CountryCodeString%20eq('"+ countryCode +"')",

            headers: Personify.utils.ServiceManager.getHeaders(),

            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'd'
            }
        };
        stateStore.setProxy(proxy);
        stateStore.load({callback: function() {
            me.updateStateStore(stateStore, countryCode);
        }});
    },

    updateStateStore: function(stateStore, countryCode) {
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var profileTypeStore = storeManager.getProfileTypeStore();
        var storeProfileType = Ext.create(profileTypeStore);
        var storeList = new Array();
        var view = me.getView();

        if (stateStore) {
            var emptyItem = me.getEmptyItem();
            if(emptyItem == true) {
                storeList.push({text: '', value: ''});
            }

            me.getView().getStateDictionary()[countryCode] = stateStore;
            stateStore.each(function(record) {
                if(record != null) {
                    storeList.push({text: record.get('stateDescription'), value: record.get('stateCode')});
                }
            });
            storeProfileType.setData(storeList);
            if(view && view.destroy != Ext.emptyFn) {
                me.getRegionList().setStore(storeProfileType);

                var currentState = me.getCurrentState();

                if ((currentState === '') || currentState) {
                    me.getRegionList().setValue(currentState);
                }

                view.setMasked(false);
                me.getView().getParent().fireEvent('loadedAnAddress');
            }
        }
    },
    
    validateData: function() {
        var street = this.getTxtFieldStreetAd().getValue().trim();
        if(street == '') {
            return 'blank';
        }
        else return '';
    },

    syncRecordWithView: function() {
        this.getTxtFieldStreetAd().blur();
        this.getTxtFieldAd2().blur();
        this.getTxtFieldAd3().blur();
        this.getTxtFieldAd4().blur();
        this.getTxtLocalityAd().blur();
        this.getTxtFieldPostalCodeAd().blur();

        //get value from view and set to current record
        var view = this.getView(),
            addressRecord = view.getRecord(),
            checkBoxPrimary = this.getCheckBoxPrimary().isChecked(),
            txtFieldStreetAd = this.getTxtFieldStreetAd().getValue(),
            txtFieldAd2 = this.getTxtFieldAd2().getValue(),
            txtFieldAd3 = this.getTxtFieldAd3().getValue(),
            txtFieldAd4 = this.getTxtFieldAd4().getValue(),
            txtFieldRegionAd = this.getRegionList().getValue(),
            txtFieldLocalityAd = this.getTxtLocalityAd().getValue(),
            txtFieldCountryAd = this.getCountryList().getValue(),
            txtFieldPostalCodeAd = this.getTxtFieldPostalCodeAd().getValue(),
            typeListAd = this.getTypeList().getValue(),
            formattedAddress = Ext.util.Format.format("{0}\n{1}, {2}, {3} {4}, {5}", txtFieldLocalityAd, txtFieldStreetAd, txtFieldLocalityAd, txtFieldRegionAd, txtFieldPostalCodeAd, txtFieldCountryAd);

        if (!txtFieldRegionAd) {
            txtFieldRegionAd = '';
            formattedAddress = Ext.util.Format.format("{0}\n{1}, {2}, {3} {4}, {5}", txtFieldLocalityAd, txtFieldStreetAd, txtFieldLocalityAd, txtFieldRegionAd, txtFieldPostalCodeAd, txtFieldCountryAd);
        }
        addressRecord.set('primary', checkBoxPrimary);
        addressRecord.set('streetAddress', txtFieldStreetAd);
        addressRecord.set('address2', txtFieldAd2);
        addressRecord.set('address3', txtFieldAd3);
        addressRecord.set('address4', txtFieldAd4);
        addressRecord.set('region', txtFieldRegionAd);
        addressRecord.set('locality', txtFieldLocalityAd);
        addressRecord.set('country', txtFieldCountryAd);
        addressRecord.set('postalCode', txtFieldPostalCodeAd);
        addressRecord.set('type', typeListAd);
        addressRecord.set('formatted', formattedAddress);

        if(addressRecord.get('addressesId') == null ||addressRecord.get('addressesId') == "") {
            addressRecord.set('addressesId', '0');
        }

        view.setRecord(addressRecord);
    },
    
    onCountryListChange: function(selectField, newValue, oldValue, eOpts) {
        if (!this.getView().getParent()) {
            return;
        }

        if(newValue && oldValue) {
            this.getView().setMasked({xtype:'loadmask'});
            var stateStore = this.getView().getStateDictionary()[newValue];
            
            if(stateStore) {
                var storeList= new Array();

                var emptyItem = this.getEmptyItem();
                if(emptyItem == true) {
                    storeList.push({text: '', value: ''});
                }

                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var profileTypeStore = storeManager.getProfileTypeStore();
                var storeProfileType = Ext.create(profileTypeStore);
                
                stateStore.each(function(record) {
                    if(record != null) {
                        storeList.push({text: record.get('stateDescription'), value: record.get('stateCode')});
                    }
                });
                
                storeProfileType.setData(storeList);
                this.getRegionList().setStore(storeProfileType);

                var currentState = this.getCurrentState();

                if ((currentState === '') || currentState) {
                    this.getRegionList().setValue(currentState);
                }

                this.getView().setMasked(false);
                this.getView().getParent().fireEvent('loadedAnAddress');
            } else {
                this.getStateList(newValue);
            }
        }
    },
    
    setCountryForEmptyItem: function(value) {
        this.getCountryList().setValue(value);
    },

    setRegionForEmptyItem: function(value) {
        this.setCurrentState(value);
        this.getRegionList().setValue(value);
    },

    onRegionListChange: function(regionList, newValue, oldValue) {
        if(oldValue) {
            var regionStore = regionList.getStore();
            if(regionStore) {
                regionStore.each(function(regionRecord) {
                    if(regionRecord.get('value') == '') {
                        regionStore.remove(regionRecord);
                    }
                });
                regionList.setStore(regionStore);
                regionList.setValue(newValue);
            }
        }
    }
});